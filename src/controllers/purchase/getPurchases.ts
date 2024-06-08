import type { RequestHandler } from "express";

import { db } from "libs/db.js";

export const getPurchases: RequestHandler = async (_req, res, next) => {
	try {
		const purchases = await db.purchase.findMany({
			include: {
				productItems: {
					select: {
						amount: true,
						product: true,
					},
				},
			},
		});
		return res.json(purchases);
	} catch (error) {
		return next(error);
	}
};
