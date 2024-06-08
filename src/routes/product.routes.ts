import { Router } from "express";

import {
	createProduct,
	deleteProduct,
	getProduct,
	getProducts,
	updateProduct,
} from "controllers/product/index.js";

export const productRouter = Router();

productRouter.get("/", getProducts);

productRouter.get("/:id", getProduct);

productRouter.post("/", createProduct);

productRouter.put("/:id", updateProduct);

productRouter.delete("/:id", deleteProduct);
