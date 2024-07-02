const express = require("express");
const app = express();
const cors = require("cors");
const notFound = require("./middlewares/notFound");
const errorHandler = require("./middlewares/errorHandler");
const authRouter = require("./routers/auth");
const servicesRouter = require("./routers/services");
const reviewsRouter = require("./routers/reviews");

require("dotenv").config();
const { PORT, HOST } = process.env;
const port = PORT || 3000;

app.use(express.static("public"));

app.use(cors());
app.use(express.json());

app.use("/auth", authRouter);

app.use("/services", servicesRouter);

app.use("/reviews", reviewsRouter);

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on ${HOST}:${port}`);
});
