import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { JwtPayload } from "jsonwebtoken";
import { ExtractJwt, Strategy as JWTPassportStrategy } from "passport-jwt";
import { ConfigService } from "@nestjs/config";

import { UUID } from "../../Domain/Values/UUID";
import { UsersDomainRepositoryInterface } from "../../App/Ports/UsersDomainRepositoryInterface";
import { USER_REPOSITORY } from "../constrants";

@Injectable()
export class JwtStrategy extends PassportStrategy(JWTPassportStrategy, "jsonWebToken") {
	constructor(
		@Inject(USER_REPOSITORY) private readonly usersDomainRepository: UsersDomainRepositoryInterface,
		private readonly configService: ConfigService,
	) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey: configService.get('jwt').secret,
		});
	}

	async validate(payload: JwtPayload) {
		try {
			return await this.usersDomainRepository.findById(new UUID(payload.sub));
		} catch (error) {
			throw new UnauthorizedException();
		}
	}
}
