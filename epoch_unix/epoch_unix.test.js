

// *** NO FUNCIONA (toDo). ***

// * test para programa epoch_unix.js


// * Para cubrir el 100% de este programa con pruebas en Node.js, podríamos utilizar un marco de pruebas como
// Jest o Mocha. Dado que el programa actual depende de la entrada de usuario mediante readline, debemos 
// adaptar las pruebas para simular esta entrada y verificar cada caso.

// Voy a estructurar las pruebas en tres partes:

// 1. Configuración para pruebas de readline: simularemos las entradas del usuario.
// 2. Pruebas de conversión: para probar tanto la conversión de milisegundos a formato legible como viceversa.
// 3. Pruebas del menú y opciones: para validar el flujo y el comportamiento del menú de opciones.

// * Para ejecutar los test, teclea:
// npx jest epoch_unix.test.js
// npm test epoch_unix.test.js

// * Para coverage, teclea:
// npx jest epoch_unix.test.js --coverage


const { fechaAHumanReadable,
    fechaAMilisegundos,
    mostrarMenu,
    reset,
    goldenYellow,
    bgBlue,
    flashing,
    rl 
} = require('./epoch_unix');

const readline = require('readline');

describe("Test de conversiones de fecha y opciones de menú", () => {
    
    beforeEach(() => {
        jest.spyOn(console, 'log').mockImplementation(() => {}); // Ignorar la salida en consola
        jest.spyOn(console, 'error').mockImplementation(() => {}); 
    });
    
    afterEach(() => {
        console.log.mockRestore(); // Restaurar el console.log después de cada prueba
    });

    describe("Conversión de milisegundos a formato legible", () => {
        it("Debe convertir correctamente un número de milisegundos a una fecha legible", () => {
            const timestamp = 976619532000; // Ejemplo: 2000-12-12 12:12:12
            const expectedDate = new Date(timestamp).toString();
            
            fechaAHumanReadable(timestamp);
            expect(console.log).toHaveBeenCalledWith(expect.stringContaining(expectedDate));
        });

        it("Debe mostrar error si la entrada no es un número válido", () => {
            const timestamp = "noEsUnNumero";
            fechaAHumanReadable(timestamp);
            expect(console.log).toHaveBeenCalledWith(expect.stringContaining("Por favor, introduce un número válido."));
        });
    });

    describe("Conversión de fecha legible a milisegundos", () => {
        it("Debe convertir una fecha legible a milisegundos desde el 01/01/1970", () => {
            const dateString = "2000-12-12 12:12:12";
            const expectedMs = new Date(dateString).getTime();
            
            fechaAMilisegundos(dateString);
            expect(console.log).toHaveBeenCalledWith(expect.stringContaining(expectedMs.toString()));
        });

        it("Debe mostrar error si la fecha no es válida", () => {
            const invalidDate = "fechaNoValida";
            fechaAMilisegundos(invalidDate);
            expect(console.log).toHaveBeenCalledWith(expect.stringContaining("Por favor, introduce una fecha válida."));
        });
    });

    describe("Prueba del menú de opciones", () => {
        it("Debe llamar a fechaAHumanReadable cuando se elige la opción 1", () => {
            const mockInput = jest.spyOn(readline, 'question').mockImplementation((_, callback) => callback('1'));
            
            mostrarMenu();
            expect(fechaAHumanReadable).toHaveBeenCalled();
            mockInput.mockRestore();
        });

        it("Debe llamar a fechaAMilisegundos cuando se elige la opción 2", () => {
            const mockInput = jest.spyOn(readline, 'question').mockImplementation((_, callback) => callback('2'));
            
            mostrarMenu();
            expect(fechaAMilisegundos).toHaveBeenCalled();
            mockInput.mockRestore();
        });

        it("Debe salir cuando se elige la opción 3", () => {
            const mockInput = jest.spyOn(readline, 'question').mockImplementation((_, callback) => callback('3'));
            
            mostrarMenu();
            expect(console.log).toHaveBeenCalledWith("Saliendo...");
            mockInput.mockRestore();
        });

        it("Debe mostrar un error para opciones no válidas", () => {
            const mockInput = jest.spyOn(readline, 'question').mockImplementation((_, callback) => callback('4'));
            
            mostrarMenu();
            expect(console.log).toHaveBeenCalledWith(expect.stringContaining("Opción no válida"));
            mockInput.mockRestore();
        });
    });
});


