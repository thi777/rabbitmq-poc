const amqp = require("amqplib/callback_api");

amqp.connect(
  "amqps://tvczwzvn:6DdYJvdLGyYTZTSE1E0oO7GLzM6AJPcp@orangutan.rmq.cloudamqp.com/tvczwzvn",
  (connError, connection) => {
    if (connError) {
      throw connError;
    }

    connection.createChannel((channelError, channel) => {
      if (channelError) {
        throw channelError;
      }

      const QUEUE = "queue2";
      channel.assertQueue(QUEUE);

      channel.consume(
        QUEUE,
        (msg) => {
          console.log(`${msg.content.toString()}`);
        },
        {
          noAck: true,
        }
      );
    });
  }
);
