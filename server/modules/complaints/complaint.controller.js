const mongoose = require('mongoose');
const Complaint = require('./complaint.model');
const Department = require('../departments/department.model');
const User = require('../users/user.model');
const { ApiError } = require('../../middlewares/error.middleware');

/**
 * Generate a unique sequential / readable complaint ID
 */
const generateComplaintId = async (companyId) => {
  const count = await Complaint.countDocuments({ companyId });
  const padded = String(count + 1).padStart(4, '0');
  const year = new Date().getFullYear();
  return `CMP-${year}-${padded}`;
};

/**
 * Get Complaints with Filter, Search, and Scoping
 */
const getComplaints = async (req, res, next) => {
  try {
    const { status, priority, departmentId, search, viewScope } = req.query;
    const companyId = req.user.companyId;
    const userId = req.user._id;
    const userRole = req.user.role;

    const query = { companyId };

    const incomingCondition = {
      status: { $ne: 'DRAFT' },
      $or: [
        { targetedPerson: userId },
        { assignedTo: userId },
        ...(req.user.departmentId ? [{ departmentId: req.user.departmentId }] : []),
        ...(['ADMIN', 'SUPER_ADMIN'].includes(userRole) ? [{}] : []),
      ],
    };

    if (viewScope === 'my' || viewScope === 'raised') {
      // 1. My Raised Complaints: ONLY complaints submitted by current user
      query.submittedBy = userId;
    } else if (viewScope === 'arrived' || viewScope === 'incoming') {
      // 2. Arrived Complaints: ONLY complaints submitted by OTHER users to me / my department
      query.submittedBy = { $ne: userId };
      query.status = { $ne: 'DRAFT' };

      if (['ADMIN', 'SUPER_ADMIN', 'CREATOR'].includes(userRole)) {
        // Admins see all non-self incoming company complaints
      } else if (userRole === 'HOD' && req.user.departmentId) {
        query.$or = [
          { departmentId: req.user.departmentId },
          { targetedPerson: userId },
          { targetedRole: { $in: ['HOD', 'MANAGER', 'GENERAL'] } },
          { assignedTo: userId },
        ];
      } else if (userRole === 'MANAGER') {
        query.$or = [
          { targetedPerson: userId },
          { targetedRole: { $in: ['MANAGER', 'GENERAL'] } },
          { assignedTo: userId },
          ...(req.user.departmentId ? [{ departmentId: req.user.departmentId }] : []),
        ];
      } else {
        query.$or = [
          { targetedPerson: userId },
          { targetedRole: userRole },
          { assignedTo: userId },
          ...(req.user.departmentId ? [{ departmentId: req.user.departmentId }] : []),
        ];
      }
    } else {
      // 3. All Complaints: Complaints raised by me OR incoming from others
      if (['ADMIN', 'SUPER_ADMIN'].includes(userRole)) {
        // Admin sees all
      } else if (userRole === 'HOD' && req.user.departmentId) {
        query.$or = [
          { submittedBy: userId },
          { departmentId: req.user.departmentId, status: { $ne: 'DRAFT' } },
          { targetedPerson: userId, status: { $ne: 'DRAFT' } },
          { assignedTo: userId, status: { $ne: 'DRAFT' } },
        ];
      } else {
        query.$or = [
          { submittedBy: userId },
          { targetedPerson: userId, status: { $ne: 'DRAFT' } },
          { assignedTo: userId, status: { $ne: 'DRAFT' } },
          ...(req.user.departmentId ? [{ departmentId: req.user.departmentId, status: { $ne: 'DRAFT' } }] : []),
        ];
      }
    }

    // Status filter
    if (status && status !== 'ALL') {
      query.status = status;
    }

    // Priority filter
    if (priority && priority !== 'ALL') {
      query.priority = priority;
    }

    // Department filter
    if (departmentId && departmentId !== 'ALL') {
      query.departmentId = departmentId;
    }

    // Search query
    if (search && search.trim() !== '') {
      const searchRegex = new RegExp(search.trim(), 'i');
      query.$and = query.$and || [];
      query.$and.push({
        $or: [
          { complaintId: searchRegex },
          { subject: searchRegex },
          { description: searchRegex },
          { category: searchRegex },
        ],
      });
    }

    const complaints = await Complaint.find(query)
      .populate('submittedBy', 'name email role departmentId avatar')
      .populate('departmentId', 'name code')
      .populate('targetedPerson', 'name email role')
      .populate('assignedTo', 'name email role')
      .sort({ createdAt: -1 });

    // Aggregate status counts strictly for the current view scope
    const baseScopeQuery = { companyId };
    if (viewScope === 'my' || viewScope === 'raised') {
      baseScopeQuery.submittedBy = userId;
    } else if (viewScope === 'arrived' || viewScope === 'incoming') {
      baseScopeQuery.submittedBy = { $ne: userId };
      baseScopeQuery.status = { $ne: 'DRAFT' };
      if (!['ADMIN', 'SUPER_ADMIN'].includes(userRole)) {
        if (userRole === 'HOD' && req.user.departmentId) {
          baseScopeQuery.$or = [
            { departmentId: req.user.departmentId },
            { targetedPerson: userId },
            { assignedTo: userId },
          ];
        } else {
          baseScopeQuery.$or = [
            { targetedPerson: userId },
            { assignedTo: userId },
            ...(req.user.departmentId ? [{ departmentId: req.user.departmentId }] : []),
          ];
        }
      }
    }

    const allForStats = await Complaint.find(baseScopeQuery, 'status');
    const stats = {
      total: allForStats.length,
      draft: allForStats.filter((c) => c.status === 'DRAFT').length,
      open: allForStats.filter((c) => c.status === 'OPEN').length,
      inProgress: allForStats.filter((c) => c.status === 'IN_PROGRESS').length,
      resolved: allForStats.filter((c) => c.status === 'RESOLVED').length,
      rejected: allForStats.filter((c) => c.status === 'REJECTED').length,
    };

    res.status(200).json({
      success: true,
      data: complaints,
      stats,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get Complaint Details by ID with Chat messages populated
 */
const getComplaintById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const complaint = await Complaint.findOne({
      _id: id,
      companyId: req.user.companyId,
    })
      .populate('submittedBy', 'name email role departmentId avatar')
      .populate('departmentId', 'name code description')
      .populate('targetedPerson', 'name email role departmentId avatar')
      .populate('assignedTo', 'name email role departmentId avatar')
      .populate('statusHistory.changedBy', 'name email role')
      .populate('messages.sender', 'name email role avatar')
      .populate('messages.editedBy', 'name email role');

    if (!complaint) {
      throw new ApiError(404, 'Complaint not found');
    }

    res.status(200).json({
      success: true,
      data: complaint,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Create New Complaint (Draft or Submitted)
 */
const createComplaint = async (req, res, next) => {
  try {
    const {
      subject,
      description,
      category = 'TECHNICAL',
      priority = 'MEDIUM',
      departmentId,
      targetedRole = 'HOD',
      targetedPerson,
      isDraft = false,
    } = req.body;

    if (!subject || !subject.trim()) {
      throw new ApiError(400, 'Complaint subject is required');
    }
    if (!description || !description.trim()) {
      throw new ApiError(400, 'Complaint description is required');
    }

    const complaintId = await generateComplaintId(req.user.companyId);
    const initialStatus = isDraft ? 'DRAFT' : 'OPEN';

    const complaint = new Complaint({
      complaintId,
      companyId: req.user.companyId,
      submittedBy: req.user._id,
      departmentId: departmentId || null,
      targetedRole,
      targetedPerson: targetedPerson || null,
      subject: subject.trim(),
      description: description.trim(),
      category,
      priority,
      status: initialStatus,
      statusHistory: [
        {
          status: initialStatus,
          changedBy: req.user._id,
          changedAt: new Date(),
          notes: isDraft ? 'Saved as Draft' : 'Complaint submitted to authority',
        },
      ],
      messages: [],
    });

    await complaint.save();

    const populatedComplaint = await Complaint.findById(complaint._id)
      .populate('submittedBy', 'name email role departmentId avatar')
      .populate('departmentId', 'name code')
      .populate('targetedPerson', 'name email role');

    res.status(201).json({
      success: true,
      message: isDraft ? 'Complaint saved as draft' : 'Complaint submitted successfully',
      data: populatedComplaint,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Update Complaint
 * Business Rule: Only editable if status is DRAFT or REJECTED
 */
const updateComplaint = async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      subject,
      description,
      category,
      priority,
      departmentId,
      targetedRole,
      targetedPerson,
      submitNow = false,
    } = req.body;

    const complaint = await Complaint.findOne({
      _id: id,
      companyId: req.user.companyId,
    });

    if (!complaint) {
      throw new ApiError(404, 'Complaint not found');
    }

    // Permission check: Submitter or Admin
    const isSubmitter = String(complaint.submittedBy) === String(req.user._id);
    const isAdmin = ['ADMIN', 'SUPER_ADMIN'].includes(req.user.role);

    if (!isSubmitter && !isAdmin) {
      throw new ApiError(403, 'You are not authorized to edit this complaint');
    }

    // Enforce status restriction: ONLY editable if DRAFT
    if (complaint.status !== 'DRAFT' && !isAdmin) {
      throw new ApiError(
        400,
        `Cannot edit complaint. Edits are only permitted when status is 'DRAFT' (currently: '${complaint.status}')`
      );
    }

    if (subject) complaint.subject = subject.trim();
    if (description) complaint.description = description.trim();
    if (category) complaint.category = category;
    if (priority) complaint.priority = priority;
    if (departmentId !== undefined) complaint.departmentId = departmentId || null;
    if (targetedRole) complaint.targetedRole = targetedRole;
    if (targetedPerson !== undefined) complaint.targetedPerson = targetedPerson || null;

    // If converting draft to submitted
    if (submitNow && complaint.status === 'DRAFT') {
      complaint.status = 'OPEN';
      complaint.statusHistory.push({
        status: 'OPEN',
        changedBy: req.user._id,
        changedAt: new Date(),
        notes: 'Draft submitted as active complaint',
      });
    } else if (submitNow && complaint.status === 'REJECTED') {
      complaint.status = 'OPEN';
      complaint.statusHistory.push({
        status: 'OPEN',
        changedBy: req.user._id,
        changedAt: new Date(),
        notes: 'Resubmitted after revisions',
      });
    }

    await complaint.save();

    const updated = await Complaint.findById(complaint._id)
      .populate('submittedBy', 'name email role departmentId avatar')
      .populate('departmentId', 'name code')
      .populate('targetedPerson', 'name email role')
      .populate('assignedTo', 'name email role')
      .populate('statusHistory.changedBy', 'name email role')
      .populate('messages.sender', 'name email role avatar');

    res.status(200).json({
      success: true,
      message: 'Complaint updated successfully',
      data: updated,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Delete Complaint
 * Business Rule: Only deletable if status is DRAFT
 */
const deleteComplaint = async (req, res, next) => {
  try {
    const { id } = req.params;
    const complaint = await Complaint.findOne({
      _id: id,
      companyId: req.user.companyId,
    });

    if (!complaint) {
      throw new ApiError(404, 'Complaint not found');
    }

    const isSubmitter = String(complaint.submittedBy) === String(req.user._id);
    const isAdmin = ['ADMIN', 'SUPER_ADMIN'].includes(req.user.role);

    if (!isSubmitter && !isAdmin) {
      throw new ApiError(403, 'You are not authorized to delete this complaint');
    }

    // Enforce delete restriction: ONLY DRAFT complaints can be deleted
    if (complaint.status !== 'DRAFT' && !isAdmin) {
      throw new ApiError(
        400,
        `Cannot delete complaint. Only complaints with status 'DRAFT' can be deleted (currently: '${complaint.status}')`
      );
    }

    await Complaint.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: 'Draft complaint deleted successfully',
      data: { id },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Add a Chat Message to Complaint
 */
const addMessage = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { text } = req.body;

    if (!text || !text.trim()) {
      throw new ApiError(400, 'Message text cannot be empty');
    }

    const complaint = await Complaint.findOne({
      _id: id,
      companyId: req.user.companyId,
    });

    if (!complaint) {
      throw new ApiError(404, 'Complaint not found');
    }

    const newMessage = {
      sender: req.user._id,
      text: text.trim(),
      isEdited: false,
      editedBy: null,
      editedAt: null,
      createdAt: new Date(),
    };

    complaint.messages.push(newMessage);
    await complaint.save();

    // Return the fresh populated complaint
    const updated = await Complaint.findById(complaint._id)
      .populate('submittedBy', 'name email role departmentId avatar')
      .populate('departmentId', 'name code')
      .populate('targetedPerson', 'name email role')
      .populate('assignedTo', 'name email role')
      .populate('statusHistory.changedBy', 'name email role')
      .populate('messages.sender', 'name email role avatar')
      .populate('messages.editedBy', 'name email role');

    res.status(201).json({
      success: true,
      message: 'Message sent successfully',
      data: updated,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Edit an Existing Chat Message
 * Records: text, isEdited: true, editedBy: req.user._id, editedAt: Date
 */
const editMessage = async (req, res, next) => {
  try {
    const { id, messageId } = req.params;
    const { text } = req.body;

    if (!text || !text.trim()) {
      throw new ApiError(400, 'Message text cannot be empty');
    }

    const complaint = await Complaint.findOne({
      _id: id,
      companyId: req.user.companyId,
    });

    if (!complaint) {
      throw new ApiError(404, 'Complaint not found');
    }

    const message = complaint.messages.id(messageId);
    if (!message) {
      throw new ApiError(404, 'Message not found');
    }

    // Only original sender or Admin can edit message
    const isSender = String(message.sender) === String(req.user._id);
    const isAdmin = ['ADMIN', 'SUPER_ADMIN'].includes(req.user.role);

    if (!isSender && !isAdmin) {
      throw new ApiError(403, 'You can only edit your own messages');
    }

    message.text = text.trim();
    message.isEdited = true;
    message.editedBy = req.user._id;
    message.editedAt = new Date();

    await complaint.save();

    const updated = await Complaint.findById(complaint._id)
      .populate('submittedBy', 'name email role departmentId avatar')
      .populate('departmentId', 'name code')
      .populate('targetedPerson', 'name email role')
      .populate('assignedTo', 'name email role')
      .populate('statusHistory.changedBy', 'name email role')
      .populate('messages.sender', 'name email role avatar')
      .populate('messages.editedBy', 'name email role');

    res.status(200).json({
      success: true,
      message: 'Message edited successfully',
      data: updated,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Update Complaint Status (Authority / Admin / HOD)
 */
const updateStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status, notes = '' } = req.body;

    const validStatuses = ['OPEN', 'IN_PROGRESS', 'RESOLVED', 'CLOSED', 'REJECTED'];
    if (!validStatuses.includes(status)) {
      throw new ApiError(400, `Invalid status value: ${status}`);
    }

    const complaint = await Complaint.findOne({
      _id: id,
      companyId: req.user.companyId,
    });

    if (!complaint) {
      throw new ApiError(404, 'Complaint not found');
    }

    const isTargeted = String(complaint.targetedPerson) === String(req.user._id);
    const isAssigned = String(complaint.assignedTo) === String(req.user._id);
    const isHodForDept = req.user.role === 'HOD' && complaint.departmentId && String(req.user.departmentId) === String(complaint.departmentId);
    const isTargetedRole = complaint.targetedRole && (
      req.user.role === complaint.targetedRole ||
      (complaint.targetedRole === 'MANAGER' && ['MANAGER', 'HOD', 'ADMIN', 'SUPER_ADMIN'].includes(req.user.role)) ||
      (complaint.targetedRole === 'HOD' && ['HOD', 'ADMIN', 'SUPER_ADMIN'].includes(req.user.role)) ||
      (complaint.targetedRole === 'ADMIN' && ['ADMIN', 'SUPER_ADMIN'].includes(req.user.role))
    );
    const isManager = req.user.role === 'MANAGER';
    const isAdmin = ['ADMIN', 'SUPER_ADMIN', 'CREATOR', 'SYSTEM_SUPER_ADMIN'].includes(req.user.role);

    if (!isTargeted && !isAssigned && !isTargetedRole && !isHodForDept && !isManager && !isAdmin) {
      throw new ApiError(403, 'Regular employees and submitters cannot change the status of a complaint. Only assigned authorities can update status.');
    }

    // Business Rule: Irreversible status progression (no reversing accepted complaints)
    if (complaint.status === 'IN_PROGRESS' && status === 'OPEN') {
      throw new ApiError(400, 'Cannot reverse an accepted complaint back to Open / Pending');
    }
    if (complaint.status === 'RESOLVED' && ['OPEN', 'IN_PROGRESS'].includes(status)) {
      throw new ApiError(400, 'Cannot reverse a Resolved complaint back to Open or In Progress');
    }
    if (complaint.status === 'CLOSED') {
      throw new ApiError(400, 'Closed complaints are finalized and cannot be modified');
    }

    complaint.status = status;
    if (status === 'RESOLVED') {
      complaint.resolvedAt = new Date();
      complaint.resolutionNotes = notes;
    }

    complaint.statusHistory.push({
      status,
      changedBy: req.user._id,
      changedAt: new Date(),
      notes: notes || `Status changed to ${status}`,
    });

    await complaint.save();

    const updated = await Complaint.findById(complaint._id)
      .populate('submittedBy', 'name email role departmentId avatar')
      .populate('departmentId', 'name code')
      .populate('targetedPerson', 'name email role')
      .populate('assignedTo', 'name email role')
      .populate('statusHistory.changedBy', 'name email role')
      .populate('messages.sender', 'name email role avatar')
      .populate('messages.editedBy', 'name email role');

    res.status(200).json({
      success: true,
      message: `Status updated to ${status}`,
      data: updated,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getComplaints,
  getComplaintById,
  createComplaint,
  updateComplaint,
  deleteComplaint,
  addMessage,
  editMessage,
  updateStatus,
};
