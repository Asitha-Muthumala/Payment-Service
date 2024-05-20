const express = require('express');
const { make_payment, create_db_record } = require('../controller/payment_controller');

const router = express.Router();

router.route("/createDBRecord").post(create_db_record);

module.exports = router;