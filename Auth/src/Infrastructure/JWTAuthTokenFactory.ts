import { JwtService } from "@nestjs/jwt";
import { Injectable } from "@nestjs/common";
import { User } from "../Domain/User";
import { AuthTokenFactoryInterface } from "../App/Ports/AuthTokenFactoryInterface";

@Injectable()
export class JWTAuthTokenFactory implements AuthTokenFactoryInterface {
	public constructor(private jwtService: JwtService) {
	}

	public async generateToken(user: User): Promise<string> {
		const payload = { username: user.emailAddress, sub: user.id };
		return this.jwtService.sign(payload);
	}
}
