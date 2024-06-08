import type { RequestHandler } from "express";

export const get404: RequestHandler = (_req, res) =>
	res.status(404).json({ error: "Not Found" });
