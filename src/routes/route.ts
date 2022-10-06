import { Application, NextFunction, Request, Response } from "express";
import { AnyZodObject } from "zod";
import {
  cancelSubscriptionPatch,
  createSubscriptionPost,
  getIdsFromSubscriptions,
  restartSubscriptionPatch,
} from "../controllers/controller";
import { getUsersIds } from "../controllers/usersController";
import { createSchema, updateSchema } from "../schema";

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
  app.post(
    "/createSubscription",
    validate(createSchema),
    createSubscriptionPost
  );

  app.patch(
    "/cancelSubscription",
    validate(updateSchema),
    cancelSubscriptionPatch
  );

  app.patch(
    "/restartSubscription",
    validate(updateSchema),
    restartSubscriptionPatch
  );

  app.get("/subscriptionsIds/:userId", getIdsFromSubscriptions);
  app.get("/usersIds", getUsersIds);
};
