import { Request, Response } from "express";
import { selectFromSubscriptions } from "../database/resolvers";
import { sendMessage } from "../rabbitmq/send";

export const post = (req: Request, res: Response) => {
  const { userId, subscriptionId } = req.body;

  try {
    selectFromSubscriptions(subscriptionId).then((data) => {
      if (data.length == 0) {
        sendMessage("SUBSCRIPTION_PURCHASED", {
          userId,
          subscriptionId,
        });
        return;
      }
    });
    return res.status(201).send("Message sent!");
  } catch (err) {
    return res.status(503).send(err);
  }
};
