import type { ErrorRequestHandler } from "express";

export const errorMiddleware: ErrorRequestHandler = (
	error: Error,
	_req,
	res,
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	_next
) => res.status(500).json({ error: error?.message ?? "Internal server error" });
