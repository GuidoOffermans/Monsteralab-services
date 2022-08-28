import { IsEmail } from "class-validator";

import { Validator } from "../../Infrastructure/Validator";

export class EmailAddress {
	@IsEmail()
	private readonly _emailAddress: string;

	public constructor(emailAddress: string) {
		this._emailAddress = emailAddress;

		new Validator().validate(this);
	}

	public get value(): string {
		return this._emailAddress;
	}
}
