import { UserService } from '@/services/user.service';
import { AuthenticatedRequest, HttpStatus, PayloadJwt, ResponseAPI } from '@/type';
import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { RefreshTokenRepository } from '@/repositories/auth.repository';
import utilt from '@/utils';
import { RefreshToken } from '@/models';
import { UUID } from 'crypto';
import { RefreshTokenCreation } from '@/models/refreshToken/refreshToken.type';
import { log } from 'console';
import { UserController } from './user.controller';
var jwt = require('jsonwebtoken');

const userService = new UserService();
const tokenSevice = new RefreshTokenRepository();

export const AuthController = {
  // Đăng nhập
  async loginController(req: Request, res: Response, next: NextFunction) {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        success: false,
        message: 'Vui lòng cung cấp đầy đủ tên tài khoản và mật khẩu.',
        status: HttpStatus.BAD_REQUEST,
      } as ResponseAPI);
    }

    try {
      // Tìm kiếm người dùng theo username
      const user = await userService.getUserLogin(username);
      if (!user) {
        return res.status(HttpStatus.BAD_REQUEST).json({
          success: false,
          message: 'Tên tài khoản hoặc mật khẩu không đúng.',
          status: HttpStatus.BAD_REQUEST,
        } as ResponseAPI);
      }

      // So sánh mật khẩu (giả sử mật khẩu trong DB đã được hash)
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(HttpStatus.BAD_REQUEST).json({
          success: false,
          message: 'Tên tài khoản hoặc mật khẩu không đúng.',
          status: HttpStatus.BAD_REQUEST,
        } as ResponseAPI);
      }

      // Xác thực thành công: Gắn ID người dùng vào request để hàm tiếp theo sử dụng
      (req as AuthenticatedRequest).user = {
        id: user.id,
        email: user.email,
        username: user.username,
        fullName: user.fullName,
        phone: user.phone,
        dateOfBirth: user.dateOfBirth ? new Date(user.dateOfBirth) : null,
        title: user.title,
        avatar: user.avatar,
        gender: user.gender,
        lastLogin: user.lastLogin,
      };

      // TK đã có sẵn
      (req as AuthenticatedRequest).isVerifiedAccount = true;

      // Chuyển sang middleware/controller tiếp theo (AuthController.generateToken)
      next();
    } catch (error) {
      next(error);
    }
  },

  // Đăng ký
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const { username, password } = req.body;
      // Kiểm tra đầu vào
      if (!username || !password) {
        return res.status(HttpStatus.BAD_REQUEST).json({
          success: false,
          message: 'Vui lòng cung cấp đầy đủ tên tài khoản và mật khẩu.',
          status: HttpStatus.BAD_REQUEST,
        } as ResponseAPI);
      }

      // Kiểm tra tài khoản có hợp lệ không
      const user = await userService.register(username, password);
      const response: ResponseAPI<typeof user> = {
        success: true,
        status: HttpStatus.CREATED,
        message: 'Tạo người dùng thành công',
        data: user,
      };

      // Xác thực thành công: Gắn ID người dùng vào request để hàm tiếp theo sử dụng
      (req as AuthenticatedRequest).user = {
        id: user.id,
        email: user.email,
        username: user.username,
        fullName: user.fullName,
        phone: user.phone,
        dateOfBirth: user.dateOfBirth ? new Date(user.dateOfBirth) : null,
        title: user.title,
        avatar: user.avatar,
        gender: user.gender,
        lastLogin: user.lastLogin,
      };

      // Tk vừa được tạo
      (req as AuthenticatedRequest).isVerifiedAccount = false;

      // Chuyển sang middleware/controller tiếp theo (AuthController.generateToken)
      next();
    } catch (error) {
      next(error);
    }
  },

  // Hàm tạo và trả về JWT sau khi người dùng đăng nhập / đăng ký thành công.
  async generateToken(req: Request, res: Response, next: NextFunction) {
    try {
      const user = (req as AuthenticatedRequest).user;
      const _isVerifiedAccount = (req as AuthenticatedRequest).isVerifiedAccount;

      // Định nghĩa Payload (thông tin muốn mã hóa vào token)
      const payload: PayloadJwt = {
        id: user.id,
      };

      // Kiểm tra đã đủ thông tin để gen JWT chưa
      if (!user || !user.id) {
        throw 'Lỗi xác thực nội bộ, không thể tạo token.';
      }
      const secretKey: string = process.env.JWT_SECRET || 'SECRET_KEY';
      const expiresIn: string = '1h';

      // Ký (Sign) token
      const token = jwt.sign(
        payload, // Dữ liệu cần mã hóa
        secretKey, // Khóa bí mật
        { expiresIn: expiresIn } // Cấu hình (thời gian hết hạn)
      );

      // Xoá cookie
      await tokenSevice.delete(user.id);

      // Tạo cookie mới
      const newRefreshToken = await tokenSevice.create({
        userId: user.id,
        token: utilt.math.generateRefreshToken(),
        expiresAt: utilt.math.addDays(new Date(), 7),
      } as RefreshTokenCreation);

      // Set cookie mới
      res.cookie('refreshToken', newRefreshToken.token, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
      });

      // Trả về token cho Client (Frontend)
      if (_isVerifiedAccount)
        // Đăng nhập
        return res.status(200).json({
          success: true,
          status: HttpStatus.OK,
          message: 'Đăng nhập thành công',
          data: {
            user: user,
            auth: token,
            isVerifiedAccount: true,
          },
        } as ResponseAPI<AuthenticatedRequest>);
      // Đăng kí
      return res.status(200).json({
        success: true,
        status: HttpStatus.OK,
        message: 'Đăng ký thành công',
        data: {
          user: user,
          auth: token,
          isVerifiedAccount: false,
        },
      } as ResponseAPI<AuthenticatedRequest>);
    } catch (e) {
      next(e);
    }
  },

  // RefreshToken
  async refreshToken(req: Request, res: Response, next: NextFunction) {
    try {
      const refreshToken = req.cookies?.refreshToken;

      if (!refreshToken) {
        return res.status(HttpStatus.UNAUTHORIZED).json({
          success: false,
          status: HttpStatus.UNAUTHORIZED,
          message: 'Không có refresh token',
          // error: {
          //   code: 'refresh_token_expired',
          // },
        } as ResponseAPI);
      }

      // Check refresh token trong DB
      const storedToken = await tokenSevice.findByToken(refreshToken);

      if (!storedToken) {
        return res.status(HttpStatus.UNAUTHORIZED).json({
          success: false,
          status: HttpStatus.UNAUTHORIZED,
          message: 'Refresh token không hợp lệ',
        } as ResponseAPI);
      }

      // Check hết hạn
      if (storedToken.expiresAt < new Date()) {
        await tokenSevice.delete(storedToken.userId);

        return res.status(HttpStatus.UNAUTHORIZED).json({
          success: false,
          status: HttpStatus.UNAUTHORIZED,
          message: 'Refresh token đã hết hạn',
        } as ResponseAPI);
      }

      // Rotate refresh token (sliding expiration)
      await tokenSevice.delete(storedToken.userId);

      const newRefreshToken = await tokenSevice.create({
        userId: storedToken.userId,
        token: utilt.math.generateRefreshToken(),
        expiresAt: utilt.math.addDays(new Date(), 7),
      } as RefreshTokenCreation);

      // Tạo access token mới
      const accessToken = jwt.sign({ id: storedToken.userId }, process.env.JWT_SECRET!, {
        expiresIn: '15m',
      });

      // Set cookie mới
      res.cookie('refreshToken', newRefreshToken.token, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        // maxAge: 7 * 24 * 60 * 60 * 1000 // 7 ngày
      });

      return res.status(HttpStatus.OK).json({
        success: true,
        status: HttpStatus.OK,
        data: {
          accessToken,
        },
      } as ResponseAPI);
    } catch (e) {
      next(e);
    }
  },
};
