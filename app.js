const express = require("express");
const payment_route = require('./route/payment_route');
const cors = require("cors");
const app = express();


const { PORT } = require('./utils/constant');

app.use(cors());
app.use(express.json());

app.use("/api/payment", payment_route)

// Restrict invalid url's
app.all("*", (req, res, next) => {
    res.json({
        status: false,
        message: "url not found",
    })
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});