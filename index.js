const express = require('express');
const userRoute = require('./routes/v1/userRoute');
const { logger } = require('./helper/logger');
const { loggerMiddleware } = require('./middleware/loggerMiddleware');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(loggerMiddleware);

app.use('/v1/RunDiagnostic', userRoute);

app.get("/", (req,res)=>{
    try {
        return res.send("Welcome to Diagnostic User Service App");
    } catch (error) {
        res.status(404).json({ error: `Bad Request` , message : `Something went wrong. Try Again.......`})
    }
});


app.listen(process.env.APP_PORT, () => {
  logger("info",`Server is running at port ${process.env.APP_PORT}`);
})
.on("error", function (err) {
  logger("error", `${err.message}`);
});

