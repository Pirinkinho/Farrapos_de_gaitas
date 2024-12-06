
// * Koldo Sanmartín - Lunes 02/12/2022.

// * Este código sirve para convertir la hora informática de milisegundos a formato humano,
// y viceversa, de formato humano a milisegundos, a través de un menú de opciones.

// Recordar que es el tiempo transcurrido (en ms) desde 01/01/1970 ("Unix Epoch").
// Rango máximo: 8,640,000,000,000,000 milisegundos (aproximadamente el 13 de septiembre del año 275,760 a las 00:00:00 UTC).
// Rango mínimo: -8,640,000,000,000,000 milisegundos (aproximadamente el 13 de abril del año -271,821 a las 00:00:00 UTC).


// * Divido el programa en dos partes:
// 1. Colores ANSI, para dar estilos y colores en la terminal de Ubuntu.
// 2. El programa ed sí.


// * 1. Colores ANSI:

// En los códigos ANSI, puedes combinar colores y estilos especificando 
// múltiples códigos en secuencia, separándolos con ; o concatenándolos 
// en la misma cadena. El orden suele ser:

// 1. Estilos (como negrita o subrayado)
// 2. Colores de texto
// 3. Colores de fondo

// Para asegurar que todo funcione correctamente, cada estilo o color
// necesita estar precedido por \x1b[ y terminado con m. Al final,
// se utiliza \x1b[0m para resetear los estilos y colores a los 
// valores predeterminados.

// Reinicia los colores:
const reset = "\x1b[0m"; 

// Colores de texto:
// const brown = "\x1b[38;5;94m"; // Marrón
// const red = "\x1b[31m"; // Rojo
// const green = "\x1b[32m"; // Verde
// const yellow = "\x1b[33m"; // Amarillo claro
const goldenYellow = "\x1b[38;5;220m"; // Amarillo dorado

// Colores de fondo:
const bgBlue = "\x1b[44m";
// const bgMagenta = "\x1b[45m";

// Otros estilos:
// const bold = "\x1b[1m"; // Negrita
// const underline = "\x1b[4m"; // Subrayado
const flashing = "\x1b[5m"; // Parpadeante
// const boldRed = "\x1b[1m\x1b[31m"; // Negrita y color rojo en el texto
// const underlineBlue = "\x1b[4m\x1b[34m"; // Subrayado y color azul
// const yellowOnMagenta = "\x1b[33m\x1b[45m"; // Texto en amarillo con fondo magenta
// const boldUnderlineGreenOnCyan = "\x1b[1m\x1b[4m\x1b[32m\x1b[46m"; // Negrita, subrayado y texto en verde con fondo cian

// * Ejemplos de impresión en la terminal:
// console.log(`${red}Texto en rojo${reset}`);
// console.log(`${brown}Texto en marrón${reset}`);
// console.log(`${green}Texto en verde${reset}`);
// console.log(`${yellow}Texto en amarillo${reset}`);
// console.log(`${bgBlue}${yellow}Texto amarillo con fondo azul${reset}`);
// console.log(`${bgMagenta}${green}Texto verde con fondo magenta${reset}`);
// console.log(`${bold}Texto en negrita${reset}`);
// console.log(`${underline}Texto subrayado${reset}`);
// console.log(`${boldRed}Texto en rojo y negrita${reset}`);
// console.log(`${underlineBlue}Texto en azul subrayado${reset}`);
// console.log(`${yellowOnMagenta}Texto en amarillo con fondo magenta${reset}`);
// console.log(`${boldUnderlineGreenOnCyan}Texto verde en negrita, subrayado, con fondo cian${reset}`);
// console.log(`${boldRed}Texto en rojo y negrita${reset}`);
// console.log(`${underlineBlue}Texto en azul subrayado${reset}`);
// console.log(`${yellowOnMagenta}Texto en amarillo con fondo magenta${reset}`);
// console.log(`${boldUnderlineGreenOnCyan}Texto verde en negrita, subrayado, con fondo cian${reset}`);


// * 2. Comienza el programa:

// Esta línea importa el módulo readline, que es una biblioteca incorporada en Node.js 
// y permite leer entradas de texto en la terminal, línea por línea.
const readline = require('readline');

