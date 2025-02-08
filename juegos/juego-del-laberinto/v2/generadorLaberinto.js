// generadorLaberinto.js

function generarLaberinto(filas, columnas) {
    const laberinto = [];

    // Crear una matriz de filas x columnas llena de paredes (1)
    for (let i = 0; i < filas; i++) {
        laberinto[i] = [];
        for (let j = 0; j < columnas; j++) {
            laberinto[i][j] = 1; // Pared
        }
    }

    // Crear caminos aleatorios (0), con una probabilidad mayor de caminos
    for (let i = 1; i < filas - 1; i++) {
        for (let j = 1; j < columnas - 1; j++) {
            if (Math.random() > 0.3) { // Ahora tenemos un 70% de posibilidad de camino
                laberinto[i][j] = 0;
            }
        }
    }

    // Asegurarse de que la entrada y la salida estén libres
    laberinto[1][0] = 0; // Entrada
    laberinto[filas - 2][columnas - 1] = 0; // Salida

    // Garantizar que haya un camino entre la entrada y la salida (conectar entrada y salida)
    let x = 1, y = 0; // Comienza en la entrada
    while (x < filas - 1 && y < columnas - 1) {
        laberinto[x][y] = 0;
        if (Math.random() < 0.5) {
            x++; // Mover hacia abajo
        } else {
            y++; // Mover hacia la derecha
        }
    }

    return laberinto;
}
