const chalk = require('chalk');
const readline = require('readline');
const fetch = require('node-fetch'); // Para hacer solicitudes HTTP

// URL base de la API de ExchangeRate-API
const apiUrlBase = 'https://api.exchangerate-api.com/v4/latest/';

// Mapeo de códigos de monedas a nombres humanos (como antes)
const currencyNames = {
    EUR: "Euro",
    AED: "Dirham de los Emiratos Árabes Unidos",
    AFN: "Afghani",
    ALL: "Lek albanés",
    AMD: "Dram armenio",
    ANG: "Florín de las Antillas Neerlandesas",
    AOA: "Kwanza angoleño",
    ARS: "Peso argentino",
    AUD: "Dólar australiano",
    AWG: "Florín de Aruba",
    AZN: "Manat azerbaiyano",
    BAM: "Marco convertible bosnio",
    BBD: "Dólar de Barbados",
    BDT: "Taka bengalí",
    BGN: "Lev búlgaro",
    BHD: "Dinar bahreiní",
    BIF: "Franco burundés",
    BMD: "Dólar bermudeño",
    BND: "Dólar de Brunéi",
    BOB: "Boliviano",
    BRL: "Real brasileño",
    BSD: "Dólar bahameño",
    BTN: "Ngultrum butanés",
    BWP: "Pula botswaniana",
    BYN: "Rublo bielorruso",
    BZD: "Dólar beliceño",
    CAD: "Dólar canadiense",
    CDF: "Franco congoleño",
    CHF: "Franco suizo",
    CLP: "Peso chileno",
    CNY: "Yuan chino",
    COP: "Peso colombiano",
    CRC: "Colón costarricense",
    CUP: "Peso cubano",
    CVE: "Escudo caboverdiano",
    CZK: "Corona checa",
    DJF: "Franco yibutiano",
    DKK: "Corona danesa",
    DOP: "Peso dominicano",
    DZD: "Dinar argelino",
    EGP: "Libra egipcia",
    ERN: "Nakfa eritreo",
    ETB: "Birr etíope",
    FJD: "Dólar fiyiano",
    FKP: "Libra de las Malvinas",
    FOK: "Corona de las Islas Feroe",
    GBP: "Libra esterlina",
    GEL: "Lari georgiano",
    GGP: "Libra de Guernsey",
    GHS: "Cedi ghanés",
    GIP: "Libra de Gibraltar",
    GMD: "Dalasi gambiano",
    GNF: "Franco guineano",
    GTQ: "Quetzal guatemalteco",
    GYD: "Dólar guyanés",
    HKD: "Dólar de Hong Kong",
    HNL: "Lempira hondureño",
    HRK: "Kuna croata",
    HTG: "Gourde haitiano",
    HUF: "Forinto húngaro",
    IDR: "Rupia indonesia",
    ILS: "Shekel israelí",
    IMP: "Libra de Isla de Man",
    INR: "Rupia india",
    IQD: "Dinar iraquí",
    IRR: "Rial iraní",
    ISK: "Corona islandesa",
    JEP: "Libra de Jersey",
    JMD: "Dólar jamaiquino",
    JOD: "Dinar jordano",
    JPY: "Yen japonés",
    KES: "Chelín keniano",
    KGS: "Som kirguís",
    KHR: "Riel camboyano",
    KID: "Dólar de Kiribati",
    KMF: "Franco comorense",
    KRW: "Won surcoreano",
    KWD: "Dinar kuwaití",
    KYD: "Dólar de las Islas Caimán",
    KZT: "Tenge kazajo",
    LAK: "Kip laosiano",
    LBP: "Libra libanesa",
    LKR: "Rupia de Sri Lanka",
    LRD: "Dólar liberiano",
    LSL: "Loti de Lesoto",
    LYD: "Dinar libio",
    MAD: "Dirham marroquí",
    MDL: "Leu moldavo",
    MGA: "Ariary malgache",
    MKD: "Denar macedonio",
    MMK: "Kyat birmano",
    MNT: "Tugrik mongol",
    MOP: "Pataca macanesa",
    MRU: "Ouguiya mauritano",
    MUR: "Rupia mauriciana",
    MVR: "Rufiyaa maldiva",
    MWK: "Kwacha malauí",
    MXN: "Peso mexicano",
    MYR: "Ringgit malayo",
    MZN: "Metical mozambiqueño",
    NAD: "Dólar namibio",
    NGN: "Naira nigeriana",
    NIO: "Córdoba nicaragüense",
    NOK: "Corona noruega",
    NPR: "Rupia nepalí",
    NZD: "Dólar neozelandés",
    OMR: "Rial omaní",
    PAB: "Balboa panameña",
    PEN: "Nuevo sol peruano",
    PGK: "Kina papúa-nueva guinea",
    PHP: "Peso filipino",
    PKR: "Rupia pakistaní",
    PLN: "Zloty polaco",
    PYG: "Guaraní paraguayo",
    QAR: "Rial catarí",
    RON: "Leu rumano",
    RSD: "Dinar serbio",
    RUB: "Rublo ruso",
    RWF: "Franco ruandés",
    SAR: "Riyal saudí",
    SBD: "Dólar de las Islas Salomón",
    SCR: "Rupia seychellense",
    SDG: "Libra sudanesa",
    SEK: "Corona sueca",
    SGD: "Dólar singapurense",
    SHP: "Libra de Santa Elena",
    SLE: "Leone sierraleonés",
    SLL: "Leone sierraleonés",
    SOS: "Chelín somalí",
    SRD: "Dólar de Surinam",
    SSP: "Libra sursudanesa",
    STN: "Dólar de San Tomé y Príncipe",
    SYP: "Libra siria",
    SZL: "Lilangeni suazi",
    THB: "Baht tailandés",
    TJS: "Somoni tayiko",
    TMT: "Manat turcomano",
    TND: "Dinar tunecino",
    TOP: "Paʻanga tongano",
    TRY: "Lira turca",
    TTD: "Dólar trinitense",
    TVD: "Dólar de Tuvalu",
    TWD: "Nuevo dólar taiwanés",
    TZS: "Chelín tanzano",
    UAH: "Grivna ucraniana",
    UGX: "Chelín ugandés",
    USD: "Dólar estadounidense",
    UYU: "Peso uruguayo",
    UZS: "Som uzbeko",
    VES: "Bolívar venezolano",
    VND: "Dong vietnamita",
    VUV: "Vatu de Vanuatu",
    WST: "Tala samoano",
    XAF: "Franco CFA de África Central",
    XCD: "Dólar del Caribe Oriental",
    XDR: "Derechos especiales de giro",
    XOF: "Franco CFA de África Occidental",
    XPF: "Franco CFP",
    YER: "Rial yemení",
    ZAR: "Rand sudafricano",
    ZMW: "Kwacha zambiano",
    ZWL: "Dólar de Zimbabue"
};

