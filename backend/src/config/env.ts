import dotenv from "dotenv";
dotenv.config();

export const ENV = {
  PORT: process.env.PORT || "3000",
  DB: {
    HOST: process.env.DB_HOST || "localhost",
    PORT: Number(process.env.DB_PORT || 5433),
    NAME: process.env.DB_NAME || "dbticket",
    USER: process.env.DB_USER || "postgres",
    PASS: process.env.DB_PASS || "tuannht"
  }
};
