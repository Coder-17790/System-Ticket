import { Router } from 'express';
import roleRouter from './role.routes';
import userRouter from './user.routes';
import nationRouter from './nation.routes';
import authRouter from './auth.routes';
import { authenticateAccessToken } from '@/middlewares/checkToken';

const router = Router();
// Kiểm tra token
router.use(authenticateAccessToken);

router.use('/auth', authRouter);
router.use('/users', userRouter);
router.use('/roles', roleRouter);
router.use('/nation', nationRouter);

export default router;
