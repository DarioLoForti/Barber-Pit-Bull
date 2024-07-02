const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const deleteImage = require("../utils/deleteImage");
const errorHandler = require("../middlewares/errorHandler.js");
const RestError = require("../utils/restError");
require("dotenv").config();
const { PORT, HOST } = process.env;
const port = PORT || 3000;

const store = async (req, res) => {
  const { name, description, price, duration } = req.body;

  const data = {
    name,
    description,
    price: price,
    duration: typeof "string" ? parseInt(duration) : duration,
  };

  if (req.file) {
    data.imageService = `${HOST}:${port}/imageService/${req.file.filename}`;
  }
  console.log(data);
  try {
    const service = await prisma.service.create({
      data,
    });

    res.status(200).send(service);
  } catch (err) {
    if (req.file) {
      deleteImage("imageService", req.file.filename);
    }
    errorHandler(err, req, res);
  }
};

const index = async (req, res) => {
  try {
    const services = await prisma.service.findMany();
    res.json({ data: services });
  } catch (err) {
    if (req.file) {
      deleteImage("imageService", req.file.filename);
    }
    errorHandler(err, req, res);
  }
};

const show = async (req, res) => {
  try {
    const { id } = req.params;
    const service = await prisma.service.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    if (service) {
      res.json(service);
    } else {
      throw new RestError(`Servizio con id ${id} non trovato.`, 404);
    }
  } catch (err) {
    errorHandler(err, req, res);
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, duration } = req.body;

    const data = {
      name,
      description,
      price: parseFloat(price),
      duration,
    };

    if (req.file) {
      data.image = `${HOST}:${port}/imageService/${req.file.filename}`;
    }
    const service = await prisma.service.update({
      where: {
        id: parseInt(id),
      },
      data,
    });
    res.json(service);
  } catch (err) {
    if (req.file) {
      deleteImage("imageService", req.file.filename);
    }
    errorHandler(err, req, res);
  }
};

const destroy = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.service.delete({
      where: {
        id: parseInt(id),
      },
    });
    res.json(`Servizio con id ${id} eliminato con successo.`);
  } catch (err) {
    errorHandler(err, req, res);
  }
};

module.exports = {
  store,
  index,
  show,
  update,
  destroy,
};
