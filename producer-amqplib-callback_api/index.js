const amqp = require("amqplib/callback_api");

amqp.connect(
  "amqps://tvczwzvn:6DdYJvdLGyYTZTSE1E0oO7GLzM6AJPcp@orangutan.rmq.cloudamqp.com/tvczwzvn",
  (err, connection) => {
    if (err) {
      throw err;
    }

    connection.createChannel((err, channel) => {
      if (err) {
        throw err;
      }

      const QUEUE = "queue2";
      channel.assertQueue(QUEUE);

      const payload = [
        { orderId: "12332523", status: "paid out", total: 10090 },
      ];

      setInterval(() => {
        channel.sendToQueue(QUEUE, Buffer.from(`${payload}`));

        console.log(`Message send ${QUEUE}`);
      }, 1000);
    });
  }
);
