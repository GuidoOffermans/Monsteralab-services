import { Injectable } from "@nestjs/common";
import * as bcrypt from "bcrypt";

import { Password } from "../Domain/Values/Password";
import { UnHashedPassword } from "../Domain/Values/UnHashedPassword";
import { PasswordComparerInterface } from "../App/Ports/PasswordComparerInterface";

@Injectable()
export class BcryptComparer implements PasswordComparerInterface {
	public async compare(unHashedPassword: UnHashedPassword, hashedPassword: Password): Promise<boolean> {
		return await bcrypt.compare(unHashedPassword.value, hashedPassword.value);
	}
}
