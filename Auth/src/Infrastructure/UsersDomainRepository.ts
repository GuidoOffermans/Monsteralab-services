import { Injectable } from "@nestjs/common";
import { DataSource } from "typeorm";

import { UUID } from "../Domain/Values/UUID";
import { User } from "../Domain/User";
import { Password } from "../Domain/Values/Password";
import { EmailAddress } from "../Domain/Values/EmailAddress";
import { UserNotFoundError } from "../Domain/Errors/UserNotFoundError";
import { User as OrmUser } from "../Framework/Models/User";
import { UsersDomainRepositoryInterface } from "../App/Ports/UsersDomainRepositoryInterface";

@Injectable()
export class UsersDomainRepository implements UsersDomainRepositoryInterface {
	public constructor(private dataSource: DataSource) {
	}

	public async findById(id: UUID): Promise<User> {
		const ormUser = await (await this.getUsersSelectQueryBuilder())
			.where("user.id = :id", { id: id.value })
			.getOne();

		if (!ormUser) {
			throw new UserNotFoundError();
		}

		return new User(
			new UUID(ormUser.id),
			new EmailAddress(ormUser.email),
			new Password(ormUser.password),
		);
	}

	public async findOne(email: EmailAddress): Promise<User> {
		const ormUser = await (await this.getUsersSelectQueryBuilder())
			.where("user.email = :email", { email: email.value })
			.getOne();

		if (!ormUser) {
			throw new UserNotFoundError();
		}

		return new User(
			new UUID(ormUser.id),
			new EmailAddress(ormUser.email),
			new Password(ormUser.password),
		);
	}

	public async save(user: User): Promise<void> {
		let ormUser: OrmUser;

		ormUser = await (await this.getUsersSelectQueryBuilder())
			.where("user.id = :id", { id: user.id.value })
			.getOne();

		if (!ormUser) {
			ormUser = new OrmUser();
			ormUser.id = user.id.value;
			ormUser.email = user.emailAddress.value;
			ormUser.password = user.password.value;
		}

		const queryRunner = this.dataSource.createQueryRunner();
		await queryRunner.connect();
		await queryRunner.startTransaction();

		try {
			await queryRunner.manager.save(ormUser);
			await queryRunner.commitTransaction();
		} catch (error) {
			await queryRunner.rollbackTransaction();
		} finally {
			await queryRunner.release();
		}
	}

	private async getUsersSelectQueryBuilder() {
		return this.dataSource
			.createQueryBuilder()
			.select("user")
			.from(OrmUser, "user")
			.select(["user.id", "user.email", "user.password"]);
	}
}
