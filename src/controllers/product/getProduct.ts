import { z } from "zod";
import type { Product } from "@prisma/client";
import type { RequestHandler } from "express";

import { validateParams } from "libs/utils.js";
import { db } from "libs/db.js";

export const getProduct: RequestHandler = async (req, res, next) => {
	const result = await validateParams(req, res, GetProductParams);
	if (!result.success) return;

	let product: Product | null;
	try {
		product = await db.product.findUnique({ where: { id: result.params.id } });
	} catch (error) {
		return next(error);
	}

	if (!product) {
		return res.status(404).json({ error: "Product not found" });
	}

	return res.json(product);
};

const GetProductParams = z.object({
	id: z.string({ message: "ID is required" }),
});
