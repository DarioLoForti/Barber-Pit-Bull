const { PrismaClient } = require("@prisma/client");
const errorHandler = require("../middlewares/errorHandler.js");
const RestError = require("../utils/restError.js");
const generateToken = require("../utils/generateToken.js");
const deleteImage = require("../utils/deleteImage.js");
const { hashPassword, comparePassword } = require("../utils/password.js");
const prisma = new PrismaClient();
require("dotenv").config();
const { PORT, HOST } = process.env;
const port = PORT || 3000;

const register = async (req, res, next) => {
  try {
    const { name, surname, phone, email, password } = req.body;

    const data = {
      name,
      surname,
      phone,
      email,
      password: await hashPassword(password),
    };

    if (req.file) {
      data.imageUrl = `${HOST}:${port}/imageUrl/${req.file.filename}`;
    }

    const admin = await prisma.admin.create({
      data,
    });

    const token = generateToken({
      email: admin.email,
      name: admin.name,
      id: admin.id,
    });

    delete admin.id;
    delete admin.password;

    res.json({ token, data: admin });
  } catch (err) {
    if (req.file) {
      deleteImage("imageUrl", req.file.filename);
    }
    errorHandler(err, req, res);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await prisma.admin.findUnique({
      where: { email },
    });

    const eventualeErrore = new RestError(`Email o password errati.`, 400);

    if (!admin) {
      throw eventualeErrore;
    }

    const isPasswordValid = await comparePassword(password, admin.password);
    if (!isPasswordValid) {
      throw eventualeErrore;
    }

    const token = generateToken({
      email: admin.email,
      name: admin.name,
      id: admin.id,
    });

    delete admin.id;
    delete admin.password;

    res.json({ token, data: admin });
  } catch (err) {
    errorHandler(err, req, res);
  }
};

const modify = async (req, res) => {
  try {
    const { name, surname, phone, email, password } = req.body;

    const data = {
      name,
      surname,
      phone,
      email,
      password: await hashPassword(password),
    };

    if (req.file) {
      data.imageUrl = `${HOST}:${port}/imageUrl/${req.file.filename}`;
    }

    const admin = await prisma.admin.update({
      where: { email },
      data,
    });

    delete admin.id;
    delete admin.password;

    res.json({ data: admin });
  } catch (err) {
    if (req.file) {
      deleteImage("imageUrl", req.file.filename);
    }
    errorHandler(err, req, res);
  }
};

const deleteadmin = async (req, res) => {
  try {
    const { email } = req.body;

    const admin = await prisma.admin.delete({
      where: { email },
    });

    delete admin.id;
    delete admin.password;

    res.json({ data: admin });
  } catch (err) {
    errorHandler(err, req, res);
  }
};

const getDailyAppointments = async (req, res) => {
  const { date } = req.query;

  if (!date) {
    return res
      .status(400)
      .json({ error: "La data è richiesta nel formato YYYY-MM-DD." });
  }

  try {
    const startDate = new Date(date);
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + 1);

    const appointments = await prisma.appointment.findMany({
      where: {
        datetime: {
          gte: startDate,
          lt: endDate,
        },
      },
      include: {
        services: true,
        user: {
          select: {
            name: true,
            surname: true,
            email: true,
            phone: true,
          },
        },
      },
    });

    res.status(200).json({ data: appointments });
  } catch (err) {
    errorHandler(err, req, res);
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        surname: true,
        phone: true,
        email: true,
        imageUrl: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    res.status(200).json({ data: users });
  } catch (err) {
    errorHandler(err, req, res);
  }
};
module.exports = {
  register,
  login,
  modify,
  deleteadmin,
  getDailyAppointments,
  getAllUsers,
};
