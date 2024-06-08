import { z } from "zod";

import type { RequestHandler } from "express";
import { db } from "libs/db.js";
import { validateParams } from "libs/utils.js";

export const deleteProduct: RequestHandler = async (req, res, next) => {
	const paramsResult = await validateParams(req, res, DeleteProductParams);
	if (!paramsResult.success) return;

	try {
		const deletedProduct = await db.product.delete({
			where: { id: paramsResult.params.id },
		});

		return res.json(deletedProduct);
	} catch (error) {
		return next(error);
	}
};

const DeleteProductParams = z.object({
	id: z
		.string()
		.refine(
			async id => db.product.findUnique({ where: { id } }),
			"Product not found"
		),
});
