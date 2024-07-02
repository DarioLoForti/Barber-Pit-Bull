const { PrismaClient } = require("@prisma/client");
const errorHandler = require("../middlewares/errorHandler");
const RestError = require("../utils/restError");
const generateToken = require("../utils/generateToken");
const deleteImage = require("../utils/deleteImage");
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

    const user = await prisma.user.create({
      data,
    });

    const token = generateToken({
      email: user.email,
      name: user.name,
    });

    delete user.id;
    delete user.password;

    res.json({ token, data: user });
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

    const user = await prisma.user.findUnique({
      where: { email },
    });

    const eventualeErrore = new RestError(`Email o password errati.`, 400);

    if (!user) {
      throw eventualeErrore;
    }

    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
      throw eventualeErrore;
    }

    const token = generateToken({
      email: user.email,
      name: user.name,
    });

    delete user.id;
    delete user.password;

    res.json({ token, data: user });
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

    const user = await prisma.user.update({
      where: { email },
      data,
    });

    delete user.id;
    delete user.password;

    res.json({ data: user });
  } catch (err) {
    if (req.file) {
      deleteImage("imageUrl", req.file.filename);
    }
    errorHandler(err, req, res);
  }
};

const deleteUser = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await prisma.user.delete({
      where: { email },
    });

    delete user.id;
    delete user.password;

    res.json({ data: user });
  } catch (err) {
    errorHandler(err, req, res);
  }
};

module.exports = {
  register,
  login,
  modify,
  deleteUser,
};
