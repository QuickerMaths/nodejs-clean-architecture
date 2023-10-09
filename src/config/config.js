import dotenv from "dotenv";
dotenv.config();

export default {
  port: process.env.NODE_LOCAL_PORT || 3000,
  ip: process.env.HOST || "0.0.0.0",
  db: {
    url: process.env.DB_URI || "mongodb://root:example@localhost:27017/"
  },
  jwt: {
    jwtSecret: process.env.JWT_SECRET || "secret",
    jwtRefreshSecret: process.env.JWT_REFRESH_SECRET || "refresh-secret",
    jwtExpiration: 3600, // 1 hour
    jwtRefreshExpiration: 86400 // 24 hours
  }
};
