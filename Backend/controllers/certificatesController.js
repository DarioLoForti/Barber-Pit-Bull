const { PrismaClient } = require("@prisma/client");
const errorHandler = require("../middlewares/errorHandler.js");
const RestError = require("../utils/restError.js");
const prisma = new PrismaClient();
require("dotenv").config();
const { PORT, HOST } = process.env;
const port = PORT || 3000;

const store = async (req, res) => {
  try {
    const { name, description } = req.body;
    const data = {
      name,
      description,
    };
    if (req.file) {
      data.imageCert = `${HOST}:${port}/imageCert/${req.file.filename}`;
    }

    const certificate = await prisma.certificate.create({
      data,
    });
    res.status(200).send(certificate);
  } catch (err) {
    errorHandler(err, req, res);
  }
};

const index = async (req, res) => {
  try {
    const certificates = await prisma.certificate.findMany();
    res.json({ data: certificates });
  } catch (err) {
    errorHandler(err, req, res);
  }
};

const show = async (req, res) => {
  try {
    const { id } = req.params;
    const certificate = await prisma.certificate.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    if (certificate) {
      res.json(certificate);
    } else {
      throw new RestError(`Certificazione con id ${id} non trovata.`, 404);
    }
  } catch (err) {
    errorHandler(err, req, res);
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;
    const data = {
      name,
      description,
    };
    if (req.file) {
      data.imageCert = `${HOST}:${port}/imageCert/${req.file.filename}`;
    }

    const certificate = await prisma.certificate.update({
      where: { id: parseInt(id) },
      data,
    });
    res.status(200).send(certificate);
  } catch (err) {
    errorHandler(err, req, res);
  }
};

const destroy = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.certificate.delete({
      where: { id: parseInt(id) },
    });
    res.json(`Certificazione con id ${id} eliminata con successo.`);
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
