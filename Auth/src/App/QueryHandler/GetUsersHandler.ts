import { DataSource } from "typeorm";
import { Injectable } from "@nestjs/common";

import { GetUsers } from "../Query/GetUsers";
import { User as OrmUser } from "../../Framework/Models/User";

@Injectable()
export class GetUsersHandler {
	public constructor(private dataSource: DataSource) {}

	public async query(_query: GetUsers) {
		return await this.dataSource
			.createQueryBuilder()
			.select("user")
			.from(OrmUser, "user")
			.select(["user.id", "user.email", "user.password"])
			.getMany();
	}
}
