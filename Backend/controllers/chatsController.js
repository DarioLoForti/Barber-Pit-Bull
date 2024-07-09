const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getMessages = async (req, res) => {
  try {
    const { appointmentId } = req.params;
    const messages = await prisma.chatMessage.findMany({
      where: { appointmentId: parseInt(appointmentId) },
      orderBy: { createdAt: "asc" },
    });
    res.json(messages);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Errore nella ricerca dei messaggi." });
  }
};

const sendMessage = async (req, res) => {
  try {
    const { appointmentId, sender, message } = req.body;

    if (!appointmentId || !sender || !message) {
      return res.status(400).json({ error: "Tutti i campi sono obbligatori." });
    }

    // Verifica se l'appuntamento con l'ID specificato esiste nel database
    const existingAppointment = await prisma.appointment.findUnique({
      where: { id: parseInt(appointmentId) },
    });

    if (!existingAppointment) {
      return res.status(404).json({ error: "Appuntamento non trovato." });
    }

    // Crea il nuovo messaggio utilizzando Prisma
    const newMessage = await prisma.chatMessage.create({
      data: {
        appointmentId: parseInt(appointmentId),
        sender,
        message,
      },
    });

    // Emetti il nuovo messaggio tramite socket.io
    req.io.to(appointmentId.toString()).emit("newMessage", newMessage);

    res.json(newMessage);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Errore nell'invio del messaggio." });
  }
};

module.exports = {
  getMessages,
  sendMessage,
};
