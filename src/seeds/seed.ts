import { readFileSync } from "fs";
import { Knex } from "knex";

export async function seed(knex: Knex) {
  const sql = readFileSync("../users.sql").toString();
  return knex.raw(sql);
}
