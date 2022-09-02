import { Password } from "../../Domain/Values/Password";
import { UnHashedPassword } from "../../Domain/Values/UnHashedPassword";

export interface PasswordComparerInterface {
	compare(unHashedPassword: UnHashedPassword, password: Password): Promise<boolean>;
}
