import { User } from "../../Domain/User";

export interface AuthTokenFactoryInterface {
	generateToken(user: User): Promise<string>;
}
