import { Router } from "express";

import { test } from "controllers/product.controllers.js";

export const customerRouter = Router();

customerRouter.get("/", test);
