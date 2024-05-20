const { isEmpty } = require('../utils/object_isEmpty');
const { PAYMENT_MODEL } = require('../validation_model/payment_validations');
const connection = require("../config/dbConnection");

exports.create_db_record = async (req, res) => {

    if (isEmpty(req.body)) {
        return res.json({
            status: false,
            message: "form data not found",
        })
    };

    try {
        const { error } = PAYMENT_MODEL.validate(req.body);
        
        if (error) {
            return res.json({
                status: false,
                message: "validation error",
                error: error.details[0].message
            })
        }

        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth() + 1;
        const day = currentDate.getDate();

        const formattedDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;

        connection.query("INSERT INTO payment VALUES(Null, ?)", [[req.body.user_id, req.body.course_id, req.body.amount, formattedDate, req.body.status]], (err, data, fields) => {
            if (err) {
                return res.json({
                    status: false,
                    message: "internal server error",
                    error: err
                })
            };

            res.json({
                status: true,
                message: "successfully added payment record",
            })
        })


    } catch (err) {
        return res.json({
            status: false,
            message: "internal server error",
            error: err
        })
    }

};
