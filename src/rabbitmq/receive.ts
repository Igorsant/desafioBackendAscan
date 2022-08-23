import { connect, Connection, Channel, Message } from "amqplib/callback_api";
import { createSubscriptionFunction } from "../database/resolvers";

const resolveQueue = (
  name: string,
  channel: Channel,
  resolve: (msg: Message | null) => void
) => {
  channel.assertQueue(name, {
    durable: false,
  });

  console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", name);

  channel.consume(name, resolve, {
    noAck: true,
  });
};

export const receiver = () => {
  connect("amqp://localhost", function (error0: any, connection: Connection) {
    if (error0) {
      throw error0;
    }

    connection.createChannel(function (error1: any, channel: Channel) {
      if (error1) {
        throw error1;
      }
      const subscription_purchased = "SUBSCRIPTION_PURCHASED";
      const subscription_canceled = "SUBSCRIPTION_CANCELED";
      const subscription_restarted = "SUBSCRIPTION_RESTARTED";

      resolveQueue(subscription_purchased, channel, createSubscriptionFunction);
      resolveQueue(subscription_canceled, channel, () => {});
      resolveQueue(subscription_restarted, channel, () => {});
    });
  });
};
