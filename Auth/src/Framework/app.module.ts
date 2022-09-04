import { Module } from "@nestjs/common";
import { TypeOrmModule, TypeOrmModuleOptions } from "@nestjs/typeorm";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule, JwtModuleOptions } from "@nestjs/jwt";

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
import database, { DataBaseConfig } from "./Config/database";
import jwt, { JWTConfig } from "./Config/jwt";

@Module({
	imports: [
		ConfigModule.forRoot({
			load: [database, jwt],
			isGlobal: true,
			envFilePath: '.env',
		}),
		TypeOrmModule.forRootAsync({
			useFactory: (configService: ConfigService): TypeOrmModuleOptions => {
				const config: DataBaseConfig = configService.get("database");
				return {
					type: "mysql",
					host: config.host,
					port: config.port,
					username: config.username,
					password: config.password,
					database: config.database,
					entities: [User],
					synchronize: false,
				};
			},
			inject: [ConfigService],
		}),
		JwtModule.registerAsync({
			useFactory: (configService: ConfigService): JwtModuleOptions => {
				const config: JWTConfig = configService.get("jwt");
				return {
					secret: config.secret,
					signOptions: { expiresIn: config.expiresIn },
				};
			},
			inject: [ConfigService],
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
