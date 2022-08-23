"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWithId = exports.get = exports.post = void 0;
const knexInstance_1 = require("../knex/knexInstance");
const post = (_req, res) => {
    knexInstance_1.knexInstance.schema.createTable('something', table => {
        table.increments();
        table.string('alo');
    }).then(data => data);
    return res.status(201).send("Rota modified!");
};
exports.post = post;
const get = (req, res) => {
    return res.status(201).send("Rota get!");
};
exports.get = get;
const getWithId = (req, res) => {
    const { id } = req.params;
    return res.status(201).send(`Rota get com id: ${id}`);
};
exports.getWithId = getWithId;
