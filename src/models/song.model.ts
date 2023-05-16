import { v4 as uuidv4 } from 'uuid';

import ISong from '@/constraints/interfaces/ISong';
import { CustomResponse } from '@/constraints/interfaces/custom.interface';
import songSchema from '@/database/schemas/song.schema';

export default class SongModel {
    public static async create(
        payload: Omit<ISong, '_id' | 'createdAt' | 'updatedAt'>,
    ): Promise<CustomResponse> {
        try {
            const _id: string = uuidv4();
            const created = await songSchema.create({
                _id,
                ...payload,
            });
            return {
                status: 201,
                success: true,
                message: 'POST_SONG_SUCCESSFULLY',
                data: created,
            };
        } catch (error) {
            console.log(error);
            return {
                status: 500,
                success: false,
                message: 'POST_SONG_FAILED',
                errors: error,
            };
        }
    }
}
