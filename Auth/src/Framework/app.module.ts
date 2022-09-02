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
import { JwtAuthGuard } from "./Guards/JwtAuthGuard";
import { JwtStrategy } from "./Strategies/JwtStrategy";
import { BcryptHasher } from "../Infrastructure/BcryptHasher";
import { BcryptComparer } from "../Infrastructure/BcryptComparer";
import { AUTH_TOKEN_FACTORY, PASSWORD_COMPARER, PASSWORD_HASHER, USER_REPOSITORY } from "./constrants";

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
		JwtAuthGuard,
		JwtStrategy,
		CreateUserHandler,
		GetUsersHandler,
		{
			provide: USER_REPOSITORY,
			useClass: UsersDomainRepository,
		},
		{
			provide: AUTH_TOKEN_FACTORY,
			useClass: JWTAuthTokenFactory,
		},
		{
			provide: PASSWORD_HASHER,
			useClass: BcryptHasher,
		},
		{
			provide: PASSWORD_COMPARER,
			useClass: BcryptComparer,
		},
	],
})
export class AppModule {}
