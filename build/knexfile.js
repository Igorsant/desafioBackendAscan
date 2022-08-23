"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Update with your config settings.
const config = {
    development: {
        client: "postgresql",
        connection: {
            host: "host.docker.internal",
            database: "postgres",
            user: "postgres",
            password: "admin"
        },
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            tableName: "knex_migrations"
        }
    },
};
exports.default = config;
