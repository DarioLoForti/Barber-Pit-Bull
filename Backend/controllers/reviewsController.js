const { PrismaClient } = require("@prisma/client");
const errorHandler = require("../middlewares/errorHandler.js");
const RestError = require("../utils/restError.js");
const prisma = new PrismaClient();
require("dotenv").config();

const store = async (req, res) => {
  const { rating, comment } = req.body;

  const data = {
    rating: typeof rating === "number" ? rating : parseInt(rating),
    comment,
    userId: req.user.id,
    userName: req.user.name,
  };

  try {
    const review = await prisma.review.create({
      data,
    });

    res.status(200).send(review);
  } catch (err) {
    errorHandler(err, req, res);
  }
};

const index = async (req, res) => {
  try {
    const reviews = await prisma.review.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    res.json({
      data: reviews,
    });
  } catch (err) {
    errorHandler(err, req, res);
  }
};

const show = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const review = await prisma.review.findUnique({
      where: { id },
    });
    if (review) {
      res.json(review);
    } else {
      throw new RestError(`recenzione con id ${id} non trovato.`, 404);
    }
  } catch (err) {
    errorHandler(err, req, res);
  }
};

const destroy = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.review.delete({
      where: { id: parseInt(id) },
    });
    res.json(`recenzione con id ${id} eliminato con successo.`);
  } catch (err) {
    errorHandler(err, req, res);
  }
};

module.exports = {
  store,
  index,
  show,
  destroy,
};
