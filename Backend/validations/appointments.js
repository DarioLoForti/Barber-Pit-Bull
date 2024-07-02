const { body } = require("express-validator");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const moment = require("moment");

const bodyData = {
  date: {
    in: ["body"],
    customSanitizer: {
      options: (value) => {
        // Assuming 'value' is a valid date string
        return moment(value, "DD/MM/YYYY").format("YYYY-MM-DD");
      },
    },
  },
  status: {
    in: ["body"],
    isBoolean: {
      errorMessage: "Lo status deve essere un booleano",
    },
    toBoolean: true,
  },
  status: {
    in: ["body"],
    isBoolean: {
      errorMessage: "Lo status deve essere un booleano",
    },
    toBoolean: true,
  },
  service: {
    in: ["body"],
    isArray: {
      errorMessage: "I servizi devono essere specificati come un array.",
    },
    optional: { options: { nullable: true, checkFalsy: true } }, // Opzionale, gestisce il caso in cui il campo sia vuoto o mancante
    custom: {
      options: async (ids) => {
        if (!ids || !Array.isArray(ids)) {
          throw new Error("I servizi devono essere specificati come un array.");
        }
        const parsedIds = ids.map((id) => parseInt(id));
        if (parsedIds.length === 0) {
          throw new Error("Un Appuntamento deve avere almeno un servizio.");
        }
        const invalidId = parsedIds.find((id) => isNaN(id));
        if (invalidId) {
          throw new Error("Uno o più ID non sono dei numeri interi.");
        }
        const services = await prisma.service.findMany({
          where: { id: { in: parsedIds } },
        });
        if (services.length !== parsedIds.length) {
          throw new Error("Uno o più servizi specificati non esistono.");
        }
        return true;
      },
    },
    customSanitizer: {
      options: (ids) => ids.map((id) => ({ id: parseInt(id) })),
    },
  },
};

module.exports = bodyData;
