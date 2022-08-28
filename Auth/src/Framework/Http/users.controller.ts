import { Controller, Get } from "@nestjs/common";
import { GetUsersHandler } from "../../App/QueryHandler/GetUsersHandler";
import { GetUsers } from "../../App/Query/GetUsers";

type ViewUser = {
	id: string;
	email: string;
};

@Controller()
export class UsersController {
	constructor(private readonly getUsersHandler: GetUsersHandler) {}

	@Get()
	public async getUsers(): Promise<ViewUser[]> {
		const users = await this.getUsersHandler.query(new GetUsers());

		return users.map((user) => ({
			id: user.id,
			email: user.email,
		}));
	}
}
