import type { RequestHandler } from "express";

import { db } from "libs/db.js";

export const getCustomers: RequestHandler = async (_req, res, next) => {
	try {
		const customers = await db.customer.findMany();
		return res.json(customers);
	} catch (error) {
		return next(error);
	}
};
