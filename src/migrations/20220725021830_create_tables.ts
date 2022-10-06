import { Knex } from "knex";
import { readFileSync } from "fs";

export async function up(knex: Knex): Promise<void> {
  const sql = readFileSync("../create_tables.sql").toString();
  return knex.raw(sql);
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema
    .dropTableIfExists("event_history")
    .dropTableIfExists("subscriptions")
    .dropTableIfExists("status")
    .dropTableIfExists("users");
}
