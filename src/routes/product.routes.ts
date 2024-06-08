import { Router } from "express";

import { test } from "controllers/product.controllers.js";

export const productRouter = Router();

productRouter.get("/", test);
