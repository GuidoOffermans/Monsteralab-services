import { v4 as uuidv4 } from "uuid";
import { IsUUID } from "class-validator";
import { Validator } from "../../Infrastructure/Validator";

export class UUID {
	@IsUUID()
	private readonly _UUID: string;

	public constructor(uuid?: string) {
		if (!uuid) {
			this._UUID = uuidv4();
			return;
		}
		this._UUID = uuid;
		new Validator().validate(this);
	}

	get value(): string {
		return this._UUID;
	}
}
