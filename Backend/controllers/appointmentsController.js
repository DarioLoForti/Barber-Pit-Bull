const { PrismaClient } = require("@prisma/client");
const errorHandler = require("../middlewares/errorHandler.js");
const RestError = require("../utils/restError.js");
const prisma = new PrismaClient();
const moment = require("moment");
require("dotenv").config();

const create = async (req, res) => {
  const { datetime, status, services } = req.body;

  const parsedDateTime = moment(datetime, "DD/MM/YYYY HH:mm", true);

  const serviceDurations = await prisma.service.findMany({
    where: { id: { in: services } },
    select: { duration: true },
  });

  const totalDuration = serviceDurations.reduce(
    (total, service) => total + service.duration,
    0
  );

  const endDateTime = parsedDateTime.clone().add(totalDuration, "minutes");

  const conflictingAppointments = await prisma.appointment.findMany({
    where: {
      OR: [
        {
          datetime: {
            lte: endDateTime.toDate(),
          },
          endDateTime: {
            gte: parsedDateTime.toDate(),
          },
        },
      ],
    },
  });

  if (conflictingAppointments.length > 0) {
    return res.status(400).json({ error: "La fascia oraria è già occupata." });
  }

  const data = {
    datetime: parsedDateTime.toDate(),
    endDateTime: endDateTime.toDate(),
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

const update = async (req, res) => {
  const { datetime, status, services } = req.body;
  const id = parseInt(req.params.id);

  const parsedDateTime = moment(datetime, "DD/MM/YYYY HH:mm", true);

  const serviceDurations = await prisma.service.findMany({
    where: { id: { in: services } },
    select: { duration: true },
  });

  const totalDuration = serviceDurations.reduce(
    (total, service) => total + service.duration,
    0
  );

  const endDateTime = parsedDateTime.clone().add(totalDuration, "minutes");

  const conflictingAppointments = await prisma.appointment.findMany({
    where: {
      id: { not: id },
      OR: [
        {
          datetime: {
            lte: endDateTime.toDate(),
          },
          endDateTime: {
            gte: parsedDateTime.toDate(),
          },
        },
      ],
    },
  });

  if (conflictingAppointments.length > 0) {
    return res.status(400).json({ error: "La fascia oraria è già occupata." });
  }

  const data = {
    datetime: parsedDateTime.toDate(),
    endDateTime: endDateTime.toDate(),
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
    const { date, duration } = req.query;

    // Verifica se la data è nel formato corretto (yyyy-MM-dd)
    const parsedDate = moment(date, "YYYY-MM-DD", true).toDate();
    const serviceDuration = parseInt(duration);

    if (!parsedDate || isNaN(serviceDuration)) {
      return res.status(400).json({ error: "Data o durata non validi." });
    }

    const appointments = await prisma.appointment.findMany({
      where: {
        datetime: {
          gte: new Date(parsedDate.setHours(8, 0, 0, 0)),
          lt: new Date(parsedDate.setHours(20, 0, 0, 0)),
        },
      },
    });

    const slots = [];
    const startHour = 8;
    const endHour = 20;

    for (let hour = startHour; hour < endHour; hour++) {
      for (let minute = 0; minute < 60; minute += 15) {
        const slotStart = moment(parsedDate).hour(hour).minute(minute);
        const slotEnd = moment(slotStart).add(serviceDuration, "minutes");

        const isSlotAvailable = !appointments.some((appt) => {
          const apptStart = moment(appt.datetime);
          const apptEnd = moment(appt.endDateTime);
          return (
            slotStart.isBetween(apptStart, apptEnd, null, "[)") ||
            slotEnd.isBetween(apptStart, apptEnd, null, "(]") ||
            apptStart.isBetween(slotStart, slotEnd, null, "[)") ||
            apptEnd.isBetween(slotStart, slotEnd, null, "(]")
          );
        });

        if (isSlotAvailable) {
          slots.push({
            time: slotStart.format("HH:mm"),
            available: true,
          });
        }
      }
    }

    res.json({ slots });
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
