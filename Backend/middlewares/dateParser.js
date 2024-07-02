// middlewares/dateParser.js
const moment = require("moment");

module.exports = (req, res, next) => {
  const { date } = req.body;

  // Se la data è presente nel corpo della richiesta e è una stringa, analizzala con moment.js
  if (date && typeof date === "string") {
    // Analizza la data in formato italiano (dd/MM/yyyy)
    const parsedDate = moment(date, "DD/MM/YYYY", true);

    // Verifica se la data è valida secondo il formato specificato
    if (!parsedDate.isValid()) {
      return res
        .status(400)
        .json({ error: "La data non è nel formato corretto (dd/MM/yyyy)." });
    }

    // Sovrascrivi la data nel corpo della richiesta con l'oggetto Moment
    req.body.date = parsedDate.toDate();
  }

  // Prosegui con la catena dei middleware
  next();
};
