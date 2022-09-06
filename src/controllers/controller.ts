import { Request, Response } from "express";
import { selectFromSubscriptions } from "../database/resolvers";
import { sendMessage } from "../rabbitmq/send";
import {
  SUBSCRIPTION_CANCELED,
  SUBSCRIPTION_PURCHASED,
  SUBSCRIPTION_RESTARTED,
} from "../types";

export const createSubscriptionPost = async (req: Request, res: Response) => {
  const { userId } = req.body;

  sendMessage(SUBSCRIPTION_PURCHASED, {
    userId,
  });

  return res.status(201).send(SUBSCRIPTION_PURCHASED);
};

export const restartSubscriptionPatch = (req: Request, res: Response) => {
  const { userId, subscriptionId } = req.body;

  try {
    selectFromSubscriptions(subscriptionId).then((data) => {
      if (data[0].status === SUBSCRIPTION_RESTARTED) {
        throw new Error("subscription already restarted!");
      }

      if (data[0].status === SUBSCRIPTION_PURCHASED) {
        throw new Error("subscription already active!");
      }

      sendMessage(SUBSCRIPTION_RESTARTED, {
        userId,
        subscriptionId,
      });
    });
  } catch (err) {
    return res.status(403).send(err);
  }

  return res.sendStatus(201);
};

export const cancelSubscriptionPatch = (req: Request, res: Response) => {
  const { userId, subscriptionId } = req.body;

  try {
    selectFromSubscriptions(subscriptionId).then((data) => {
      if (data[0].status === SUBSCRIPTION_CANCELED) {
        throw new Error("subscription already canceled!");
      }

      sendMessage(SUBSCRIPTION_CANCELED, {
        userId,
        subscriptionId,
      });
    });
  } catch (err) {
    return res.status(403).send(err);
  }

  return res.status(201).send(SUBSCRIPTION_CANCELED);
};
