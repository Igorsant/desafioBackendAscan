"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UsuarioRoute_1 = require("./UsuarioRoute");
const Resolver = (app) => {
    (0, UsuarioRoute_1.UsuarioRoutes)(app);
};
exports.default = Resolver;
