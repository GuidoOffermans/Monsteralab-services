import { EmailAddress } from "../../Domain/Values/EmailAddress";
import { User } from "../../Domain/User";

export interface UsersDomainRepositoryInterface {
	findOne(email: EmailAddress): Promise<User>;

	save(user: User): void;
}
