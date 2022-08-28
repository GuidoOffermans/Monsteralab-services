import { Module } from "@nestjs/common";
import { UsersController } from "./Http/users.controller";
import { GetUsersHandler } from "../App/QueryHandler/GetUsersHandler";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./Models/User";
import { CreateUserHandler } from "../App/CommandHandler/CreateUserHandler";
import { UsersDomainRepository } from "../Infrastructure/UsersDomainRepository";

@Module({
	imports: [
		TypeOrmModule.forRootAsync({
			useFactory: () => ({
				type: "mysql",
				host: "localhost",
				port: 3306,
				username: "root",
				password: "",
				database: "monsteralab-auth",
				entities: [User],
				synchronize: false,
			}),
		}),
	],
	controllers: [UsersController],
	providers: [
		CreateUserHandler,
		GetUsersHandler,
		{
			provide: "UsersDomainRepositoryInterface",
			useClass: UsersDomainRepository,
		},
	],
})
export class AppModule {}
