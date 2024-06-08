import { Router } from "express";

import { test } from "controllers/product.controllers.js";

export const purchaseRouter = Router();

purchaseRouter.get("/", test);
