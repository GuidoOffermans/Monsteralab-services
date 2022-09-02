import { DataSource } from "typeorm";
import { SqlServerConnectionOptions } from "typeorm/driver/sqlserver/SqlServerConnectionOptions";
import { User } from "./Framework/Models/User";

const config = {
	migrationsTableName: "migrations",
	type: "mysql",
	host: "localhost",
	port: 3306,
	username: "root",
	password: "",
	database: "monsteralab-auth",
	entities: [User],
	migrations: ["src/migrations/*.ts"],
	synchronize: false,
	logging: true,
} as unknown as SqlServerConnectionOptions;

export default new DataSource(config);
