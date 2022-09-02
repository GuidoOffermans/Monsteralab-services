import { CreateUser } from "../Command/CreateUser";
import { Inject, Injectable } from "@nestjs/common";

import { User } from "../../Domain/User";
import { UUID } from "../../Domain/Values/UUID";
import { UsersDomainRepositoryInterface } from "../Ports/UsersDomainRepositoryInterface";
import { PasswordHasherInterface } from "../Ports/PasswordHasherInterface";
import { PASSWORD_HASHER, USER_REPOSITORY } from "../../Framework/constrants";

@Injectable()
export class CreateUserHandler {
	public constructor(
		@Inject(USER_REPOSITORY)
		private readonly userDomainRepository: UsersDomainRepositoryInterface,
		@Inject(PASSWORD_HASHER)
		private readonly passwordHasher: PasswordHasherInterface,
	) {}

	public async please(command: CreateUser) {
		await this.userDomainRepository.save(
			new User(new UUID(), command.email, await this.passwordHasher.hash(command.unHashedPassword.value)),
		);
	}
}
