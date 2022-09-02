import { EmailAddress } from "../../Domain/Values/EmailAddress";
import { User } from "../../Domain/User";
import { UUID } from "../../Domain/Values/UUID";

export interface UsersDomainRepositoryInterface {
	findOne(email: EmailAddress): Promise<User>;

	findById(id: UUID): Promise<User>;

	save(user: User): void;
}
