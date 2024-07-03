const express = require("express");
const app = express();
const cors = require("cors");
const notFound = require("./middlewares/notFound");
const errorHandler = require("./middlewares/errorHandler");
const usersRouter = require("./routers/users");
const servicesRouter = require("./routers/services");
const reviewsRouter = require("./routers/reviews");
const appoinmentsRouter = require("./routers/appointments");
const adminsRouter = require("./routers/admins");

require("dotenv").config();
const { PORT, HOST } = process.env;
const port = PORT || 3000;

app.use(express.static("public"));

app.use(cors());
app.use(express.json());

app.use("/users", usersRouter);

app.use("/admins", adminsRouter);

app.use("/services", servicesRouter);

app.use("/reviews", reviewsRouter);

app.use("/appointments", appoinmentsRouter);

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on ${HOST}:${port}`);
});
