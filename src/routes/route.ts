import { Application } from "express";
import { post } from "../controllers/controller";

export const UsuarioRoutes = (app: Application) => {
  app.post("/createSubscription", post);

  app.post("/updateSubscription", () => {});
  app.post("/", () => {});
};
