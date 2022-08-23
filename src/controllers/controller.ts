import { Request, Response } from "express";
import { knexInstance } from "../knex/knexInstance";
import { sendMessage } from "../rabbitmq/send";

export const post = (_req: Request, res: Response) => {
  sendMessage("SUBSCRIPTION_PURCHASED", {
    userId: 1,
    statusType: "SUBSCRIPTION_PURCHASED",
  });
  return res.status(201).send("Rota modified!");
};
