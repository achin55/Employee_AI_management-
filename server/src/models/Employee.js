import mongoose from 'mongoose';

const employeeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide employee name'],
      trim: true,
      minlength: [2, 'Name must be at least 2 characters'],
    },
    email: {
      type: String,
      required: [true, 'Please provide email'],
      unique: true,
      lowercase: true,
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email'],
    },
    phone: {
      type: String,
      default: null,
    },
    department: {
      type: String,
      required: [true, 'Please provide department'],
      enum: [
        'Development',
        'Design',
        'Marketing',
        'Sales',
        'HR',
        'Finance',
        'Operations',
        'Management',
      ],
    },
    position: {
      type: String,
      required: [true, 'Please provide position'],
    },
    skills: {
      type: [String],
      default: [],
      required: [true, 'Please provide at least one skill'],
    },
    performanceScore: {
      type: Number,
      required: [true, 'Please provide performance score'],
      min: [0, 'Performance score must be at least 0'],
      max: [100, 'Performance score cannot exceed 100'],
      default: 0,
    },
    experience: {
      type: Number,
      required: [true, 'Please provide years of experience'],
      min: [0, 'Experience cannot be negative'],
      default: 0,
    },
    joinDate: {
      type: Date,
      default: Date.now,
    },
    salary: {
      type: Number,
      default: null,
    },
    manager: {
      type: String,
      default: null,
    },
    projects: {
      type: [String],
      default: [],
    },
    certifications: {
      type: [String],
      default: [],
    },
    ratings: {
      type: {
        teamwork: { type: Number, min: 0, max: 5, default: 0 },
        communication: { type: Number, min: 0, max: 5, default: 0 },
        problemSolving: { type: Number, min: 0, max: 5, default: 0 },
        leadership: { type: Number, min: 0, max: 5, default: 0 },
        technical: { type: Number, min: 0, max: 5, default: 0 },
      },
      default: {},
    },
    promotionEligible: {
      type: Boolean,
      default: false,
    },
    trainingNeeded: {
      type: [String],
      default: [],
    },
    feedback: {
      type: String,
      default: null,
    },
    status: {
      type: String,
      enum: ['active', 'inactive', 'on-leave'],
      default: 'active',
    },
  },
  { timestamps: true }
);

// Index for search optimization
employeeSchema.index({ name: 'text', email: 'text', department: 1 });
employeeSchema.index({ skills: 1 });

export default mongoose.model('Employee', employeeSchema);
