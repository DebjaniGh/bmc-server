import type { NextFunction, Request, RequestHandler, Response } from "express";

type AsyncRequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction,
) => Promise<unknown>;

// Express 4 ignores rejected promises from async route handlers, which turns a
// thrown error into an unhandled rejection that crashes the process. This
// forwards the rejection to next() so errorHandler gets it.
export function asyncHandler(fn: AsyncRequestHandler): RequestHandler {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
}
