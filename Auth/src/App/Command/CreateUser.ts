import { EmailAddress } from "../../Domain/Values/EmailAddress";
import { Password } from "../../Domain/Values/Password";

export class CreateUser {
	private readonly _email: EmailAddress;
	private readonly _password: Password;

	public constructor(email: EmailAddress, password: Password) {
		this._email = email;
		this._password = password;
	}

	public get email(): EmailAddress {
		return this._email;
	}

	public get password(): Password {
		return this._password;
	}
}
