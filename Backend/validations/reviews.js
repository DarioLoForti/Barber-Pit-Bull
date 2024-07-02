const bodyData = {
  rating: {
    in: ["body"],
    notEmpty: {
      errorMessage: "Il rating è obbligatorio.",
      bail: true,
    },
    isInt: {
      errorMessage: "Il rating deve essere un numero intero.",
    },
    toInt: true,
    isLength: {
      errorMessage: "Il rating deve essere compreso tra 1 e 5.",
      options: { min: 1, max: 5 },
    },
  },
  comment: {
    in: ["body"],
    notEmpty: {
      errorMessage: "Il commento è obbligatorio.",
      bail: true,
    },
    isString: {
      errorMessage: "Il commento deve essere una stringa.",
      bail: true,
    },
  },
};

module.exports = {
  bodyData,
};
