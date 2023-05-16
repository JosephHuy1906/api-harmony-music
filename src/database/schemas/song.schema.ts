import mongoose, { Schema } from 'mongoose';

import { ISong } from '@/constraints/interfaces/index.interface';

const songSchema = new Schema<ISong>(
    {
        _id: { type: String, required: true },
        title: { type: String, required: true, maxlength: 100 },
        album: { type: String, required: true, maxlength: 100 },
        albumArtist: { type: String, required: true, maxlength: 50 },
        artist: { type: String, required: true, maxlength: 50 },
        genre: { type: String, required: true },
        duration: { type: Number, require: true },
        thumbnailPath: { type: String, required: true },
        pathRef: { type: String, required: true, ref: 'songPathRef' },
        publish: { type: String, required: true },
    },
    {
        _id: false,
        timestamps: true,
    },
);

export default mongoose.model<ISong>('songs', songSchema);
