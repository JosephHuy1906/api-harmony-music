import { Router } from 'express';

import SongController from '@/controllers/song.controller';
import { uploadSong } from '@/middlewares/upload.middleware';
const router: Router = Router();

// router.get('/img', (req, res) => {
//     try {
//         const string = __dirname.replace('src/', '');
//         const path =
//             string.replace('routes', 'disk/songs/thumbnails/') +
//             'img1683726593109-278166806';
//         const contentFile = fs.readFileSync(path, 'utf8');
//         const buffer = Buffer.from(contentFile).readBigUInt64BE();
//         console.log(buffer);
//         const file = path;
//         return res.status(200).sendFile(file);
//     } catch (error) {
//         console.log(error);
//         return res.status(500).json({ error });
//     }
// });

router.route('/').post(uploadSong, SongController.create);

export default router;
