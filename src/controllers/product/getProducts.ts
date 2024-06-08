import type { RequestHandler } from "express";

import { db } from "libs/db.js";

export const getProducts: RequestHandler = async (_req, res, next) => {
	try {
		const products = await db.product.findMany();
		return res.json(products);
	} catch (error) {
		return next(error);
	}
};
