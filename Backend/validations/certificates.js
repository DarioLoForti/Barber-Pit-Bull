const bodyData = {
  name: {
    in: ["body"],
    notEmpty: {
      errorMessage: "Il nome del servizio è obbligatorio.",
      bail: true,
    },
    isString: {
      errorMessage: "Il nome del servizio deve essere una stringa.",
      bail: true,
    },
    isLength: {
      errorMessage:
        "Il nome del servizio deve essere lungo almeno 3 caratteri.",
      options: { min: 3 },
    },
  },
  description: {
    in: ["body"],
    notEmpty: {
      errorMessage: "La descrizione del servizio è obbligatoria.",
      bail: true,
    },
    isString: {
      errorMessage: "La descrizione del servizio deve essere una stringa.",
      bail: true,
    },
    isLength: {
      errorMessage:
        "La descrizione del servizio deve essere lunga almeno 10 caratteri.",
      options: { min: 5 },
    },
  },
};

module.exports = {
  bodyData,
};
