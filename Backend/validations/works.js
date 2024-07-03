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
};

module.exports = {
  bodyData,
};
