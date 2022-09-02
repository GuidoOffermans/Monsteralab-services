import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { JwtModule } from "@nestjs/jwt";

import { User } from "./Models/User";
import { UsersController } from "./Http/users.controller";
import { AuthController } from "./Http/auth.controller";
import { UsersDomainRepository } from "../Infrastructure/UsersDomainRepository";
import { GetUsersHandler } from "../App/QueryHandler/GetUsersHandler";
import { CreateUserHandler } from "../App/CommandHandler/CreateUserHandler";
import { LocalAuthGuard } from "./Guards/LocalAuthGuard";
import { LocalAuthStrategy } from "./Strategies/localAuthStrategy";
import { JWTAuthTokenFactory } from "../Infrastructure/JWTAuthTokenFactory";

export const jwtConstants = {
	secret: "secret",
};

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
		JwtModule.register({
			secret: jwtConstants.secret,
			signOptions: { expiresIn: "1d" },
		}),
	],
	controllers: [UsersController, AuthController],
	providers: [
		LocalAuthGuard,
		LocalAuthStrategy,
		CreateUserHandler,
		GetUsersHandler,
		{
			provide: "AuthTokenFactoryInterface",
			useClass: JWTAuthTokenFactory,
		},
		{
			provide: "UsersDomainRepositoryInterface",
			useClass: UsersDomainRepository,
		},
	],
})
export class AppModule {
}
