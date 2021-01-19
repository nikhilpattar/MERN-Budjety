import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
    {
        uId: {
            type: String,
            required: true
        },
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        username: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        }
    },
    {
        versionKey: false
    }
);

export default mongoose.model('User', UserSchema);