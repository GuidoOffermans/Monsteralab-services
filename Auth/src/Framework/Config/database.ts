require("dotenv").config();
import { z } from "zod";
import { registerAs } from "@nestjs/config";

const DataBaseConfig = z.object({
	host: z.string(),
	port: z.number(),
	username: z.string(),
	password: z.string(),
	database: z.string(),
});

const config: DataBaseConfig = {
	host: process.env.DB_HOST,
	port: parseInt(process.env.DB_PORT),
	username: process.env.DB_USER,
	password: process.env.DB_PW,
	database: process.env.DB_NAME,
};

DataBaseConfig.parse(config);

export type DataBaseConfig = z.infer<typeof DataBaseConfig>;

export default registerAs("database", () => {
	const data = DataBaseConfig.safeParse(config);

	if (!data.success) {
		// @ts-ignore
		const x = data.error.flatten();
		throw new Error("DB env: " + JSON.stringify(x.fieldErrors));
	}
	return config;
});
