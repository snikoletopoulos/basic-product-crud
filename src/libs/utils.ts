import { z } from "zod";
import type { Request, Response } from "express";

type ParamsValidationResult<T> =
	| { success: true; params: T }
	| { success: false };

export const validateParams = async <T extends z.ZodTypeAny>(
	req: Request,
	res: Response,
	schema: T
): Promise<ParamsValidationResult<z.infer<T>>> => {
	try {
		const params = await schema.parseAsync(req.params);
		return { success: true, params };
	} catch (error) {
		if (!(error instanceof z.ZodError)) {
			res.status(400).json({ error: "Invalid parameters" });
			return { success: false };
		}

		let zodError = error.issues.find(issue => issue.code === "custom");
		if (!zodError) {
			zodError = error.issues[0];
		}
		res.status(400).json({ error: zodError?.message ?? "Invalid parameters" });

		return { success: false };
	}
};

type BodyValidationResult<T> = { success: true; body: T } | { success: false };

export const validateBody = async <T extends z.ZodTypeAny>(
	req: Request,
	res: Response,
	schema: T
): Promise<BodyValidationResult<z.infer<T>>> => {
	try {
		const body = await schema.parseAsync(req.body);
		return { success: true, body };
	} catch (error) {
		if (!(error instanceof z.ZodError)) {
			res.status(400).json({ error: "Invalid data" });
			return { success: false };
		}

		let zodError = error.issues.find(issue => issue.code === "custom");
		if (!zodError) {
			zodError = error.issues[0];
		}
		res.status(400).json({ error: zodError?.message ?? "Invalid data" });

		return { success: false };
	}
};
