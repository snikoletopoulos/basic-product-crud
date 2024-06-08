import { z } from "zod";

import type { RequestHandler } from "express";
import { db } from "libs/db.js";
import { validateParams } from "libs/utils.js";

export const deleteCustomer: RequestHandler = async (req, res, next) => {
	const paramsResult = await validateParams(req, res, DeleteCustomerParams);
	if (!paramsResult.success) return;

	try {
		const deletedCustomer = await db.customer.delete({
			where: { id: paramsResult.params.id },
		});

		return res.json(deletedCustomer);
	} catch (error) {
		return next(error);
	}
};

const DeleteCustomerParams = z.object({
	id: z
		.string()
		.refine(
			async id => db.customer.findUnique({ where: { id } }),
			"Customer not found"
		),
});
