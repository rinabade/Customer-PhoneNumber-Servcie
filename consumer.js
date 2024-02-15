const amqp = require('amqplib');
const { messageConsume } = require('./controllers/consumerController');

const rabbitmq_url = process.env.AMQP_URL || 'amqp://localhost:5673';

async function consumeMessage() {
  const connection = await amqp.connect(rabbitmq_url);  
  const channel = await connection.createConfirmChannel();
  
  const queue = 'diagnostic-queue';

  process.once("SIGINT", async () => {
    console.log("got sigint, closing connection");
    await channel.close();
    await connection.close();
    process.exit(0);
  });

  await channel.assertQueue(queue, { durable: true });
  
  await channel.consume(
    queue, 
    async (message) => {
      console.log("processing messages");
      await processMessage(message);
      channel.ack(message);
    },
    {
      noAck: false,
      consumerTag: "diagnostic-consumer",
    }
  );
}consumeMessage().catch(console.error);


async function processMessage(message){
  let originalProducerData = JSON.parse(message.content.toString());
  let diagnoServiceResponse = await messageConsume(originalProducerData);
  if(!diagnoServiceResponse){
    return;
  }

}
