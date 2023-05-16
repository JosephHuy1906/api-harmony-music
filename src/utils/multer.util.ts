import multer from 'multer';
import diskStorageConfig from '@/configs/multer.config';
import EFieldName from '@/constraints/enums/EFieldNameUpload';

const upload = multer({
    storage: diskStorageConfig,
    fileFilter(req, file, callback) {
        switch (file.fieldname) {
            case EFieldName.THUMBNAIL:
                callback(null, true);
                break;
            case EFieldName.FILESONG:
                callback(null, true);
                break;
            default:
                callback(
                    new Error(`Invalid file name with "${file.fieldname}" `),
                );
                break;
        }
    },
});

export default upload;
