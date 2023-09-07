import dotenv from "dotenv";
dotenv.config();

export default {
  port: process.env.PORT || 3000,
  ip: process.env.HOST || "0.0.0.0",
  db: {
    url: process.env.DB_URI || "mongodb://localhost:27017/notes",
  },
  jwt: {
    jwtSecret: process.env.JWT_SECRET || "secret",
    jwtRefreshSecret: process.env.JWT_REFRESH_SECRET || "refresh-secret",
    jwtExpiration: 36, // 1 hour
    jwtRefreshExpiration: 86400, // 24 hours
  },
};
