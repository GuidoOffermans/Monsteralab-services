import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { JwtPayload } from "jsonwebtoken";
import { ExtractJwt, Strategy as JWTPassportStrategy } from "passport-jwt";

import { jwtConstants } from "../app.module";
import { UUID } from "../../Domain/Values/UUID";
import { UsersDomainRepositoryInterface } from "../../App/Ports/UsersDomainRepositoryInterface";

@Injectable()
export class JwtStrategy extends PassportStrategy(JWTPassportStrategy, "jsonWebToken") {
	constructor(
		@Inject("UsersDomainRepositoryInterface")
		private readonly usersDomainRepository: UsersDomainRepositoryInterface,
	) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey: jwtConstants.secret,
		});
	}

	async validate(payload: JwtPayload) {
		try {
			return await this.usersDomainRepository.findById(
				new UUID(payload.sub),
			);
		} catch (error) {
			throw new UnauthorizedException();
		}
	}
}
