// server/app.js
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import rateLimit from "express-rate-limit";

import { router as apiRouter } from "./routes/index.js";
import { notFound } from "./middlewares/notFound.js";
import { errorHandler } from "./middlewares/ErrorHandler.js";

function parseCorsOrigins(value) {
  if (!value) return ["http://localhost:5173", "http://127.0.0.1:5173"];
  return value
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

export function createApp() {
  const app = express();

  const allowedOrigins = parseCorsOrigins(process.env.CORS_ORIGIN);

  app.use(helmet());

  app.use(
    cors({
      origin: (origin, cb) => {
        // origin undefined: curl/postman/alguns contexts
        if (!origin) return cb(null, true);
        if (allowedOrigins.includes(origin)) return cb(null, true);
        return cb(new Error(`CORS blocked: ${origin}`));
      },
    })
  );

  app.use(express.json({ limit: "200kb" }));
  app.use(morgan("dev"));

  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
  });
  app.use("/api", limiter);

  app.get("/api/health", (req, res) => res.json({ status: "ok" }));
  app.use("/api", apiRouter);

  app.use(notFound);
  app.use(errorHandler);

  return app;
}
