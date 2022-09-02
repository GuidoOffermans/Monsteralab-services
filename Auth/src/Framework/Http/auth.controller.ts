import { Controller, Get, HttpCode, HttpStatus, Inject, Post, Request, UseGuards } from "@nestjs/common";

import { LocalAuthGuard } from "../Guards/LocalAuthGuard";
import { JwtAuthGuard } from "../Guards/JwtAuthGuard";
import { AuthTokenFactoryInterface } from "../../App/Ports/AuthTokenFactoryInterface";
import { AUTH_TOKEN_FACTORY } from "../constrants";

@Controller("api")
export class AuthController {
	constructor(@Inject(AUTH_TOKEN_FACTORY) private readonly authTokenFactory: AuthTokenFactoryInterface) {}

	@UseGuards(LocalAuthGuard)
	@HttpCode(HttpStatus.OK)
	@Post("auth/login")
	async login(@Request() req): Promise<string> {
		return await this.authTokenFactory.generateToken(req.user);
	}

	@UseGuards(JwtAuthGuard)
	@Get("auth/profile")
	getProfile(@Request() req) {
		return {
			id: req.user.id.value,
			email: req.user.emailAddress.value,
		};
	}
}
