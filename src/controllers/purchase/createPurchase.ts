import { z } from "zod";
import type { RequestHandler } from "express";

import { db } from "libs/db.js";
import { validateBody } from "libs/utils.js";

export const createPurchase: RequestHandler = async (req, res, next) => {
	const result = await validateBody(req, res, CreatePurchaseBody);
	if (!result.success) return;

	try {
		const purchase = await db.purchase.create({
			data: {
				customerId: result.body.customerId,
				productItems: {
					createMany: {
						data: result.body.products.map(product => ({
							productId: product.id,
							amount: product.amount,
						})),
					},
				},
			},
		});

		return res.json(purchase);
	} catch (error) {
		return next(error);
	}
};

const PurchaseItemSchema = z.object({
	id: z.string(),
	amount: z.number().min(1),
});

const validateItems = async (
	purchaseItem: z.infer<typeof PurchaseItemSchema>[]
) => {
	const products = await db.product.findMany({
		where: { id: { in: purchaseItem.map(item => item.id) } },
	});
	const uniqueItemIds = new Set(products.map(product => product.id));

	return (
		products.length === purchaseItem.length &&
		uniqueItemIds.size === products.length
	);
};

const CreatePurchaseBody = z.object({
	products: z
		.array(PurchaseItemSchema)
		.min(1, "At least one product is required")
		.refine(validateItems, "Invalid product IDs"),
	customerId: z
		.string({ message: "Customer ID is required" })
		.refine(
			async id => await db.customer.findUnique({ where: { id } }),
			"Customer not found"
		),
});
