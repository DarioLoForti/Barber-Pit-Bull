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
const certificateRouter = require("./routers/certificates");

const socketIo = require("socket.io");
const http = require("http");
const server = http.createServer(app);
const io = socketIo(server);

app.use((req, res, next) => {
  req.io = io;
  next();
});

require("dotenv").config();
const { PORT, HOST } = process.env;
const port = PORT || 3000;
app.use(express.static("public"));

app.use(cors());
app.use(express.json());

const chatRoutes = require("./routers/chats.js");
app.use("/chat", chatRoutes);

io.on("connection", (socket) => {
  console.log("Nuovo client connesso");

  socket.on("joinRoom", ({ appointmentId }) => {
    socket.join(appointmentId);
    console.log(`Client unito alla stanza: ${appointmentId}`);
  });

  socket.on("sendMessage", async ({ appointmentId, sender, message }) => {
    const newMessage = await prisma.chatMessage.create({
      data: {
        appointmentId: parseInt(appointmentId),
        sender,
        message,
      },
    });

    io.to(appointmentId).emit("newMessage", newMessage);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnesso");
  });
});

app.use("/users", usersRouter);

app.use("/admin", adminsRouter);

app.use("/services", servicesRouter);

app.use("/reviews", reviewsRouter);

app.use("/appointments", appoinmentsRouter);

app.use("/certificates", certificateRouter);

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on ${HOST}:${port}`);
});
