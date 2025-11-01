import express from 'express';
import routes from './routes';
import { connectDB } from './database/sequelize';
import './models/User'; // đảm bảo model được đăng ký

const app = express();
app.use(express.json());

// Health check
app.get('/health', (_req, res) => res.json({ ok: true }));

// API routes
app.use('/api', routes);

// Khởi tạo DB (sync schema mẫu, KHÔNG dùng cho prod)
async function init() {
  await connectDB();
}

init();

export default app;
