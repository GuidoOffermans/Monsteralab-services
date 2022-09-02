import { Password } from "../../Domain/Values/Password";

export interface PasswordHasherInterface {
	hash(password: string): Promise<Password>;
}
