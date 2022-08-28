import { MigrationInterface, QueryRunner } from "typeorm";

export class addUserTable1661711186160 implements MigrationInterface {
    name = 'addUserTable1661711186160'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`User\` (\`id\` varchar(255) NOT NULL, \`email\` varchar(512) NULL, \`password\` varchar(512) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`User\``);
    }

}
