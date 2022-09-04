require("dotenv").config();
import { z } from "zod";
import { registerAs } from "@nestjs/config";

const JWTConfig = z.object({
	secret: z.string(),
	expiresIn: z.string(),
});
export type JWTConfig = z.infer<typeof JWTConfig>;

const config: JWTConfig = {
	secret: process.env.JWT_SECRET,
	expiresIn: process.env.JWT_EXPIRES_IN,
};

export default registerAs("jwt", () => {
	const data = JWTConfig.safeParse(config);

	if (!data.success) {
		// @ts-ignore
		const x = data.error.flatten();
		throw new Error("JWT env: " + JSON.stringify(x.fieldErrors));
	}
	return config;
});
