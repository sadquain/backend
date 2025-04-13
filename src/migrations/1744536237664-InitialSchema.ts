import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialSchema1744536237664 implements MigrationInterface {
    name = 'InitialSchema1744536237664'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "candidate" ("id" character varying NOT NULL, "name" character varying NOT NULL, "bio" character varying NOT NULL, "embedding" text, CONSTRAINT "PK_b0ddec158a9a60fbc785281581b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "job" ("id" character varying NOT NULL, "embedding" text, CONSTRAINT "PK_98ab1c14ff8d1cf80d18703b92f" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "job"`);
        await queryRunner.query(`DROP TABLE "candidate"`);
    }

}
