const mongoose = require('mongoose');

const auditLogSchema = new mongoose.Schema(
  {
    adminId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    adminName: {
      type: String,
      required: true,
    },
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Company',
      required: true,
      index: true,
    },
    targetUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    targetUserName: {
      type: String,
      required: true,
    },
    action: {
      type: String,
      required: true,
      enum: [
        'USER_CREATED',
        'USER_UPDATED',
        'USER_ACTIVATED',
        'USER_DEACTIVATED',
        'USER_SUSPENDED',
        'USER_ROLE_CHANGED',
        'ROLE_CHANGED',
        'USER_DEPARTMENT_ASSIGNED',
        'DEPARTMENT_ASSIGNED',
        'PASSWORD_RESET',
        'DEPARTMENT_CREATED',
        'DEPARTMENT_UPDATED',
        'DEPARTMENT_DELETED',
        'BULK_USER_ACTION',
        'ACTIVATED',
        'DEACTIVATED',
        'SUSPENDED',
      ],
      index: true,
    },
    description: {
      type: String,
      required: true,
    },
    previousValue: {
      type: mongoose.Schema.Types.Mixed,
      default: null,
    },
    newValue: {
      type: mongoose.Schema.Types.Mixed,
      default: null,
    },
    ipAddress: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

auditLogSchema.index({ companyId: 1, createdAt: -1 });

module.exports = mongoose.model('AuditLog', auditLogSchema);
