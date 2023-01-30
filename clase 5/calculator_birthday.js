let calculateAge = function() {
  let today = moment();
  let birthdate = moment("2003-03-30");

  if (birthdate.isValid()) {
    let dias = today.diff(birthdate, 'days');
    console.log(`Han pasado ${dias} días desde tu nacimiento hasta hoy.`);
    return `Han pasado ${dias} días desde tu nacimiento hasta hoy.`;
  } else {
    console.log("La fecha de nacimiento es inválida.");
    return "La fecha de nacimiento es inválida.";
  }
};

calculateAge();
