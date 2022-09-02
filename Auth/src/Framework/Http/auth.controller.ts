import { Controller, HttpCode, HttpStatus, Inject, Post, Request, UseGuards } from "@nestjs/common";

import { LocalAuthGuard } from "../Guards/LocalAuthGuard";
import { AuthTokenFactoryInterface } from "../../App/Ports/AuthTokenFactoryInterface";

@Controller("api")
export class AuthController {
	constructor(@Inject("AuthTokenFactoryInterface") private readonly authTokenFactory: AuthTokenFactoryInterface) {
	}

	@UseGuards(LocalAuthGuard)
	@HttpCode(HttpStatus.OK)
	@Post("auth/login")
	async login(@Request() req): Promise<string> {
		return await this.authTokenFactory.generateToken(req.user);
	}
}