// Aquí se crea una interfaz de entrada/salida utilizando readline.createInterface().
// input: process.stdin indica que la entrada proviene del teclado, es decir, la entrada estándar (stdin).
// output: process.stdout indica que la salida va a la terminal (stdout).
// Esta interfaz (rl) se usará para interactuar con el usuario.
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Esta función sirve para convertir la hora informática("Unix Epoch") de milisegundos a formato humano.
function fechaAHumanReadable() {

    // rl.question() muestra una pregunta en la terminal y espera una respuesta.
    // "Introduce la marca de tiempo en milisegundos: " es el mensaje que se muestra al usuario.
    // (inputMs) => { ... } es una función de callback que se ejecuta cuando el usuario introduce
    // un valor y presiona Enter. El valor introducido se almacena en inputMs.
    rl.question("\nIntroduce la marca de tiempo en milisegundos: ", (inputMs) => {

        // Convierte el valor introducido por el usuario (inputMs, que es una cadena de texto) a un número
        // utilizando Number(). Este valor se guarda en timestampMs.
        const timestampMs = Number(inputMs);

        // Aquí se verifica si timestampMs es un número válido.
        // isNaN(timestampMs) devuelve true si timestampMs no es un número (NaN).
        // El operador ! lo niega, haciendo que la condición sea true solo cuando timestampMs es un número válido.
        if (!isNaN(timestampMs)) {

            // Si timestampMs es un número válido, se crea un objeto de fecha (Date) usando timestampMs como marca de tiempo en milisegundos.
            // Luego, dateTime.toString() convierte el objeto de fecha a una cadena legible, que se imprime en la terminal.
            const dateTime = new Date(timestampMs);
            console.log(`\n${bgBlue}${goldenYellow}Fecha y hora: ${dateTime.toString()} (Madrid)${reset}`);
        
        // Si el valor introducido no es un número válido (NaN), muestra un mensaje de error indicando que el usuario debe introducir un número válido.
        } else {
            console.log(`\n${flashing}Por favor, introduce un número válido.${reset}`);
        }
        
        mostrarMenu();
    });
}

// Esta función sirve para convertir la hora informática("Unix Epoch") de formato humano a milisegundos.
function fechaAMilisegundos() {

    // rl.question() muestra una pregunta en la terminal y espera una respuesta.
    // "Introduce la fecha en formato YYYY-MM-DD HH:MM:SS: " es el mensaje que se muestra al usuario.
    // (inputDate) => { ... } es una función de callback que se ejecuta cuando el usuario introduce
    // un valor y presiona Enter. El valor introducido se almacena en inputMs.
    rl.question("\nIntroduce la fecha en formato YYYY-MM-DD HH:MM:SS = ", (inputDate) => {

        // Convierte la cadena de texto inputDate en un objeto de tipo Date en JavaScript,
        // que representa una fecha y hora específicas.
        const date = new Date(inputDate);

        // Aquí se verifica si date es un número válido.
        // isNaN(date) devuelve true si date no es un número (NaN).
        // El operador ! lo niega, haciendo que la condición sea true solo cuando date es un número válido.
        if (!isNaN(date)) {

            // Obtiene el número de milisegundos transcurridos desde el 1 de enero de 1970 a las 00:00:00 UTC 
            // hasta la fecha y hora representada por el objeto date, luego la muestra en pantalla.
            const msSinceEpoch = date.getTime();
            console.log(`\n${bgBlue}${goldenYellow}Milisegundos transcurridos desde el 01/01/1970: ${msSinceEpoch}${reset}`);

        // Si el valor introducido no es un número válido (NaN), muestra un mensaje de error indicando que el usuario debe introducir un número válido.
        } else {
            console.log(`\n${flashing}Por favor, introduce una fecha válida.${reset}`);
        }
        
        mostrarMenu();
    });
}

// Esta función es para mostrar el menú principal.
function mostrarMenu() {
    console.log("\nSeleccione una opción:");
    console.log("\n1. Convertir fecha de milisegundos a formato legible");
    console.log("\n2. Convertir fecha de formato legible a milisegundos");
    console.log("\n3. Salir");

    rl.question("\nEscriba el número de la opción elegida: ", (opcion) => {
        switch(opcion) {
            case '1':
                fechaAHumanReadable();
                break;
            case '2':
                fechaAMilisegundos();
                break;
            case '3':
                console.log("\nSaliendo...");

                // Cierra la interfaz de readline, finalizando la sesión de entrada/salida en la terminal.
                rl.close();
                break;
            default:
                console.log(`\n${flashing}Opción no válida. Intente de nuevo.${reset}`);
                mostrarMenu();
        }
    });
}

// Iniciar el programa mostrando el menú
mostrarMenu();

module.exports = {
    fechaAHumanReadable,
    fechaAMilisegundos,
    mostrarMenu,
    reset,
    goldenYellow,
    bgBlue,
    flashing,
    rl
};

