import { z } from "zod";

import type { RequestHandler } from "express";
import { db } from "libs/db.js";
import { validateBody, validateParams } from "libs/utils.js";

export const updateProduct: RequestHandler = async (req, res, next) => {
	const paramsResult = await validateParams(req, res, UpdateProductParams);
	if (!paramsResult.success) return;

	const bodyResult = await validateBody(req, res, UpdateProductBody);
	if (!bodyResult.success) return;

	try {
		const updatedProduct = await db.product.update({
			where: { id: paramsResult.params.id },
			data: bodyResult.body,
		});

		return res.json(updatedProduct);
	} catch (error) {
		return next(error);
	}
};

const UpdateProductParams = z.object({
	id: z
		.string()
		.refine(
			async id => db.product.findUnique({ where: { id } }),
			"Product not found"
		),
});

const UpdateProductBody = z
	.object({
		name: z.string().min(1, "Name must be at least 1 character long"),
		price: z.number().min(0, "Price must be greater than or equal to 0"),
	})
	.partial()
	.refine(body => Object.keys(body).length > 0, "No fields to update");
