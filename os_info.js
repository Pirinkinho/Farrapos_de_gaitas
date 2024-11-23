
// Programa para analizar CPU

const os = require('os')

const { exec } = require('child_process');

function getSystemInfo() {

console.log("\nInformación del sistema operativo:");
console.log("-------------------")

console.log("\nInterfaces de red:", os.networkInterfaces());
console.log(`\nEstructura de los objetos CPU:

-Cada elemento en la lista CPU's representa un núcleo de CPU y tiene la siguiente estructura:

* model: Cadena que indica el modelo del procesador. En este caso, todos los núcleos son de la
 CPU Intel(R) Core(TM) i7-8750H CPU @ 2.20GHz.

* speed: Número que indica la velocidad actual del núcleo en MHz. Los valores varían, ya que
algunos núcleos están funcionando a su frecuencia base de 800 MHz, mientras que otros están
más altos (ej. 3999 o 4001 MHz). Esto puede depender de la carga en cada núcleo, y el
procesador ajusta la velocidad en función de la demanda (tecnología de "turbo boost" de Intel).

**** times: Un objeto que contiene los tiempos de procesamiento del núcleo en milisegundo
(o en otra unidad de tiempo). Este objeto se desglosa en las siguientes propiedades:

* user: Tiempo empleado en ejecutar código de usuario (no del sistema operativo).

* nice: Tiempo empleado en tareas con "prioridad baja" o "nice", usadas en sistemas UNIX para
procesos en segundo plano o de baja prioridad.

* sys: Tiempo que el núcleo ha pasado ejecutando código del sistema operativo o tareas del sistema.

* idle: Tiempo que el núcleo ha pasado inactivo, sin realizar ninguna tarea.

* irq: Tiempo dedicado a manejar interrupciones de hardware (en este caso, parece estar en 0, 
indicando que no ha habido interrupciones significativas).
`);

console.log("Descripción de cada una de las CPU's:", os.cpus());
const numeroDeElementos = Object.keys(os.cpus()).length;  
console.log("\nNúmero de CPU's:", numeroDeElementos, " (descripción detallada de cada una, arriba)");
console.log("Nombre del sistema operativo:", os.platform());
console.log("Versión del sistema operativo:", os.release());
console.log("Arquitecura:", os.arch());
console.log("Memoria total:", os.totalmem() / 1024 / 1024 / 1024, " Gb");
console.log("Memoria libre:", os.freemem() / 1024 / 1024 / 1024, "Gb");
console.log("Uptime (cuantos días lleva encendido):", os.uptime() / 60 / 60 /24, " dias.");
console.log("Uptime (cuantas horas lleva encendido):", os.uptime() / 60 / 60, " horas.");

console.log("Información del usuario:", os.userInfo());

console.log("Promedio de carga (1, 5 y 15 minutos):", os.loadavg());
console.log("Directorio home del usuario:", os.homedir());
console.log("Directorio temporal del sistema:", os.tmpdir());
console.log("Nombre del host:", os.hostname());
console.log("Prioridad del proceso actual:", os.getPriority());

console.log("\nNombre actual del host:", os.hostname());

exec('hostnamectl', (error, stdout, stderr) => {
  if (error) {
    console.error('\nError ejecutando hostnamectl:', error);
    return;
  }
  console.log('\nSalida de hostnamectl:\n', stdout);
});
}
// Exportamos la función
module.exports = {
  getSystemInfo,
};
 getSystemInfo();
