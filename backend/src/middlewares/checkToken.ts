// middleware/auth.ts
import { HttpStatus, PayloadJwt, publicPaths, RequestNew, ResponseAPI } from '@/type';
import { Request, Response, NextFunction } from 'express';
var jwt = require('jsonwebtoken');

export function authenticateAccessToken(req: RequestNew, res: Response, next: NextFunction) {
  // Danh sách route public
  const _publicPaths = publicPaths;

  if (_publicPaths.includes(req.path)) return next();

  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token)
    return res.status(HttpStatus.UNAUTHORIZED).json({
      message: 'Access token missing',
      status: HttpStatus.UNAUTHORIZED,
      success: false,
    } as ResponseAPI);

  // Sử dụng biến môi trường cho Secret Key
  const secretKey = process.env.JWT_SECRET || 'SECRET_KEY'; // Luôn dùng process.env.JWT_SECRET

  jwt.verify(token, secretKey, (err: any, decoded: PayloadJwt) => {
    if (err)
      return res.status(HttpStatus.FORBIDDEN).json({
        message: 'Invalid or expired token',
        status: HttpStatus.FORBIDDEN,
        success: false,
      } as ResponseAPI);
    req.tokenData = decoded;
    next();
  });
}
