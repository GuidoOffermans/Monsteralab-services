require("dotenv").config();
import { DataSource } from "typeorm";
import { User } from "./Framework/Models/User";

export default new DataSource({
	migrationsTableName: "migrations",
	type: "mysql",
	host: process.env.DB_HOST,
	port: parseInt(process.env.DB_PORT),
	username: process.env.DB_USER,
	password: process.env.DB_PW,
	database: process.env.DB_NAME,
	entities: [User],
	migrations: ["src/migrations/*.ts"],
	synchronize: false,
	logging: true,
});