// Crear la interfaz de línea de comandos (CLI)
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


// Función para mostrar el menú de monedas y obtener la selección del usuario
function showMenu() {
    console.log(chalk.blue('Seleccione la moneda base para ver las tasas de cambio:'));

    // Ordenar las monedas por nombre completo de la moneda
    const sortedCurrencies = Object.keys(currencyNames).sort((a, b) => {
        return currencyNames[a].localeCompare(currencyNames[b]);
    });

// Esperar a que el DOM se cargue completamente
window.addEventListener("DOMContentLoaded", () => {
    // Obtener el elemento select de HTML
    const baseCurrencySelect = document.getElementById("baseCurrency");

    // Vaciar el select antes de agregar las opciones
    baseCurrencySelect.innerHTML = "";

    // Crear una opción por defecto
    const defaultOption = document.createElement("option");
    defaultOption.textContent = "Seleccione una moneda";
    defaultOption.value = "";  // Valor vacío para la opción predeterminada
    baseCurrencySelect.appendChild(defaultOption);

    // Agregar las opciones ordenadas al select
    sortedCurrencies.forEach(currencyCode => {
        const option = document.createElement("option");
        option.value = currencyCode;  // El valor será el código de la moneda
        option.textContent = currencyNames[currencyCode];  // El texto será el nombre de la moneda
        baseCurrencySelect.appendChild(option);
    });
});





    // Listar todas las monedas disponibles en orden alfabético por nombre completo, pero mostrar primero el código
    sortedCurrencies.forEach((currency, index) => {
        console.log(`${index + 1}. ${currency} - ${currencyNames[currency]}`);
    });

    rl.question('\nPor favor ingrese el número de la moneda base que desea: ', (answer) => {
        const selectedOption = parseInt(answer);
        if (selectedOption >= 1 && selectedOption <= sortedCurrencies.length) {
            const selectedCurrency = sortedCurrencies[selectedOption - 1];
            fetchExchangeRates(selectedCurrency);
        } else {
            console.log(chalk.red('Opción inválida. Intenta nuevamente.'));
            showMenu();
        }
    });
}

