import mongoose from 'mongoose';

const ExpenseSchema = new mongoose.Schema(
    {
        eId: {
            type: String,
            required: true
        },
        uId: {
            type: String,
            required: true
        },
        eDescription: {
            type: String,
            required: true
        },
        eValue: {
            type: Number,
            required: true
        },
        eCategory:{
            type: String,
            required: true
        },
        eMonth: {
            type: String,
            required: true
        },
        eYear: {
            type: String,
            required: true
        } 
    },
    {
        versionKey: false
    }
);

export default mongoose.model('Expense', ExpenseSchema);