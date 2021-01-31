const amqp = require("amqp-connection-manager");

(async () => {
  try {
    const connection = await amqp.connect([
      "amqps://tvczwzvn:6DdYJvdLGyYTZTSE1E0oO7GLzM6AJPcp@orangutan.rmq.cloudamqp.com/tvczwzvn",
    ]);

    const QUEUE = "queue2";

    const channel = await connection.createChannel({
      json: true,
      setup: function (channel) {
        return channel.assertQueue(QUEUE, { durable: true });
      },
    });

    setInterval(async () => {
      await channel.sendToQueue(QUEUE, {
        orderId: "12332522",
        status: "paid out",
        total: 10090,
      });

      console.log(`Message send ${QUEUE}`);
    }, 1000);
  } catch (error) {
    console.error(error);
  }
})();
