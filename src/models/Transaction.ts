import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema(
  {
    amount: { type: Number, required: true, min: 0 },
    description: { type: String, maxLength: 150 },
    date: { type: Date, required: true },
    type: { type: String, required: true, enum: ['income', 'expense'] },
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Category',
    },
  },
  { timestamps: true }
);

export default mongoose.model('Transaction', transactionSchema);
