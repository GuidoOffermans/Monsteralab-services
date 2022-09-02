import { Controller, Get, HttpCode, HttpStatus, Inject, Post, Request, Response, UseGuards } from "@nestjs/common";
import * as express from "express";

import { LocalAuthGuard } from "../Guards/LocalAuthGuard";
import { JwtAuthGuard } from "../Guards/JwtAuthGuard";
import { AuthTokenFactoryInterface } from "../../App/Ports/AuthTokenFactoryInterface";
import { AUTH_TOKEN_FACTORY } from "../constrants";

@Controller("api")
export class AuthController {
	constructor(@Inject(AUTH_TOKEN_FACTORY) private readonly authTokenFactory: AuthTokenFactoryInterface) {
	}

	@UseGuards(LocalAuthGuard)
	@HttpCode(HttpStatus.OK)
	@Post("auth/login")
	async login(@Request() req, @Response() response: express.Response) {
		const token = await this.authTokenFactory.generateToken(req.user);

		response.cookie("access_token", token);
		response.send({ access_token: token });
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
