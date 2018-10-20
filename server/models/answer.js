import mongoose from 'mongoose';

const AnswerSchema = new mongoose.Schema({
  description: { type: String, required: true },
  createdAt: { type: Date, defautl: Date.now(), required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
})

export default mongoose.model('Answer', AnswerSchema);
