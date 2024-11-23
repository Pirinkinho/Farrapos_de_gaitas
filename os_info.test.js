const os = require('os');
const { exec } = require('child_process');
const { getSystemInfo } = require('./os_info');  // Importamos la función

// Mock de los módulos os y exec
jest.mock('os');
jest.mock('child_process', () => ({
  exec: jest.fn(),
}));

describe('Tests para la información del sistema operativo', () => {

  it('Debería devolver información de las interfaces de red', () => {
    const fakeNetworkInterfaces = {
      eth0: [{ address: '192.168.1.1', netmask: '255.255.255.0', family: 'IPv4', mac: '00:00:00:00:00:00' }],
    };
    os.networkInterfaces.mockReturnValue(fakeNetworkInterfaces);

    console.log = jest.fn(); // Mock de console.log

    // Llamamos a la función exportada desde os_infi.js
    getSystemInfo();

    expect(console.log).toHaveBeenCalledWith("\nInterfaces de red:", fakeNetworkInterfaces);
  });

  it('Debería devolver las CPU y su descripción', () => {
    const fakeCpuInfo = [
      {
        model: 'Intel(R) Core(TM) i7-8750H CPU @ 2.20GHz',
        speed: 2200,
        times: { user: 100, nice: 20, sys: 50, idle: 500, irq: 0 },
      },
    ];
    os.cpus.mockReturnValue(fakeCpuInfo);

    console.log = jest.fn();

    getSystemInfo();

    expect(console.log).toHaveBeenCalledWith("Descripción de cada una de las CPU's:", fakeCpuInfo);
  });

  it('Debería devolver la cantidad de CPUs', () => {
    const fakeCpuInfo = [
      {
        model: 'Intel(R) Core(TM) i7-8750H CPU @ 2.20GHz',
        speed: 2200,
        times: { user: 100, nice: 20, sys: 50, idle: 500, irq: 0 },
      },
      {
        model: 'Intel(R) Core(TM) i7-8750H CPU @ 2.20GHz',
        speed: 2200,
        times: { user: 100, nice: 20, sys: 50, idle: 500, irq: 0 },
      },
    ];
    os.cpus.mockReturnValue(fakeCpuInfo);

    console.log = jest.fn();

    getSystemInfo();

    expect(console.log).toHaveBeenCalledWith("\nNúmero de CPU's:", 2, " (descripción detallada de cada una, arriba)");
  });

  it('Debería devolver información del sistema operativo y la arquitectura', () => {
    os.platform.mockReturnValue('linux');
    os.release.mockReturnValue('5.4.0-91-generic');
    os.arch.mockReturnValue('x64');

    console.log = jest.fn();

    getSystemInfo();

    expect(console.log).toHaveBeenCalledWith("Nombre del sistema operativo:", 'linux');
    expect(console.log).toHaveBeenCalledWith("Versión del sistema operativo:", '5.4.0-91-generic');
    expect(console.log).toHaveBeenCalledWith("Arquitecura:", 'x64');
  });

  it('Debería devolver la memoria total y libre', () => {
    os.totalmem.mockReturnValue(8589934592); // 8GB
    os.freemem.mockReturnValue(4294967296);  // 4GB

    console.log = jest.fn();

    getSystemInfo();

    expect(console.log).toHaveBeenCalledWith("Memoria total:", 8, " Gb");
    expect(console.log).toHaveBeenCalledWith("Memoria libre:", 4, "Gb");
  });

  it('Debería devolver el uptime del sistema', () => {
    os.uptime.mockReturnValue(3600); // 1 hora en segundos

    console.log = jest.fn();

    getSystemInfo();

    expect(console.log).toHaveBeenCalledWith("Uptime (cuantas horas lleva encendido):", 1, " horas.");
  });

  it('Debería ejecutar correctamente el comando hostnamectl', () => {
    exec.mockImplementation((command, callback) => {
      callback(null, 'Hostname: my-computer\nOperating System: Linux', '');
    });

    console.log = jest.fn();

    getSystemInfo();

    expect(console.log).toHaveBeenCalledWith('\nSalida de hostnamectl:\n', 'Hostname: my-computer\nOperating System: Linux');
  });

  it('Debería manejar el error de exec', () => {
    exec.mockImplementation((command, callback) => {
      callback(new Error('Error ejecutando hostnamectl'), '', '');
    });

    console.log = jest.fn();

    getSystemInfo();

    // Aquí verificamos solo el mensaje del error, no el objeto completo
    expect(console.log).toHaveBeenCalledWith('\nError ejecutando hostnamectl:', expect.objectContaining({
      message: 'Error ejecutando hostnamectl'
    }));
  });

});
