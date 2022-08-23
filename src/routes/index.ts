import { Application } from "express";
import { UsuarioRoutes } from "./route";

const Resolver = (app: Application) => {
  UsuarioRoutes(app);
};

export default Resolver;
