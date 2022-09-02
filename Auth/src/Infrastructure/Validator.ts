import { Validator as ClassValidator, ValidatorOptions } from "class-validator";
import { InvalidValueError } from "../Domain/Errors/InvalidValueError";

export class Validator {
	public validate(subject: object, options?: ValidatorOptions) {
		const errors = new ClassValidator().validateSync(subject, options);
		if (errors.length) {
			throw new InvalidValueError(errors.toString());
		}
	}
}
