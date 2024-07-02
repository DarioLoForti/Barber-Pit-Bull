// validations/availability.js
const { query } = require("express-validator");

const paramAvailability = [
  query("datetime")
    .isDate({ format: "DD/MM/YYYY HH:mm" })
    .withMessage("La data e l'ora devono essere nel formato DD/MM/YYYY HH:mm")
    .toDate(),
];

module.exports = {
  paramAvailability,
};
