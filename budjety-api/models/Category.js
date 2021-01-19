import mongoose from 'mongoose';

const CategorySchema = new mongoose.Schema(
    {
        incomeCategory: {
            type: Array,
            required: true
        },
        expenseCategory: {
            type: Array,
            required: true
        }
    },
    {
        versionKey: false
    }
);

export default mongoose.model('Category', CategorySchema);