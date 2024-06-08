import { z } from "zod";
import type { Purchase } from "@prisma/client";
import type { RequestHandler } from "express";

import { validateParams } from "libs/utils.js";
import { db } from "libs/db.js";

export const getPurchase: RequestHandler = async (req, res, next) => {
	const result = await validateParams(req, res, GetPurchaseParams);
	if (!result.success) return;

	let purchase: Purchase | null;
	try {
		purchase = await db.purchase.findUnique({
			where: { id: result.params.id },
		});
	} catch (error) {
		return next(error);
	}

	if (!purchase) {
		return res.status(404).json({ error: "Purchase not found" });
	}

	return res.json(purchase);
};

const GetPurchaseParams = z.object({ id: z.string() });
