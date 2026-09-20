import type { ErrorRequestHandler } from "express";

// Express identifies an error handler purely by its arity (4 params), so the
// `next` parameter must stay even though we never call it.
export const errorHandler: ErrorRequestHandler = (err, req, res, _next) => {
  console.error(`[${req.method} ${req.originalUrl}]`, err);

  if (res.headersSent) {
    return;
  }

  // Never leak internals (stack traces, SQL, connection details) to the client.
  res.status(500).json({ error: "Internal server error" });
};
