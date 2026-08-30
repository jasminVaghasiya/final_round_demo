const mongoose = require('mongoose');

// Custom Role Schema
const roleSchema = new mongoose.Schema(
  {
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Company',
      required: true,
      index: true,
    },
    name: {
      type: String,
      required: [true, 'Role name is required'],
      trim: true,
    },
    code: {
      type: String,
      required: [true, 'Role code is required'],
      uppercase: true,
      trim: true,
    },
    description: {
      type: String,
      default: '',
    },
    baseRole: {
      type: String,
      default: 'EMPLOYEE',
      trim: true,
    },
    isSystem: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: ['ACTIVE', 'INACTIVE'],
      default: 'ACTIVE',
    },
  },
  { timestamps: true }
);

roleSchema.index({ companyId: 1, code: 1 }, { unique: true });

// Dynamic Policy Rule Schema (Flexible for custom subjects & actions)
const dynamicPolicySchema = new mongoose.Schema(
  {
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Company',
      required: true,
      index: true,
    },
    policyName: {
      type: String,
      required: [true, 'Policy name is required'],
      trim: true,
    },
    roleCode: {
      type: String,
      required: [true, 'Target role code is required'],
      uppercase: true,
      trim: true,
    },
    subject: {
      type: String,
      required: true,
      trim: true,
    },
    action: {
      type: String,
      required: true,
      trim: true,
    },
    effect: {
      type: String,
      enum: ['ALLOW', 'DENY'],
      default: 'ALLOW',
    },
    conditionScope: {
      type: String,
      default: 'SAME_DEPARTMENT',
      trim: true,
    },
    description: {
      type: String,
      default: '',
    },
    status: {
      type: String,
      enum: ['ACTIVE', 'INACTIVE'],
      default: 'ACTIVE',
    },
  },
  { timestamps: true }
);

dynamicPolicySchema.index({ companyId: 1, roleCode: 1, subject: 1, action: 1 });

const Role = mongoose.model('Role', roleSchema);
const DynamicPolicy = mongoose.model('DynamicPolicy', dynamicPolicySchema);

module.exports = { Role, DynamicPolicy };
