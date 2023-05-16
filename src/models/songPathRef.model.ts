import { v4 as uuidv4 } from 'uuid';

import ISongPath from '@/constraints/interfaces/ISongPath';
import { CustomResponse } from '@/constraints/interfaces/custom.interface';
import songPathRefSchema from '@/database/schemas/songPathRef.schema';

export default class SongPathRefModel {
    public static async create(
        payload: Omit<ISongPath, '_id'>,
    ): Promise<CustomResponse<any>> {
        try {
            const _id: string = uuidv4();
            const created = await songPathRefSchema.create({
                _id,
                ...payload,
            });
            return {
                status: 201,
                success: true,
                message: 'POST_SONG_PATH_REF_SUCCESSFULLY',
                data: created,
            };
        } catch (error) {
            console.log(error);
            return {
                status: 500,
                success: false,
                message: 'POST_SONG_PATH_REF_FAILED',
                errors: error,
            };
        }
    }
}
