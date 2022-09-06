import { connect, Connection, Channel } from "amqplib/callback_api";
import { createMessage } from "../types";

export const sendMessage = (queue: string, msg: createMessage) => {
  connect("amqp://localhost", function (error0: any, connection: Connection) {
    if (error0) {
      throw error0;
    }

    connection.createChannel(function (error1: any, channel: Channel) {
      if (error1) {
        throw error1;
      }
      channel.sendToQueue(queue, Buffer.from(JSON.stringify(msg)));
      console.log(" [x] Sent %s", msg);
    });
    setTimeout(function () {
      connection.close();
    }, 500);
  });
};
