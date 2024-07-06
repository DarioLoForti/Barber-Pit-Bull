// middlewares/dateParser.js
const moment = require("moment");

module.exports = (req, res, next) => {
  const { datetime } = req.body;

  // Se datetime è presente nel corpo della richiesta e è una stringa, analizzala con moment.js
  if (datetime && typeof datetime === "string") {
    // Analizza la data e ora in formato italiano (dd/MM/yyyy HH:mm)
    const parsedDatetime = moment(datetime, "DD/MM/YYYY HH:mm", true);

    // Verifica se la data è valida secondo il formato specificato
    if (!parsedDatetime.isValid()) {
      return res.status(400).json({
        error:
          "La data e l'ora non sono nel formato corretto (dd/MM/yyyy HH:mm).",
      });
    }

    // Sovrascrivi datetime nel corpo della richiesta con l'oggetto Date
    req.body.datetime = parsedDatetime.toDate();
  }

  // Prosegui con la catena dei middleware
  next();
};
