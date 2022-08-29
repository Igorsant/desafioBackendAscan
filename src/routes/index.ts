import { Application } from "express";
import { subscriptionRoutes } from "./route";

const Resolver = (app: Application) => {
  subscriptionRoutes(app);
};

export default Resolver;
