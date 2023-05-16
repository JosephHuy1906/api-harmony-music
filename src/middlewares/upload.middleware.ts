import { NextFunction, Request, Response } from 'express';
import multer from 'multer';

import EFieldName from '@/constraints/enums/EFieldNameUpload';
import upload from '@/utils/multer.util';

export function uploadSong(req: Request, res: Response, next: NextFunction) {
    const handleErroring = upload.fields([
        {
            name: EFieldName.THUMBNAIL,
            maxCount: 1,
        },
        { name: EFieldName.FILESONG, maxCount: 1 },
    ]);
    return handleErroring(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            return res.status(400).json({
                status: 400,
                success: false,
                message: `The field name is invalid ${req.file?.fieldname}`,
                error: err,
            });
        } else if (err) {
            return res.status(400).json({
                status: 400,
                success: false,
                message: `The field name is invalid ${req.file?.fieldname}`,
                error: err,
            });
        }
        next();
    });
}
