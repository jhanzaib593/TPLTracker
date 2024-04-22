const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

//env config
dotenv.config();

//route import
const userRouter = require("./router/userRouter");
const trackingDataRouter = require("./router/trackingDataRouter");

//mongodb connect
connectDB();

//rest object

const app = express();

app.use(cors());
app.use(express.json());

//api

// app.get("/", function (req, res) {
//   res.status(200).send({ message: "Node Server" });
// });

app.use("/api", userRouter);
app.use("/api/tracking", trackingDataRouter);

//Port

const PORT = process.env.PORT || 3040;

//listen

app.listen(PORT, () => {
  console.log(`Server Running ${process.env.DEV_MODE} mode on port ${PORT}`);
});
