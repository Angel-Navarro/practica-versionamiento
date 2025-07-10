//Código de Angel Navarro funciones glabales

//Validacion de inyeccion de codigo

// Globales.js
function ValidacionSQL(texto) {
    const patronesSQL = [
        /select\s+/i,
        /insert\s+/i,
        /update\s+/i,
        /delete\s+/i,
        /drop\s+/i,
        /alter\s+/i,
        /--/,
        /;/,
        /'|"|=|<|>/
    ];

    for (let patron of patronesSQL) {
        if (patron.test(texto)) {
            return false; // Detecta posible intento de inyección SQL
        }
    }

    return true;
}
