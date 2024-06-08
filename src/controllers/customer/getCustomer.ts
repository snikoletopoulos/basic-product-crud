import { z } from "zod";
import type { Customer } from "@prisma/client";
import type { RequestHandler } from "express";

import { validateParams } from "libs/utils.js";
import { db } from "libs/db.js";

export const getCustomer: RequestHandler = async (req, res, next) => {
	const result = await validateParams(req, res, GetCustomerParams);
	if (!result.success) return;

	let customer: Customer | null;
	try {
		customer = await db.customer.findUnique({
			where: { id: result.params.id },
		});
	} catch (error) {
		return next(error);
	}

	if (!customer) {
		return res.status(404).json({ error: "Customer not found" });
	}

	return res.json(customer);
};

const GetCustomerParams = z.object({
	id: z.string({ message: "ID is required" }),
});
