import { Sequelize } from 'sequelize';
import { ENV } from '../config/env';

export const sequelize = new Sequelize(ENV.DB.NAME, ENV.DB.USER, ENV.DB.PASS, {
  host: ENV.DB.HOST,
  port: ENV.DB.PORT,
  dialect: 'postgres',
  logging: false, 
  // logging: console.log,

});

// Hàm test kết nối
export async function connectDB() {
  try {
    await sequelize.authenticate();
    console.log('✅ DB connected', ENV.DB.NAME, ENV.DB.USER, ENV.DB.PASS);
  } catch (err) {
    console.error('❌ DB connection error:', err);
    process.exit(1);
  }
}
