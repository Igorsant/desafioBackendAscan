import config from "../knexfile";
import { knex } from "knex";

export const knexInstance = knex(config[process.env.NODE_ENV || "development"]);
