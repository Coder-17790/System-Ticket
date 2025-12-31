import express from 'express';
import path from 'path'; // Để xử lý đường dẫn thư mục
import { connectDB } from './database/sequelize';
import { errorHandler } from './middlewares/errorHandler';
import * as model from './models';
import './models/user/user.types'; // đảm bảo model được đăng ký
import routes from './routes';
import cookieParser from 'cookie-parser';
import { authenticateAccessToken } from './middlewares/checkToken';

const app = express();

// Đồng bộ hóa (synchronize) tất cả các Model (như User, Role, v.v...)
// mà bạn đã định nghĩa trong Sequelize với cấu trúc thực tế của cơ sở dữ liệu (Database).
async function startServer() {
  // Bạn có thể sử dụng các Model và sequelize từ object models
  await model.sequelize.sync();
}

// Express cần express.json() để đọc dữ liệu.
// Cho phép request body tối đa 20 megabytes
app.use(express.json({ limit: '20mb' }));

// Cấu hình Express phục vụ tệp tĩnh từ thư mục public
app.use('/public', express.static('public'));

// 👉 Một API để kiểm tra xem server backend có đang chạy hay bị chết.
// GET http://localhost:4000/health
app.get('/health', (_req, res) => res.json({ ok: true }));

// Đây là middleware giúp Express đọc dữ liệu dạng:
// Cho phép parse object phức tạp
// Cho phép form request lớn → không lỗi PayloadTooLarge
app.use(express.urlencoded({ extended: true, limit: '20mb' }));

// đọc cookie từ request của client
app.use(cookieParser());

// API routes
app.use('/api', routes);

// Gắn middlewares xử lý lỗi
app.use(errorHandler);

// Xem đã kết nối được Database chưa
connectDB();

startServer();

export default app;
