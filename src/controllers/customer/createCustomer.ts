import { z } from "zod";
import type { RequestHandler } from "express";

import { db } from "libs/db.js";
import { validateBody } from "libs/utils.js";

export const createCustomer: RequestHandler = async (req, res, next) => {
	const result = await validateBody(req, res, CreateCustomerBody);
	if (!result.success) return;

	try {
		const customer = await db.customer.create({ data: result.body });

		return res.json(customer);
	} catch (error) {
		return next(error);
	}
};

const CreateCustomerBody = z.object({
	name: z
		.string({ message: "Name is required" })
		.min(1, "Name must be at least 1 character long"),
	email: z
		.string({ message: "Email is required" })
		.email("Invalid email")
		.refine(
			async email => !(await db.customer.findUnique({ where: { email } })),
			"Customer already exists"
		),
	address: z
		.string({ message: "Address is required" })
		.min(1, "Address must be at least 1 character long"),
});
