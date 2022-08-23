"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuarioRoutes = void 0;
const UsuarioController_1 = require("../controllers/UsuarioController");
const UsuarioRoutes = (app) => {
    app.post('/usuario', UsuarioController_1.post);
    app.get('/usuario', UsuarioController_1.get);
    app.get('/usuario/:id', UsuarioController_1.getWithId);
};
exports.UsuarioRoutes = UsuarioRoutes;
