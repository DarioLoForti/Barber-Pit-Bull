const { PrismaClient } = require("@prisma/client");
const errorHandler = require("../middlewares/errorHandler.js");
const RestError = require("../utils/restError.js");
const prisma = new PrismaClient();
require("dotenv").config();

const create = async (req, res) => {
  const { date, status, services } = req.body;

  const parsedDate = new Date(date.split("/").reverse().join("-"));

  const data = {
    date: parsedDate,
    status,
    userId: req.user.id,
    services: {
      connect: services.map((id) => ({ id })),
    },
  };

  console.log("Data before create:", data);
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

module.exports = {
  create,
  index,
  show,
  update,
  destroy,
};
