const amqp = require('amqplib');
require('dotenv').config();

let channel, connection;
const exchange_name = 'diagnostic-exchange';
const exchange_type = 'fanout';
const queue = 'diagnostic-queue';
const routingKey = 'diagnosticKey';

const rabbitmq_url = process.env.AMQP_URL || 'amqp://localhost:5673';

connectQueue();

async function connectQueue() {
    try {

        connection = await amqp.connect(rabbitmq_url);
        channel = await connection.createConfirmChannel();
        
        await channel.assertExchange(exchange_name, exchange_type, {
            durable: true
        });
        await channel.assertQueue(queue, {durable: true});
        await channel.bindQueue(queue, exchange_name, routingKey);

        
    } catch (error) {
        console.log(error)
    }
}

const sendMessageToQueue = async (messages) => {
    try {
        // Ensure that the channel is available
        if (!channel) {
            throw new Error('Channel not available. Please check if RabbitMQ connection is established.');
        }

        // Publish each message in the array
        messages.forEach(async (message) => {
            await channel.publish(
                exchange_name,
                queue, 
                Buffer.from(JSON.stringify(message))
            );
            console.log('Published message:', message);
        });
    } catch (error) {
        console.error('Error publishing messages:', error);
    }
};


module.exports = {sendMessageToQueue};
