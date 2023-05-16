import ISongPath from '@/constraints/interfaces/ISongPath';
import mongoose, { Schema } from 'mongoose';

const songPathRefSchema = new Schema<ISongPath>(
    {
        _id: { type: String, required: true },
        path: { type: String, required: true },
        size: { type: Number, required: true },
        type: { type: String, required: true },
        metadata: {
            type: Object,
            default: {},
        },
    },
    {
        _id: false,
        timestamps: true,
        bufferTimeoutMS: 20000,
    },
);

export default mongoose.model<ISongPath>('songPathRef', songPathRefSchema);
