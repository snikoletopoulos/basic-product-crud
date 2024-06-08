import "dotenv/config";
import "libs/env.js";
import express from "express";

import { db } from "libs/db.js";
import { errorMiddleware } from "middlewares/error.middleware.js";
import { get404 } from "controllers/error.js";
import { productRouter } from "routes/product.routes.js";
import { customerRouter } from "routes/customer.routes.js";
import { purchaseRouter } from "routes/purchase.routes.js";

const app = express();

app.use(express.json());

app.use("/customer", customerRouter);
app.use("/product", productRouter);
app.use("/purchase", purchaseRouter);

app.use(get404);
app.use(errorMiddleware);

try {
	await db.$connect();

	app.listen(process.env.PORT, () => {
		console.log(`[server]: Server is running at port ${process.env.PORT}`);
	});
} catch (error) {
	console.error("Error connecting to database: ", error);
}
