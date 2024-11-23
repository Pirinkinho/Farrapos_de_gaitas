const chalk = require('chalk');
const readline = require('readline');
const fetch = require('node-fetch'); // Para hacer solicitudes HTTP

// URL base de la API de ExchangeRate-API
const apiUrlBase = 'https://api.exchangerate-api.com/v4/latest/';

// Mapeo de códigos de monedas a nombres humanos
const currencyNames = {
    EUR: { singular: "Euro", plural: "Euros" },
    AED: { singular: "Dirham de los Emiratos Árabes Unidos", plural: "Dirhams de los Emiratos Árabes Unidos" },
    AFN: { singular: "Afghani", plural: "Afs afganos" },
    ALL: { singular: "Lek albanés", plural: "Lekë albaneses" },
    AMD: { singular: "Dram armenio", plural: "Drams armenios" },
    ANG: { singular: "Florín de las Antillas Neerlandesas", plural: "Florines de las Antillas Neerlandesas" },
    AOA: { singular: "Kwanza angoleño", plural: "Kwanzas angoleños" },
    ARS: { singular: "Peso argentino", plural: "Pesos argentinos" },
    AUD: { singular: "Dólar australiano", plural: "Dólares australianos" },
    AWG: { singular: "Florín de Aruba", plural: "Florines de Aruba" },
    AZN: { singular: "Manat azerbaiyano", plural: "Manates azerbaiyanos" },
    BAM: { singular: "Marco convertible bosnio", plural: "Marcos convertibles bosnios" },
    BBD: { singular: "Dólar de Barbados", plural: "Dólares de Barbados" },
    BDT: { singular: "Taka bengalí", plural: "Takas bengalíes" },
    BGN: { singular: "Lev búlgaro", plural: "Leva búlgaros" },
    BHD: { singular: "Dinar bahreiní", plural: "Dinares bahreiníes" },
    BIF: { singular: "Franco burundés", plural: "Francos burundeses" },
    BMD: { singular: "Dólar bermudeño", plural: "Dólares bermudeños" },
    BND: { singular: "Dólar de Brunéi", plural: "Dólares de Brunéi" },
    BOB: { singular: "Boliviano", plural: "Bolivianos" },
    BRL: { singular: "Real brasileño", plural: "Reales brasileños" },
    BSD: { singular: "Dólar bahameño", plural: "Dólares bahameños" },
    BTN: { singular: "Ngultrum butanés", plural: "Ngultrums butaneses" },
    BWP: { singular: "Pula botswaniana", plural: "Pulas botswanianas" },
    BYN: { singular: "Rublo bielorruso", plural: "Rublos bielorrusos" },
    BZD: { singular: "Dólar beliceño", plural: "Dólares beliceños" },
    CAD: { singular: "Dólar canadiense", plural: "Dólares canadienses" },
    CDF: { singular: "Franco congoleño", plural: "Francos congoleños" },
    CHF: { singular: "Franco suizo", plural: "Francos suizos" },
    CLP: { singular: "Peso chileno", plural: "Pesos chilenos" },
    CNY: { singular: "Yuan chino", plural: "Yuans chinos" },
    COP: { singular: "Peso colombiano", plural: "Pesos colombianos" },
    CRC: { singular: "Colón costarricense", plural: "Colones costarricenses" },
    CUP: { singular: "Peso cubano", plural: "Pesos cubanos" },
    CVE: { singular: "Escudo caboverdiano", plural: "Escudos caboverdianos" },
    CZK: { singular: "Corona checa", plural: "Coronas checas" },
    DJF: { singular: "Franco yibutiano", plural: "Francos yibutianos" },
    DKK: { singular: "Corona danesa", plural: "Coronas danesas" },
    DOP: { singular: "Peso dominicano", plural: "Pesos dominicanos" },
    DZD: { singular: "Dinar argelino", plural: "Dinares argelinos" },
    EGP: { singular: "Libra egipcia", plural: "Libras egipcias" },
    ERN: { singular: "Nakfa eritreo", plural: "Nakfas eritreas" },
    ETB: { singular: "Birr etíope", plural: "Birrs etíopes" },
    FJD: { singular: "Dólar fiyiano", plural: "Dólares fiyianos" },
    FKP: { singular: "Libra de las Malvinas", plural: "Libras de las Malvinas" },
    FOK: { singular: "Corona de las Islas Feroe", plural: "Coronas de las Islas Feroe" },
    GBP: { singular: "Libra esterlina", plural: "Libras esterlinas" },
    GEL: { singular: "Lari georgiano", plural: "Laris georgianos" },
    GGP: { singular: "Libra de Guernsey", plural: "Libras de Guernsey" },
    GHS: { singular: "Cedi ghanés", plural: "Cedis ghaneses" },
    GIP: { singular: "Libra de Gibraltar", plural: "Libras de Gibraltar" },
    GMD: { singular: "Dalasi gambiano", plural: "Dalasís gambianos" },
    GNF: { singular: "Franco guineano", plural: "Francos guineanos" },
    GTQ: { singular: "Quetzal guatemalteco", plural: "Quetzales guatemaltecos" },
    GYD: { singular: "Dólar guyanés", plural: "Dólares guyaneses" },
    HKD: { singular: "Dólar de Hong Kong", plural: "Dólares de Hong Kong" },
    HNL: { singular: "Lempira hondureño", plural: "Lempiras hondureños" },
    HRK: { singular: "Kuna croata", plural: "Kunas croatas" },
    HTG: { singular: "Gourde haitiano", plural: "Gourdes haitianos" },
    HUF: { singular: "Forinto húngaro", plural: "Forintos húngaros" },
    IDR: { singular: "Rupia indonesia", plural: "Rupias indonesias" },
    ILS: { singular: "Shekel israelí", plural: "Shekels israelíes" },
    IMP: { singular: "Libra de Isla de Man", plural: "Libras de Isla de Man" },
    INR: { singular: "Rupia india", plural: "Rupias indias" },
    IQD: { singular: "Dinar iraquí", plural: "Dinares iraquíes" },
    IRR: { singular: "Rial iraní", plural: "Riales iraníes" },
    ISK: { singular: "Corona islandesa", plural: "Coronas islandesas" },
    JEP: { singular: "Libra de Jersey", plural: "Libras de Jersey" },
    JMD: { singular: "Dólar jamaiquino", plural: "Dólares jamaiquinos" },
    JOD: { singular: "Dinar jordano", plural: "Dinares jordanos" },
    JPY: { singular: "Yen japonés", plural: "Yenes japoneses" },
    KES: { singular: "Chelín keniano", plural: "Chelines kenianos" },
    KGS: { singular: "Som kirguís", plural: "Soms kirguises" },
    KHR: { singular: "Riel camboyano", plural: "Riels camboyanos" },
    KID: { singular: "Dólar de Kiribati", plural: "Dólares de Kiribati" },
    KMF: { singular: "Franco comorense", plural: "Francos comorenses" },
    KRW: { singular: "Won surcoreano", plural: "Wons surcoreanos" },
    KWD: { singular: "Dinar kuwaití", plural: "Dinares kuwaitíes" },
    KYD: { singular: "Dólar de las Islas Caimán", plural: "Dólares de las Islas Caimán" },
    KZT: { singular: "Tenge kazajo", plural: "Tenges kazajos" },
    LAK: { singular: "Kip laosiano", plural: "Kips laosianos" },
    LBP: { singular: "Libra libanesa", plural: "Libras libanesas" },
    LKR: { singular: "Rupia de Sri Lanka", plural: "Rupias de Sri Lanka" },
    LRD: { singular: "Dólar liberiano", plural: "Dólares liberianos" },
    LSL: { singular: "Loti de Lesoto", plural: "Lotis de Lesoto" },
    LYD: { singular: "Dinar libio", plural: "Dinares libios" },
    MAD: { singular: "Dirham marroquí", plural: "Dirhams marroquíes" },
    MDL: { singular: "Leu moldavo", plural: "Lei moldavos" },
    MGA: { singular: "Ariary malgache", plural: "Ariarys malgaches" },
    MKD: { singular: "Denar macedonio", plural: "Denars macedonios" },
    MMK: { singular: "Kyat birmano", plural: "Kyats birmanos" },
    MNT: { singular: "Tugrik mongol", plural: "Tugrikes mongoles" },
    MOP: { singular: "Pataca macanesa", plural: "Patacas macanesas" },
    MRU: { singular: "Ouguiya mauritano", plural: "Ouguiyas mauritanos" },
    MUR: { singular: "Rupia mauriciana", plural: "Rupias mauricianas" },
    MVR: { singular: "Rufiyaa maldiva", plural: "Rufiyaas maldivos" },
    MWK: { singular: "Kwacha malauí", plural: "Kwachas malauís" },
    MXN: { singular: "Peso mexicano", plural: "Pesos mexicanos" },
    MYR: { singular: "Ringgit malayo", plural: "Ringgits malayos" },
    MZN: { singular: "Metical mozambiqueño", plural: "Meticals mozambiqueños" },
    NAD: { singular: "Dólar namibio", plural: "Dólares namibios" },
    NGN: { singular: "Naira nigeriana", plural: "Nairas nigerianas" },
    NIO: { singular: "Córdoba nicaragüense", plural: "Córdobas nicaragüenses" },
    NOK: { singular: "Corona noruega", plural: "Coronas noruegas" },
    NPR: { singular: "Rupia nepalí", plural: "Rupias nepalíes" },
    NZD: { singular: "Dólar neozelandés", plural: "Dólares neozelandeses" },
    OMR: { singular: "Rial omaní", plural: "Riales omaníes" },
    PAB: { singular: "Balboa panameña", plural: "Balboas panameñas" },
    PEN: { singular: "Nuevo sol peruano", plural: "Nuevos soles peruanos" },
    PGK: { singular: "Kina papúa-nueva guinea", plural: "Kinas papúa-nueva guinea" },
    PHP: { singular: "Peso filipino", plural: "Pesos filipinos" },
    PKR: { singular: "Rupia pakistaní", plural: "Rupias pakistaníes" },
    PLN: { singular: "Zloty polaco", plural: "Zlotys polacos" },
    PYG: { singular: "Guaraní paraguayo", plural: "Guaraníes paraguayos" },
    QAR: { singular: "Rial catarí", plural: "Riales cataríes" },
    RON: { singular: "Leu rumano", plural: "Lei rumanos" },
    RSD: { singular: "Dinar serbio", plural: "Dinares serbios" },
    RUB: { singular: "Rublo ruso", plural: "Rublos rusos" },
    RWF: { singular: "Franco ruandés", plural: "Francos ruandeses" },
    SAR: { singular: "Riyal saudí", plural: "Riyales saudíes" },
    SBD: { singular: "Dólar de las Islas Salomón", plural: "Dólares de las Islas Salomón" },
    SCR: { singular: "Rupia seychellense", plural: "Rupias seychellenses" },
    SDG: { singular: "Libra sudanesa", plural: "Libras sudanesas" },
    SEK: { singular: "Corona sueca", plural: "Coronas suecas" },
    SGD: { singular: "Dólar singapurense", plural: "Dólares singapurenses" },
    SHP: { singular: "Libra de Santa Elena", plural: "Libras de Santa Elena" },
    SLE: { singular: "Leone sierraleonés", plural: "Leones sierraleonenses" },
    SLL: { singular: "Leone sierraleonés", plural: "Leones sierraleonenses" },
    SOS: { singular: "Chelín somalí", plural: "Chelines somalíes" },
    SRD: { singular: "Dólar de Surinam", plural: "Dólares de Surinam" },
    SSP: { singular: "Libra sursudanesa", plural: "Libras sursudanesas" },
    STN: { singular: "Dólar de San Tomé y Príncipe", plural: "Dólares de San Tomé y Príncipe" },
    SYP: { singular: "Libra siria", plural: "Libras sirias" },
    SZL: { singular: "Lilangeni suazi", plural: "Lilangenis suazis" },
    THB: { singular: "Baht tailandés", plural: "Bahts tailandeses" },
    TJS: { singular: "Somoni tayiko", plural: "Somonis tayikos" },
    TMT: { singular: "Manat turcomano", plural: "Manates turcomanos" },
    TND: { singular: "Dinar tunecino", plural: "Dinares tunecinos" },
    TOP: { singular: "Paʻanga tongano", plural: "Paʻangas tonganos" },
    TRY: { singular: "Lira turca", plural: "Liras turcas" },
    TTD: { singular: "Dólar trinitense", plural: "Dólares trinitenses" },
    TVD: { singular: "Dólar de Tuvalu", plural: "Dólares de Tuvalu" },
    TWD: { singular: "Nuevo dólar taiwanés", plural: "Nuevos dólares taiwaneses" },
    TZS: { singular: "Chelín tanzano", plural: "Chelines tanzanos" },
    UAH: { singular: "Grivna ucraniana", plural: "Grivnas ucranianas" },
    UGX: { singular: "Chelín ugandés", plural: "Chelines ugandeses" },
    USD: { singular: "Dólar estadounidense", plural: "Dólares estadounidenses" },
    UYU: { singular: "Peso uruguayo", plural: "Pesos uruguayos" },
    UZS: { singular: "Som uzbeko", plural: "Soms uzbekos" },
    VES: { singular: "Bolívar venezolano", plural: "Bolívares venezolanos" },
    VND: { singular: "Dong vietnamita", plural: "Dongs vietnamitas" },
    VUV: { singular: "Vatu de Vanuatu", plural: "Vatus de Vanuatu" },
    WST: { singular: "Tala samoano", plural: "Talas samoanos" },
    XAF: { singular: "Franco CFA de África Central", plural: "Francos CFA de África Central" },
    XCD: { singular: "Dólar del Caribe Oriental", plural: "Dólares del Caribe Oriental" },
    XDR: { singular: "Derechos especiales de giro", plural: "Derechos especiales de giro" },
    XOF: { singular: "Franco CFA de África Occidental", plural: "Francos CFA de África Occidental" },
    XPF: { singular: "Franco CFP", plural: "Francos CFP" },
    YER: { singular: "Rial yemení", plural: "Riales yemeníes" },
    ZAR: { singular: "Rand sudafricano", plural: "Rand sudafricanos" },
    ZMW: { singular: "Kwacha zambiano", plural: "Kwachas zambianos" },
    ZWL: { singular: "Dólar de Zimbabue", plural: "Dólares de Zimbabue" }
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
        return currencyNames[a].singular.localeCompare(currencyNames[b].singular);
    });

    // Listar todas las monedas disponibles en orden alfabético por nombre completo, pero mostrar primero el código
    sortedCurrencies.forEach((currency, index) => {
        console.log(`${index + 1}. ${currency} - ${currencyNames[currency].singular}`);
    });
    
    rl.question('\nPor favor ingrese el número de la moneda base que desea: ', (answer) => {
        const selectedOption = parseInt(answer);
        if (selectedOption >= 1 && selectedOption <= sortedCurrencies.length) {
            const selectedCurrency = sortedCurrencies[selectedOption - 1];
            fetchExchangeRates(selectedCurrency);
        } else {

            // Secuencia de escape ANSI para texto parpadeante
            const blink = '\x1b[5m';

            // Texto parpadeante y rojo
            console.log(blink + chalk.red('\nOpción inválida. Intenta nuevamente.') + '\x1b[0m');
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
                    .sort((a, b) => a.currencyName.singular.localeCompare(b.currencyName.singular));

                // Encontrar el tamaño máximo de la parte entera de las tasas
                const maxIntegerLength = Math.max(...exchangeRates.map(rate => rate.rate.split('.')[0].length));
                const maxCurrencyNameLength = Math.max(...exchangeRates.map(rate => `${rate.currencyName.plural} (${rate.currencyCode})`.length));

                // Mostrar las tasas de cambio con columnas alineadas
                console.log(chalk.green(`\nTasas de cambio para ${currencyNames[baseCurrency].singular} (${baseCurrency}):\n`));
                exchangeRates.forEach(({ currencyName, currencyCode, rate }) => {
                    // Crear los puntos entre el nombre de la moneda (con el código) y los dos puntos
                    const currencyLabel = `${currencyName.plural} (${currencyCode})`;
                    const spacesToAdd = maxCurrencyNameLength - currencyLabel.length;
                    const paddedCurrencyLabel = '_'.repeat(spacesToAdd) + currencyLabel;

                    // Obtener la parte entera y decimal de la tasa
                    const [integerPart, decimalPart] = rate.split('.');

                    // Ajustar la parte entera para que todos los números estén alineados a la derecha
                    const paddedInteger = integerPart.padStart(maxIntegerLength, ' ');

                    // Combinar la parte entera con los decimales para la tasa completa
                    const alignedRate = `${paddedInteger}.${decimalPart}`;

                    // Mostrar la moneda y la tasa de cambio alineada
                    console.log(`1  ${currencyNames[baseCurrency].singular} (${baseCurrency}) : ${alignedRate}  ${paddedCurrencyLabel}`);
                });

                console.log(chalk.green(`\nEstas son las tasas de cambio para:`), chalk.yellowBright(`${currencyNames[baseCurrency].singular} (${baseCurrency})`));

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