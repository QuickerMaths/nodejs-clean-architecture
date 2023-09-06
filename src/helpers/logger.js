import pino from "pino";

const logger = pino({
  quietReqLogger: false,
  transport: {
    target: "pino-pretty",
    options: {
      colorize: true,
      levelFirst: true,
      ignore: "pid,hostname",
      translateTime: new Date(Date.now()).toLocaleTimeString(),
    },
  },
});

const customLogLevel = (req, res, err) => {
  if (res.statusCode >= 400 && res.statusCode < 500) {
    return "error";
  } else if (res.statusCode >= 500 || err) {
    return "fatal";
  } else if (res.statusCode >= 300 && res.statusCode < 400) {
    return "silent";
  }
  return "info";
};

const customSuccessMessage = (req, res) => {
  if (res.statusCode >= 400 && res.statusCode < 500) {
    return `Request failed with ${res.statusCode} statusCode`;
  }
  return `Request completed successfully with ${res.statusCode} statusCode`;
};

export default { logger, customLogLevel, customSuccessMessage };
export { logger };
