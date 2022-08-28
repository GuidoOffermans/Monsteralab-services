import { Module } from "@nestjs/common";
import { UsersController } from "./Http/users.controller";
import { GetUsersHandler } from "../App/QueryHandler/GetUsersHandler";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./Models/User";

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
	providers: [GetUsersHandler],
})
export class AppModule {}
