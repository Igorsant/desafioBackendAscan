import { Message } from "amqplib";
import { knexInstance } from "../knex/knexInstance";
import { createMessage } from "../types";

export const createSubscriptionFunction = (msg: Message | null) => {
  const message = JSON.parse(msg?.content.toString() || "") as createMessage;

  const timestamp = Date.now();
  const status_id = timestamp % Math.floor(timestamp / 1000);

  const id = Date.now() % Math.floor(timestamp / 1000);
  knexInstance
    .insert({
      id,
      users_id: message.userId,
    })
    .into("subscriptions")
    .then((_d) =>
      knexInstance
        .insert({ id: status_id, status: message.statusType })
        .into("status")
        .then((_d) =>
          knexInstance("subscriptions")
            .update({ status_id })
            .where("id", id)
            .then((data) => console.log("got it!: ", data))
        )
    );
};
