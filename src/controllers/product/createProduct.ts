import { z } from "zod";
import type { RequestHandler } from "express";

import { db } from "libs/db.js";
import { validateBody } from "libs/utils.js";

export const createProduct: RequestHandler = async (req, res, next) => {
	const result = await validateBody(req, res, CreateProductBody);
	if (!result.success) return;

	try {
		const product = await db.product.create({ data: result.body });

		return res.json(product);
	} catch (error) {
		return next(error);
	}
};

const CreateProductBody = z.object({
	name: z
		.string()
		.min(1, "Name must be at least 1 character long")
		.refine(
			async name => !(await db.product.findUnique({ where: { name } })),
			"Product already exists"
		),
	price: z.number().min(0, "Price must be greater than or equal to 0"),
});
