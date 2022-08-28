import { EmailAddress } from "./Values/EmailAddress";
import { Password } from "./Values/Password";
import { UUID } from "./Values/UUID";

export class User {
	private _id: UUID;
	private _emailAddress: EmailAddress;
	private _password: Password;

	constructor(id: UUID, emailAddress: EmailAddress, password: Password) {
		this._id = id;
		this._emailAddress = emailAddress;
		this._password = password;
	}

	get id(): UUID {
		return this._id;
	}

	set id(value: UUID) {
		this._id = value;
	}

	get emailAddress(): EmailAddress {
		return this._emailAddress;
	}

	set emailAddress(value: EmailAddress) {
		this._emailAddress = value;
	}

	get password(): Password {
		return this._password;
	}

	set password(value: Password) {
		this._password = value;
	}
}
