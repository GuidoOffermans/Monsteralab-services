import { IsNotEmpty, IsString } from "class-validator";

import { Validator } from "../../Infrastructure/Validator";

export class Password {
	@IsString()
	@IsNotEmpty()
	private readonly password: string;

	public constructor(password: string) {
		this.password = password;
		new Validator().validate(this);
	}

	public get value(): string {
		return this.password;
	}
}
