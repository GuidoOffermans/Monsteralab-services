import {
	Controller,
	HttpCode,
	HttpStatus,
	Post,
	Request,
	UseGuards,
} from "@nestjs/common";

import { LocalAuthGuard } from "../Guards/LocalAuthGuard";

@Controller("api")
export class AuthController {
	constructor() {}

	@UseGuards(LocalAuthGuard)
	@HttpCode(HttpStatus.OK)
	@Post("auth/login")
	async login(@Request() req) {
		return "Successfully logged in";
	}
}
