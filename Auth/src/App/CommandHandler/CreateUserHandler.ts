import { CreateUser } from "../Command/CreateUser";
import { Inject, Injectable } from "@nestjs/common";
import { UsersDomainRepository } from "../../Infrastructure/UsersDomainRepository";
import { User } from "../../Domain/User";
import { UUID } from "../../Domain/Values/UUID";

@Injectable()
export class CreateUserHandler {
	public constructor(
		@Inject("UsersDomainRepositoryInterface")
		private readonly userDomainRepository: UsersDomainRepository,
	) {
	}

	public async please(command: CreateUser) {
		await this.userDomainRepository.save(
			new User(new UUID(), command.email, command.password),
		);
	}
}
