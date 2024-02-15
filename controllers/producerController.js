const { sendMessageToQueue } = require('../producer');

const messageSendToQueue = async (req, res) => {
    try {
        const message = [req.body];
        
        sendMessageToQueue(message);  
        res.status(200).json({
            statusCode: 200,
            error: false,
            message: "Message Published to the Queue"
        });
    } 
    catch (error) {
        res.status(500).json({ error: `${error.message}` });
    } 
};


module.exports = { messageSendToQueue }