"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.knexInstance = void 0;
const knexfile_1 = __importDefault(require("../knexfile"));
const knex_1 = require("knex");
exports.knexInstance = (0, knex_1.knex)(knexfile_1.default[process.env.NODE_ENV || 'development']);
