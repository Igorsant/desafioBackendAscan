import { Message } from "amqplib";
import { knexInstance } from "../knex/knexInstance";
import { createMessage } from "../types";

export const subscriptionPurchasedHandler = (msg: Message | null) => {
  const { userId } = JSON.parse(msg?.content.toString() || "") as createMessage;

  knexInstance
    .insert({
      users_id: userId,
      status_id: 0,
    })
    .into("subscriptions")
    .then((_d) => console.log("saved subscription on database"));
};

export const selectFromSubscriptions = async (id: number) => {
  return await knexInstance("subscriptions").where("id", id);
};
