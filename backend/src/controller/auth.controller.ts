import { UserService } from '@/services/user.service';
import { AuthenticatedRequest, HttpStatus, PayloadJwt, ResponseAPI } from '@/type';
import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { RefreshTokenRepository } from '@/repositories/auth.repository';
import utilt from '@/utils';
import { RefreshToken } from '@/models';
import { UUID } from 'crypto';
import { RefreshTokenCreation } from '@/models/refreshToken/refreshToken.type';
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
        dateOfBirth: user.dateOfBirth,
        title: user.title,
        avatar: user.avatar,
        gender: user.gender,
        lastLogin: user.lastLogin,
      };

      // Chuyển sang middleware/controller tiếp theo (AuthController.generateToken)
      next();
    } catch (error) {
      next(error);
    }
  },

  // Hàm tạo và trả về JWT sau khi người dùng đăng nhập thành công.
  async generateToken(req: Request, res: Response, next: NextFunction) {
    try {
      const user = (req as AuthenticatedRequest).user;
      const a = req.cookies;

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

      // Xoá token mới
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
      return res.status(200).json({
        success: true,
        status: HttpStatus.OK,
        message: 'Đăng nhập thành công',
        data: {
          user: user,
          auth: token,
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

      // 5. Set cookie mới
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
