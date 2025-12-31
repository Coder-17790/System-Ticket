import dotenv from 'dotenv';
dotenv.config();

// Thêm ý này để khai báo default
export const ENV = {
  PORT: process.env.PORT || '3000',
  DB: {
    HOST: process.env.DB_HOST || 'localhost',
    // PORT: Number(process.env.DB_PORT || 5433),
    PORT: Number(process.env.DB_PORT || 1),

    // NAME: process.env.DB_NAME || "dbticket",
    NAME: process.env.DB_NAME || '',

    // USER: process.env.DB_USER || "postgres",
    USER: process.env.DB_USER || '',

    // PASS: process.env.DB_PASS || "tuannht"
    PASS: process.env.DB_PASS || '',
  },
};
