"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const callback_api_1 = require("amqplib/callback_api");
(0, callback_api_1.connect)('amqp://localhost', function (error0, connection) {
    if (error0) {
        throw error0;
    }
    connection.createChannel(function (error1, channel) {
        if (error1) {
            throw error1;
        }
        var queue = 'hello';
        var msg = 'Hello world';
        channel.assertQueue(queue, {
            durable: false
        });
        channel.assertQueue('sendOne', {
            durable: false
        });
        channel.assertQueue('sendTwo', {
            durable: false
        });
        channel.sendToQueue(queue, Buffer.from(msg));
        console.log(" [x] Sent %s", msg);
        channel.sendToQueue('sendOne', Buffer.from(msg));
        console.log(" [x] Sent %s", msg);
        channel.sendToQueue('sendTwo', Buffer.from(msg));
        console.log(" [x] Sent %s", msg);
    });
    setTimeout(function () {
        connection.close();
        process.exit(0);
    }, 500);
});
