import { z } from "zod";

import type { RequestHandler } from "express";
import { db } from "libs/db.js";
import { validateBody, validateParams } from "libs/utils.js";

export const updateCustomer: RequestHandler = async (req, res, next) => {
	const paramsResult = await validateParams(req, res, UpdateCustomerParams);
	if (!paramsResult.success) return;

	const bodyResult = await validateBody(req, res, UpdateCustomerBody);
	if (!bodyResult.success) return;

	try {
		const updatedCustomer = await db.customer.update({
			where: { id: paramsResult.params.id },
			data: bodyResult.body,
		});

		return res.json(updatedCustomer);
	} catch (error) {
		return next(error);
	}
};

const UpdateCustomerParams = z.object({
	id: z
		.string()
		.refine(
			async id => db.customer.findUnique({ where: { id } }),
			"Customer not found"
		),
});

const UpdateCustomerBody = z
	.object({
		name: z.string().min(1, "Name must be at least 1 character long"),
		email: z.string().email("Invalid email"),
		address: z.string().min(1, "Address must be at least 1 character long"),
	})
	.partial()
	.refine(body => Object.keys(body).length > 0, "No fields to update");
