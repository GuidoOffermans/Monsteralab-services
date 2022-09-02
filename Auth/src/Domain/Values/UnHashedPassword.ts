import { IsNotEmpty, IsString } from "class-validator";
import { Validator } from "../../Infrastructure/Validator";

export class UnHashedPassword {
	@IsString()
	@IsNotEmpty()
	private readonly unHashedPassword: string;

	public constructor(unHashedPassword: string) {
		this.unHashedPassword = unHashedPassword;
		new Validator().validate(this);
	}

	public get value(): string {
		return this.unHashedPassword;
	}
}
