const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

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

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server in ascolto sulla porta ${PORT}`);
});