// Función para obtener las tasas de cambio desde la API
function fetchExchangeRates(baseCurrency) {
    const apiUrl = `${apiUrlBase}${baseCurrency}`;
    fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
            if (data.rates) {
                // Obtener la lista de tasas de cambio y ordenarlas por nombre de la moneda
                const exchangeRates = Object.entries(data.rates)
                    .map(([currency, rate]) => ({
                        currencyName: currencyNames[currency] || currency,
                        currencyCode: currency,  // Guardar el código de la moneda
                        rate: rate.toFixed(4)
                    }))
                    // Ordenar alfabéticamente por el nombre completo de la moneda
                    .sort((a, b) => a.currencyName.localeCompare(b.currencyName));

                // Encontrar el tamaño máximo de la parte entera de las tasas
                const maxIntegerLength = Math.max(...exchangeRates.map(rate => rate.rate.split('.')[0].length));
                const maxCurrencyNameLength = Math.max(...exchangeRates.map(rate => `${rate.currencyName} (${rate.currencyCode})`.length));

                // Mostrar las tasas de cambio con columnas alineadas
                console.log(chalk.green(`\nTasas de cambio para ${currencyNames[baseCurrency]} (${baseCurrency}):\n`));
                exchangeRates.forEach(({ currencyName, currencyCode, rate }) => {
                    // Crear los puntos entre el nombre de la moneda (con el código) y los dos puntos
                    const currencyLabel = `${currencyName} (${currencyCode})`;
                    const spacesToAdd = maxCurrencyNameLength - currencyLabel.length;
                    const paddedCurrencyLabel = '.'.repeat(spacesToAdd) + currencyLabel;

                    // Obtener la parte entera y decimal de la tasa
                    const [integerPart, decimalPart] = rate.split('.');

                    // Ajustar la parte entera para que todos los números estén alineados a la derecha
                    const paddedInteger = integerPart.padStart(maxIntegerLength, ' ');

                    // Combinar la parte entera con los decimales para la tasa completa
                    const alignedRate = `${paddedInteger}.${decimalPart}`;

                    // Mostrar la moneda y la tasa de cambio alineada
                    console.log(`1 ${currencyNames[baseCurrency]} (${baseCurrency}) : ${alignedRate} ${paddedCurrencyLabel} `);
                });

                // Mostrar la moneda
                console.log(chalk.green(`\nEstas son las tasas de cambio para:`), chalk.yellowBright(`${currencyNames[baseCurrency]} (${baseCurrency})`));

                // Mostrar la fecha y hora de la actualización
                const currentDate = new Date().toLocaleString('es-ES', { timeZone: 'Europe/Madrid' });
                console.log(chalk.yellow(`\nFecha de actualización (hora de Europa/Madrid):`), chalk.bgBlue(`${currentDate}\n`));
            } else {
                console.log(chalk.red('No se pudieron obtener las tasas de cambio.'));
            }
            rl.close();
        })
        .catch((error) => {
            console.error(chalk.red('Error al obtener los datos de la API:'), error);
            rl.close();
        });
}

// Llamar a la función de menú al inicio
showMenu();