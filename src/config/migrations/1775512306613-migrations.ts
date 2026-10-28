import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1775512306613 implements MigrationInterface {
    name = 'Migrations1775512306613'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_refresh_token_hash"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_user_email"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_user_email"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "email"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "email" citext NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email")`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "hash" DROP NOT NULL`);
        await queryRunner.query(`CREATE INDEX "IDX_204f27bcee2b705b8230beaf41" ON "refresh_token" ("tokenHash") `);
        await queryRunner.query(`CREATE INDEX "IDX_e12875dfb3b1d92d7d7c5377e2" ON "user" ("email") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_e12875dfb3b1d92d7d7c5377e2"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_204f27bcee2b705b8230beaf41"`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "hash" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "email"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "email" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_user_email" UNIQUE ("email")`);
        await queryRunner.query(`CREATE INDEX "IDX_user_email" ON "user" ("email") `);
        await queryRunner.query(`CREATE INDEX "IDX_refresh_token_hash" ON "refresh_token" ("tokenHash") `);
    }

}
