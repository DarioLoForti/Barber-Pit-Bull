const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const registerBody = {
  name: {
    in: ["body"],
    isString: {
      errorMessage: "Name deve essere una stringa.",
      bail: true,
    },
    isLength: {
      errorMessage: "Name deve essere di almeno 3 caratteri",
      options: { min: 3 },
    },
  },
  surname: {
    in: ["body"],
    isString: {
      errorMessage: "Surname deve essere una stringa.",
      bail: true,
    },
    isLength: {
      errorMessage: "Surname deve essere di almeno 3 caratteri",
      options: { min: 3 },
    },
  },
  phone: {
    in: ["body"],
    isString: {
      errorMessage: "Phone deve essere una stringa.",
      bail: true,
    },
    isLength: {
      errorMessage: "Phone deve essere di almeno 10 caratteri",
      options: { min: 10 },
    },
  },
  email: {
    in: ["body"],
    notEmpty: {
      errorMessage: "Email è un campo obbligatorio.",
      bail: true,
    },
    isEmail: {
      errorMessage: "Email deve essere una mail valida",
      bail: true,
    },
    custom: {
      options: async (value) => {
        const admin = await prisma.admin.findUnique({
          where: { email: value },
        });
        if (admin) {
          throw new Error(`admin associato a questa email già presente.`);
        }
        return true;
      },
    },
  },

  password: {
    in: ["body"],
    notEmpty: {
      errorMessage: "Password è un campo obbligatorio.",
      bail: true,
    },
    isString: {
      errorMessage: "Password deve essere una stringa.",
      bail: true,
    },
    isLength: {
      errorMessage: "Password deve essere di almeno 8 caratteri",
      options: { min: 8 },
    },
  },
};

const modifyBody = {
  name: {
    in: ["body"],
    isString: {
      errorMessage: "Name deve essere una stringa.",
      bail: true,
    },
    isLength: {
      errorMessage: "Name deve essere di almeno 3 caratteri",
      options: { min: 3 },
    },
  },
  surname: {
    in: ["body"],
    isString: {
      errorMessage: "Surname deve essere una stringa.",
      bail: true,
    },
    isLength: {
      errorMessage: "Surname deve essere di almeno 3 caratteri",
      options: { min: 3 },
    },
  },
  phone: {
    in: ["body"],
    isString: {
      errorMessage: "Phone deve essere una stringa.",
      bail: true,
    },
    isLength: {
      errorMessage: "Phone deve essere di almeno 10 caratteri",
      options: { min: 10 },
    },
  },
  email: {
    in: ["body"],
    notEmpty: {
      errorMessage: "Email è un campo obbligatorio.",
      bail: true,
    },
    isEmail: {
      errorMessage: "Email deve essere una mail valida",
      bail: true,
    },
    custom: {
      options: async (value) => {
        const admin = await prisma.admin.findUnique({
          where: { email: value },
        });
        if (admin) {
          throw new Error(`admin associato a questa email già presente.`);
        }
        return true;
      },
    },
  },
  password: {
    in: ["body"],
    notEmpty: {
      errorMessage: "Password è un campo obbligatorio.",
      bail: true,
    },
    isString: {
      errorMessage: "Password deve essere una stringa.",
      bail: true,
    },
    isLength: {
      errorMessage: "Password deve essere di almeno 8 caratteri",
      options: { min: 8 },
    },
  },
};

const loginBody = {
  email: {
    in: ["body"],
    notEmpty: {
      errorMessage: "Email è un campo obbligatorio.",
      bail: true,
    },
    isEmail: {
      errorMessage: "Email deve essere una mail valida",
    },
  },
  password: {
    in: ["body"],
    notEmpty: {
      errorMessage: "Password è un campo obbligatorio.",
      bail: true,
    },
    isString: {
      errorMessage: "Password deve essere una stringa.",
    },
  },
};

module.exports = {
  registerBody,
  loginBody,
  modifyBody,
};
