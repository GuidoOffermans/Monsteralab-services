import { IsEmail, IsString } from "class-validator";

export class CreateUserDto {
	@IsEmail()
	public readonly email: string;

	@IsString()
	public readonly password: string;
}
