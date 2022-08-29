import { Application, NextFunction, Request, Response } from "express";
import { AnyZodObject } from "zod";
import { post } from "../controllers/controller";
import { createSchema } from "../schema";

const validate =
  (schema: AnyZodObject) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      return next();
    } catch (error) {
      return res.status(400).json(error);
    }
  };

export const subscriptionRoutes = (app: Application) => {
  app.post("/subscription", validate(createSchema), post);
};
