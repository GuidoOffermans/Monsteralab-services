import { Body, Controller, Get, Post } from "@nestjs/common";

import { EmailAddress } from "../../Domain/Values/EmailAddress";
import { GetUsers } from "../../App/Query/GetUsers";
import { GetUsersHandler } from "../../App/QueryHandler/GetUsersHandler";
import { CreateUser } from "../../App/Command/CreateUser";
import { CreateUserHandler } from "../../App/CommandHandler/CreateUserHandler";
import { CreateUserDto } from "./Dto/CreateUserDto";
import { UnHashedPassword } from "../../Domain/Values/UnHashedPassword";

type ViewUser = {
	id: string;
	email: string;
};

@Controller("api/users")
export class UsersController {
	constructor(
		private readonly getUsersHandler: GetUsersHandler,
		private readonly createUserHandler: CreateUserHandler,
	) {}

	@Get()
	public async getUsers(): Promise<ViewUser[]> {
		const users = await this.getUsersHandler.query(new GetUsers());

		return users.map((user) => ({
			id: user.id,
			email: user.email,
		}));
	}

	@Post()
	public async createUser(@Body() requestBody: CreateUserDto) {
		await this.createUserHandler.please(
			new CreateUser(new EmailAddress(requestBody.email), new UnHashedPassword(requestBody.password)),
		);
	}
}
