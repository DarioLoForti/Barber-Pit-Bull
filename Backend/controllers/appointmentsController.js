const { PrismaClient } = require("@prisma/client");
const errorHandler = require("../middlewares/errorHandler.js");
const RestError = require("../utils/restError.js");
const prisma = new PrismaClient();
const moment = require("moment");
require("dotenv").config();

const create = async (req, res) => {
  const { datetime, status, services } = req.body;

  const parsedDateTime = moment(datetime, "DD/MM/YYYY HH:mm", true);

  const data = {
    datetime: parsedDateTime.toDate(),
    status,
    userId: req.user.id,
    services: {
      connect: services.map((id) => ({ id })),
    },
  };

  try {
    const appointment = await prisma.appointment.create({
      data,
      include: { services: true, user: true },
    });

    res.status(200).send(appointment);
  } catch (err) {
    errorHandler(err, req, res);
  }
};

const index = async (req, res) => {
  try {
    const appointments = await prisma.appointment.findMany({
      where: { userId: req.user.id },
      orderBy: { createdAt: "desc" },
      include: { services: true, user: true },
    });

    res.json({ data: appointments });
  } catch (err) {
    errorHandler(err, req, res);
  }
};

const show = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const appointment = await prisma.appointment.findUnique({
      where: { id },
      include: { services: true, user: true },
    });
    if (appointment) {
      res.json(appointment);
    } else {
      throw new RestError(`Appuntamento con id ${id} non trovato.`, 404);
    }
  } catch (err) {
    errorHandler(err, req, res);
  }
};

const update = async (req, res) => {
  const { date, status, services } = req.body;
  const id = parseInt(req.params.id);

  const data = {
    date: new Date(date),
    status,
    services: {
      set: services.map((id) => ({ id })),
    },
  };

  try {
    const appointment = await prisma.appointment.update({
      where: { id },
      data,
      include: { services: true, user: true },
    });

    res.status(200).send(appointment);
  } catch (err) {
    errorHandler(err, req, res);
  }
};

const destroy = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.appointment.delete({
      where: { id: parseInt(id) },
    });
    res.json(`Appuntamento con id ${id} eliminato con successo.`);
  } catch (err) {
    errorHandler(err, req, res);
  }
};

const getAvailability = async (req, res) => {
  try {
    const { datetime } = req.query;

    // Verifica se la data è nel formato corretto (dd/MM/yyyy)
    const parsedDatetime = moment(datetime, "YYYY-MM-DD").toDate();
    // if (!parsedDateTime.isValid()) {
    //   return res
    //     .status(400)
    //     .json({ error: "La data non è nel formato corretto (dd/MM/yyyy)." });
    // }

    const appointments = await prisma.appointment.findMany({
      where: {
        datetime: {
          gte: new Date(parsedDatetime.setHours(9, 0, 0, 0)),
          lt: new Date(parsedDatetime.setHours(20, 0, 0, 0)),
        },
      },
    });

    // Costruisci gli slot disponibili
    const slots = [];
    const startHour = 9;
    const endHour = 20;

    // Crea gli slot per ogni ora lavorativa
    for (let hour = startHour; hour <= endHour; hour++) {
      slots.push({
        time: `${hour}:00`,
        available: true,
      });
    }

    // Imposta come non disponibili gli slot già prenotati
    appointments.forEach((appointment) => {
      const appointmentHour = new Date(appointment.datetime).getHours();
      const slotIndex = slots.findIndex(
        (slot) => parseInt(slot.time) === appointmentHour
      );
      if (slotIndex !== -1) {
        slots[slotIndex].available = false;
      }
    });

    res.json({
      datetime: moment(parsedDatetime).format("DD/MM/YYYY"),
      slots,
      slots,
    });
  } catch (err) {
    console.error("Errore nella ricerca della disponibilità:", err);
    res.status(500).json({
      error:
        "Si è verificato un errore durante la ricerca della disponibilità.",
    });
  }
};

module.exports = {
  create,
  index,
  show,
  update,
  destroy,
  getAvailability,
};
