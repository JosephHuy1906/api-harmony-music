import 'module-alias/register';
import { Request, Response } from 'express';

import SongValidationDecorator from '@/validations/song.validation';
import ValidatePayload from '@/helpers/validate.helper';
import { ITypeFile } from '@/constraints/interfaces/IMulter';
import ffmpeg from '@/configs/fluentFfmpeg.config';
import SongModel from '@/models/song.model';
import SongPathRefModel from '@/models/songPathRef.model';
import handleDeleteFile from '@/helpers/handleDeleteFile.helper';
import { CustomRequest } from '@/constraints/interfaces/custom.interface';

export default class UserController {
    public static async getAll(): Promise<void> {}
    public static async getById(): Promise<void> {}
    public static async create(
        req: CustomRequest,
        res: Response,
    ): Promise<Response | void> {
        try {
            const { thumbnail, fileSong } = req.files as ITypeFile;
            if (!thumbnail || !fileSong) {
                if (thumbnail) {
                    handleDeleteFile(thumbnail[0].path);
                } else {
                    handleDeleteFile(fileSong[0].path);
                }
                return res.status(400).json({
                    status: 400,
                    success: false,
                    message: 'The filed name file is not allowed',
                });
            }
            const payload = req.body;
            if (!payload)
                return res.status(400).json({
                    status: 400,
                    success: false,
                    message: 'Payload is empty',
                });
            const promise = new Promise<ffmpeg.FfprobeData>(
                (resolve, reject) => {
                    ffmpeg.ffprobe(fileSong[0].path, async (err, data) => {
                        if (err) reject(err);
                        resolve(data);
                    });
                },
            );
            const dataFileSong = await promise;
            const song = new SongValidationDecorator({
                ...payload,
                duration: dataFileSong.format.duration as number,
                thumbnailPath: `http://localhost:5000/api/v1/song/thumbnail/${thumbnail[0].filename}`,
            });
            const validateFailed = await ValidatePayload(
                song,
                'BAD_REQUEST',
                true,
            );
            if (validateFailed) {
                handleDeleteFile(fileSong[0].path);
                handleDeleteFile(thumbnail[0].path);
                return res.status(400).json(validateFailed);
            }
            const createSongRef = await SongPathRefModel.create({
                path: fileSong[0].path.split('server')[1],
                size: fileSong[0].size,
                type: fileSong[0].mimetype,
                metadata: dataFileSong.format.tags,
            });
            if (!createSongRef.success) {
                handleDeleteFile(fileSong[0].path);
                handleDeleteFile(thumbnail[0].path);
                return res.status(createSongRef.status).json(createSongRef);
            }
            const createSong = await SongModel.create({
                ...song,
                pathRef: createSongRef.data._id,
            });
            if (!createSong.success) {
                handleDeleteFile(fileSong[0].path);
                handleDeleteFile(thumbnail[0].path);
            }
            return res.status(createSong.status).json(createSong);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error });
        }
    }

    public static async update(): Promise<void> {}

    public static async softDelete(id: string): Promise<void> {}

    public static async restore(id: string): Promise<void> {}
    public static async forceDelete(id: string): Promise<void> {}
}
