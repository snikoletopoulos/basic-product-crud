import express from "express";
import "dotenv/config";
import "libs/env.js";

import { get404 } from "controllers/error.controllers.js";
import { productRouter } from "./routes/product.routes.js";
import { errorMiddleware } from "middlewares/error.middleware.js";
import { db } from "libs/db.js";

const app = express();

app.use(express.urlencoded({ extended: true }));

app.get("/", (_req, res) => {
	res.send("Hello World");
});

app.use(productRouter);
app.use(productRouter);
app.use(productRouter);

app.use(get404);
app.use(errorMiddleware);

try {
	await db.$connect();
} catch (error) {
	console.error("Error connecting to database: ", error);
}

app.listen(process.env.PORT, () => {
	console.log(`[server]: Server is running at port ${process.env.PORT}`);
});
