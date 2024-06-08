import { z } from "zod";

const EnvSchema = z.object({
	DATABASE_URL: z.string(),
	PORT: z.string(),
});

EnvSchema.parse(process.env);

declare global {
	namespace NodeJS {
		interface ProcessEnv extends z.infer<typeof EnvSchema> {}
	}
}
