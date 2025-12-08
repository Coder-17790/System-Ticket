import { Router } from 'express';
import roleRouter from './role.routes';
import userRouter from './user.routes';
import nationRouter from './nation.routes';

const router = Router();

router.use('/users', userRouter);
router.use('/roles', roleRouter);
router.use('/nation', nationRouter);

export default router;
