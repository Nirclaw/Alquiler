import { rateLimit } from "express-rate-limit";

export const limit = () => {
  return rateLimit({
    windowMs: 30 * 1000,
    max: 5,
    standardHeaders: true,
    legacyHeaders: false,
    skip: (req, res) => {
      if (req.header["content-length"] > 120) {
        res.status(413).send({
          status: 413,
          message: "El tamaño del json supera el limite",
        });
        return true;
      }
    },
    message: (req, res) => {
      res.status(429).send({
        status: 429,
        message: "Calmate dedos rapidos",
      });
    },
  });
};
