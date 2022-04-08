import { NextFunction, Response, Request } from 'express';

const catchAsync = (fn: Function) => {
	return (req: Request, res: Response, next: NextFunction) => {
		fn(req, res, next).catch(next);
	};
};

export { catchAsync };
