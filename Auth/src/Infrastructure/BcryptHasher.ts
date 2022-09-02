import { Injectable } from "@nestjs/common";
import * as bcrypt from "bcrypt";

import { PasswordHasherInterface } from "../App/Ports/PasswordHasherInterface";
import { Password } from "../Domain/Values/Password";

@Injectable()
export class BcryptHasher implements PasswordHasherInterface {
	public async hash(password: string): Promise<Password> {
		return new Password(await bcrypt.hash(password, 10));
	}
}
