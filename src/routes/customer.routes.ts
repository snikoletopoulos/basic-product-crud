import { Router } from "express";

import {
	createCustomer,
	deleteCustomer,
	getCustomer,
	getCustomers,
	updateCustomer,
} from "controllers/customer/index.js";

export const customerRouter = Router();

customerRouter.get("/", getCustomers);

customerRouter.get("/:id", getCustomer);

customerRouter.post("/", createCustomer);

customerRouter.put("/:id", updateCustomer);

customerRouter.delete("/:id", deleteCustomer);
