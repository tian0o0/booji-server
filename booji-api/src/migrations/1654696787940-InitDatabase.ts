// https://orkhan.gitbook.io/typeorm/docs/migrations

import { MigrationInterface, QueryRunner } from "typeorm";

export class InitDatabase1654696787940 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.createDatabase("booji", true);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.dropDatabase("booji", true);
  }
}
