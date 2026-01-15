import { AuthController } from '@/controller/auth.controller';
import { NationController } from '@/controller/nation.controller';
import { UserController } from '@/controller/user.controller';
import { Router } from 'express';

const authRouter = Router();

authRouter.post('/register', AuthController.register, AuthController.generateToken); // Đăng ký tài khoản
authRouter.get('/refetchToken', AuthController.refreshToken); // Kiểm tra token
authRouter.post('/login', AuthController.loginController, AuthController.generateToken); // Đăng nhập và trả về token

export default authRouter;
