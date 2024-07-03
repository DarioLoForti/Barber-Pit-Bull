const { PrismaClient } = require("@prisma/client");
const errorHandler = require("../middlewares/errorHandler.js");
const RestError = require("../utils/restError.js");
const prisma = new PrismaClient();
require("dotenv").config();
const { PORT, HOST } = process.env;
const port = PORT || 3000;

const store = async (req, res) => {
  try {
    const { name } = req.body;
    const data = {
      name,
    };
    if (req.file) {
      data.imageWork = `${HOST}:${port}/imageWork/${req.file.filename}`;
    }

    const work = await prisma.work.create({
      data,
    });
    res.status(200).send(work);
  } catch (err) {
    errorHandler(err, req, res);
  }
};

const index = async (req, res) => {
  try {
    const works = await prisma.work.findMany();
    res.json({ data: works });
  } catch (err) {
    errorHandler(err, req, res);
  }
};

const show = async (req, res) => {
  try {
    const { id } = req.params;
    const work = await prisma.work.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    if (work) {
      res.json(work);
    } else {
      throw new RestError(`Lavoro con id ${id} non trovato.`, 404);
    }
  } catch (err) {
    errorHandler(err, req, res);
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const data = {
      name,
    };
    if (req.file) {
      data.imageWork = `${HOST}:${port}/imageWork/${req.file.filename}`;
    }

    const work = await prisma.work.update({
      where: { id: parseInt(id) },
      data,
    });
    res.status(200).send(work);
  } catch (err) {
    errorHandler(err, req, res);
  }
};

const destroy = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.work.delete({
      where: { id: parseInt(id) },
    });
    res.json(`Lavoro con id ${id} eliminato con successo.`);
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
