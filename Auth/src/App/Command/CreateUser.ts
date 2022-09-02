import { EmailAddress } from "../../Domain/Values/EmailAddress";
import { UnHashedPassword } from "../../Domain/Values/UnHashedPassword";

export class CreateUser {
	private readonly _email: EmailAddress;
	private readonly _unHashedPassword: UnHashedPassword;

	public constructor(email: EmailAddress, unHashedPassword: UnHashedPassword) {
		this._email = email;
		this._unHashedPassword = unHashedPassword;
	}

	public get email(): EmailAddress {
		return this._email;
	}

	public get unHashedPassword(): UnHashedPassword {
		return this._unHashedPassword;
	}
}
