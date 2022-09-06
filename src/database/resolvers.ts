import { Message } from "amqplib";
import { knexInstance } from "../knex/knexInstance";
import {
  createMessage,
  SUBSCRIPTION_CANCELED,
  SUBSCRIPTION_PURCHASED,
  SUBSCRIPTION_RESTARTED,
} from "../types";

export const subscriptionPurchasedHandler = (msg: Message | null) => {
  const { userId } = JSON.parse(msg?.content.toString() || "") as createMessage;

  knexInstance
    .transaction((trx) => {
      knexInstance
        .insert(
          {
            users_id: userId,
            status_id: 0,
          },
          "id"
        )
        .into("subscriptions")
        .transacting(trx)
        .then((ids) =>
          knexInstance
            .insert({
              type: SUBSCRIPTION_PURCHASED,
              subscriptions_id: ids[0].id,
            })
            .into("event_history")
            .transacting(trx)
        )
        .then(trx.commit)
        .catch(trx.rollback);
    })
    .then((_unknown) => console.log("inserted event and subscription"))
    .catch((err) => console.error(err));
};

export const selectFromSubscriptions = (id: number) => {
  return knexInstance("subscriptions")
    .select("status")
    .join("status", "status.id", "=", "subscriptions.status_id")
    .where("subscriptions.id", id);
};

export const subscriptionCanceledHandler = (msg: Message | null) => {
  const { subscriptionId } = JSON.parse(
    msg?.content.toString() || ""
  ) as createMessage;

  knexInstance("subscriptions")
    .where("id", subscriptionId)
    .update({ status_id: 1 })
    .then((_d) =>
      knexInstance("event_history")
        .insert({
          type: SUBSCRIPTION_CANCELED,
          subscriptions_id: subscriptionId,
        })
        .then((_id) => console.log("updated subscription to database"))
    );
};

export const subscriptionRestartedHandler = (msg: Message | null) => {
  const { subscriptionId } = JSON.parse(
    msg?.content.toString() || ""
  ) as createMessage;

  knexInstance("subscriptions")
    .where("id", subscriptionId)
    .update({ status_id: 2 })
    .then((_d) =>
      knexInstance("event_history")
        .insert({
          type: SUBSCRIPTION_RESTARTED,
          subscriptions_id: subscriptionId,
        })
        .then((_id) => console.log("updated subscription to database"))
    );
};
