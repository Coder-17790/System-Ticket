import express from 'express';
import routes from './routes';
import { connectDB } from './database/sequelize';
import './models/user/user.types'; // đảm bảo model được đăng ký
import { errorHandler } from './middlewares/errorHandler';
import path from 'path'; // Để xử lý đường dẫn thư mục

const app = express();
app.use(express.json());

// Cấu hình Express phục vụ tệp tĩnh từ thư mục public
app.use('/public', express.static(path.join(__dirname, '../public')));

// Health check
app.get('/health', (_req, res) => res.json({ ok: true }));

// API routes
app.use('/api', routes);

// Gắn middlewares xử lý lỗi
app.use(errorHandler);

// // Khởi tạo DB (sync schema mẫu, KHÔNG dùng cho prod)
// async function init() {
//   await connectDB();
// }

// init();

export default app;
