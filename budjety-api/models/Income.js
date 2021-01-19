import mongoose from 'mongoose';

const IncomeSchema = new mongoose.Schema(
    {
        iId:{
            type: String,
            required: true
        },
        uId: {
            type: String,
            required: true
        },
        iDescription: {
            type: String,
            required: true
        },
        iValue: {
            type: Number,
            required: true
        },
        iCategory:{
            type: String,
            required: true
        },
        iMonth: {
            type: String,
            required: true
        },
        iYear: {
            type: String,
            required: true
        }
    },
    {
        versionKey: false
    }
);

export default mongoose.model('Income', IncomeSchema);