const readlineSync = require('readline-sync');

function getNumber() {
    return new Promise((resolve, reject) => {
        let number = parseFloat(readlineSync.question("Ingrese un número: "));
        if (number < 0) {
            reject("Sólo se permiten números positivos.");
        } else {
            resolve(number);
        }
    });
}

function calculator() {
    getNumber()
        .then((num1) => {
            return new Promise((resolve, reject) => {
                let operation = readlineSync.question("Ingrese la operación (suma, resta, multiplicar o dividir): ");
                if (operation === "suma" || operation === "resta" || operation === "multiplicar" || operation === "dividir") {
                    resolve({ num1, operation });
                } else {
                    reject("Operación no válida.");
                }
            });
        })
        .then(({ num1, operation }) => {
            return getNumber().then((num2) => {
                return { num1, num2, operation };
            });
        })
        .then(({ num1, num2, operation }) => {
            let result;
            if (operation === "suma") {
                result = num1 + num2;
            } else if (operation === "resta") {
                result = num1 - num2;
            } else if (operation === "multiplicar") {
                result = num1 * num2;
            } else if (operation === "dividir") {
                if (num2 === 0) {
                    throw new Error("No se puede dividir por cero");
                } else {
                    result = num1 / num2;
                }
            }
            console.log("El resultado es: " + result);
        })
        .catch((error) => {
            console.log(error);
        });
}

calculator();
