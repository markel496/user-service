import type { Request, Response, NextFunction, RequestHandler } from 'express'

/** asyncHandler ловит ошибки из async/await функций и передаёт их в next(),
 * чтобы их обрабатывал централизованный errorHandler. */

export function asyncHandler<
  Params extends Record<string, string> = {}, // Параметры URL
  ResBody = unknown, // Тело ответа
  ReqBody = unknown, // Тело запроса
  ReqQuery extends Record<string, string | undefined> = {} // Query-параметры
>(
  fn: (
    req: Request<Params, ResBody, ReqBody, ReqQuery>,
    res: Response<ResBody>,
    next: NextFunction
  ) => Promise<unknown>
): RequestHandler<Params, ResBody, ReqBody, ReqQuery> {
  return (req, res, next) => {
    fn(req, res, next).catch(next)
  }
}
