import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: { type: Date, required: true },
  deadline: { type: Date, required: true }, // Added deadline field
  assignTo: [{ type: String, required: true }], // names or emails
  category: { type: String, required: true },
  description: { type: String, required: true },
  status: { 
    type: String, 
    enum: ['Pending', 'In Progress', 'Completed', 'Failed'], // Added Failed status
    default: 'Pending' 
  },
  seenBy: [{ type: String }], // Array of user emails that have seen the task
  queries: [
    {
      id: { type: String, required: true }, // uuid or timestamp string
      user: { type: String, required: true }, // user name or email
      message: { type: String, required: true },
      createdAt: { type: Date, default: Date.now }
    }
  ]
}, { timestamps: true });

// Middleware to auto-update status based on deadline
taskSchema.pre('save', function(next) {
  if (this.status !== 'Completed') {
    const now = new Date();
    if (now > this.deadline) {
      this.status = 'Failed';
    }
  }
  next();
});

export default mongoose.model('Task', taskSchema);
