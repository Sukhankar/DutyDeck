import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: { type: Date, required: true },
  assignTo: [{ type: String, required: true }], // names or emails
  category: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: String, enum: ['Pending', 'In Progress', 'Completed'], default: 'Pending' },
  seenBy: [{ type: String }] // Array of user emails that have seen the task
}, { timestamps: true });

export default mongoose.model('Task', taskSchema);
