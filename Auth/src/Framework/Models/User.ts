import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity("User")
export class User {
	@PrimaryColumn("varchar", { nullable: false })
	public id: string;

	@Column({ type: "varchar", nullable: true, length: 512 })
	public email: string;

	@Column({ type: "varchar", nullable: true, length: 512 })
	public password: string;
}
