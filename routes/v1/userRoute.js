const express = require('express');
const router = express.Router();
const {messageSendToQueue} = require('../../controllers/producerController');
const { getCustomerInfo } = require('../../controllers/customerInfoController');
const { limiter } = require('../../middleware/throttlingMiddleware');


router.get('/:phone_number',limiter, getCustomerInfo);

router.post('/', messageSendToQueue);


module.exports = router;
