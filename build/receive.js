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
        channel.assertQueue(queue, {
            durable: false
        });
        channel.assertQueue('sendOne', {
            durable: false
        });
        channel.assertQueue('sendTwo', {
            durable: false
        });
        console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);
        channel.consume(queue, (msg) => {
            console.log(" [x] Received %s", msg === null || msg === void 0 ? void 0 : msg.content.toString());
        }, {
            noAck: true
        });
        console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", 'sendOne');
        channel.consume('sendOne', (msg) => {
            console.log(' [x] Received %s', msg === null || msg === void 0 ? void 0 : msg.content.toString());
        }, {
            noAck: true
        });
        console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", 'sendTwo');
        channel.consume('sendTwo', (msg) => {
            console.log(' [x] Received %s', msg === null || msg === void 0 ? void 0 : msg.content.toString());
        }, {
            noAck: true
        });
    });
});
