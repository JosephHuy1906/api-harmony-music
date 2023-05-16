import router from '@/routes/song.route';
import songRouter from '@/routes/song.route';
import userRouter from '@/routes/user.route'
import { Router } from 'express';
const rootRouter = Router();

rootRouter.use('/song', songRouter);
rootRouter.use('/user', userRouter);

export default rootRouter;
