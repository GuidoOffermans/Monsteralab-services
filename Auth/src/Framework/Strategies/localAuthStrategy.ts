import { Strategy } from "passport-local";
import { PassportStrategy } from "@nestjs/passport";
import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";

import { UsersDomainRepositoryInterface } from "../../App/Ports/UsersDomainRepositoryInterface";
import { EmailAddress } from "../../Domain/Values/EmailAddress";
import { User } from "../../Domain/User";

@Injectable()
export class LocalAuthStrategy extends PassportStrategy(
	Strategy,
	"local-email-password",
) {
	constructor(
		@Inject("UsersDomainRepositoryInterface")
		private readonly usersDomainRepository: UsersDomainRepositoryInterface,
	) {
		super({
			usernameField: "email",
			passwordField: "password",
		});
	}

	async validate(email: string, pass: string): Promise<User> {
		let user: User;

		try {
			user = await this.usersDomainRepository.findOne(
				new EmailAddress(email),
			);
		} catch (error) {
			throw new UnauthorizedException();
		}

		if (!this.isPasswordValid(user, pass)) {
			throw new UnauthorizedException();
		}

		return user;
	}

	private isPasswordValid(user: User, pass: string): boolean {
		return user.password.value === pass;
	}
}
