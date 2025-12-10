import { Router } from 'express';
import { UserController } from '../controller/user.controller';
import { uploadAvatar } from '@/middlewares/storage';
import { processAvatar } from '@/middlewares/imageProcessor';

const userRouter = Router();

userRouter.get('/', UserController.list);
userRouter.post('/find', UserController.findUser); // POST /api/users/find → tìm user theo keyword
userRouter.post('/', UserController.create);
userRouter.get('/:id', UserController.get);
userRouter.patch('/:id', UserController.update);
userRouter.put('/:id/avatar', uploadAvatar, processAvatar, UserController.updateAvatar);
userRouter.delete('/:id', UserController.remove);

export default userRouter;
