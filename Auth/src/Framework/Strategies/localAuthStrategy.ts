import { Strategy } from "passport-local";
import { PassportStrategy } from "@nestjs/passport";
import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";

import { User } from "../../Domain/User";
import { UsersDomainRepositoryInterface } from "../../App/Ports/UsersDomainRepositoryInterface";
import { EmailAddress } from "../../Domain/Values/EmailAddress";
import { UnHashedPassword } from "../../Domain/Values/UnHashedPassword";
import { PasswordComparerInterface } from "../../App/Ports/PasswordComparerInterface";
import { PASSWORD_COMPARER, USER_REPOSITORY } from "../constrants";

@Injectable()
export class LocalAuthStrategy extends PassportStrategy(Strategy, "local-email-password") {
	constructor(
		@Inject(USER_REPOSITORY) private readonly usersDomainRepository: UsersDomainRepositoryInterface,
		@Inject(PASSWORD_COMPARER) private readonly passwordComparer: PasswordComparerInterface,
	) {
		super({
			usernameField: "email",
			passwordField: "password",
		});
	}

	async validate(email: string, pass: string): Promise<User> {
		let user: User;

		try {
			user = await this.usersDomainRepository.findOne(new EmailAddress(email));
		} catch (error) {
			throw new UnauthorizedException();
		}

		if (!(await this.isPasswordValid(new UnHashedPassword(pass), user))) {
			throw new UnauthorizedException();
		}

		return user;
	}

	private async isPasswordValid(unHashedPassword: UnHashedPassword, user: User): Promise<boolean> {
		return await this.passwordComparer.compare(unHashedPassword, user.password);
	}
}
