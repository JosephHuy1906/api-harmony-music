import mongoose, { Schema } from 'mongoose';

import { IUser } from '@/constraints/interfaces/index.interface';

const userSchema = new Schema<IUser>(
    {
        _id: { type: String, required: true },
        email: { type: String, required: true, maxlength: 100 },
        fullName: { type: String, required: true, maxlength: 100 },
        username: { type: String, required: true, maxlength: 50 },
        avatar: { type: String, required: true, maxlength: 100 }
    },
    {
        _id: false,
        timestamps: true,
    },
);

export default mongoose.model<IUser>('users', userSchema);
