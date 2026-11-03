import { type Kysely } from 'kysely';

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema.alterTable('labels').addColumn('color', 'varchar').execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.alterTable('labels').dropColumn('color').execute();
}
