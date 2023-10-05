// libreria per la risoluzione di equazioni
const nerdamer = require('nerdamer/all');
// vettore di equazioni per poter provare il funzionamento del programma
const eq = ['x^3-x+1', '4x^2-x+6'];
// timer utilizzato per il setInterval
let timer;

/**
 * funzione di bisezione che calcola la soluzione di un'equazione in un intervallo
 * @param {Array} intervallo 
 * @param {float} tolleranza 
 * @param {string} equazione 
 */
function bisezione(intervallo, tolleranza, equazione){
    // simboli necessari per nerdamer per permettere la sostituzione di x con il punto medio
    const x = nerdamer('x');
    const x_negativo = nerdamer('-x');

    // intestazione
    console.log('---------------------------');
    console.log('intervallo: [' + intervallo + ']');
    console.log('tolleranza: ' + tolleranza);
    console.log('equazione: ' + equazione + '\n');

    // calcolo il punto medio dell'intervallo
    let m = (intervallo[0] + intervallo[1]) / 2;
    console.log('punto medio: ' + m);

    // sostituisco x con il punto medio nell'equazione
    let equazioneConSostituzione = equazione.replace(x.toString(), '(' + m + ')');
    // sostituisco -x con il punto medio nell'equazione
    equazioneConSostituzione = equazioneConSostituzione.replace(x_negativo.toString(), '+(' + m + ')');
    console.log('equazione con sostituzione: ' + equazioneConSostituzione);

    // Calcola il valore dell'equazione nel punto medio
    const valoreEquazione = nerdamer(equazioneConSostituzione).evaluate();
    console.log('valore dell\'equazione: ' + valoreEquazione.toString() + '\n');

    // Se il valore dell'equazione è minore di zero
    if (parseInt(valoreEquazione.toString()) < 0){
        // Il punto medio diventa il nuovo estremo inferiore
        console.log('valore dell\'equazione minore di zero');
        intervallo[0] = m;
        console.log('nuovo intervallo: ' + intervallo + '\n');
    }
    // Se il valore dell'equazione è maggiore di zero
    else if (parseInt(valoreEquazione.toString()) > 0){
        // Il punto medio diventa il nuovo estremo superiore
        console.log('valore dell\'equazione maggiore di zero\n');
        intervallo[1] = m;
        console.log('nuovo intervallo: ' + intervallo + '\n');
    }

    // Se la differenza tra gli estremi è minore della tolleranza
    console.log('if => ' + Math.abs(valoreEquazione) + ' < ' + tolleranza + '\n');
    console.log('---------------------------');
    // Se la differenza tra gli estremi è minore della tolleranza
    if (Math.abs(valoreEquazione) < tolleranza){
        // Ho trovato una soluzione accettabile
        console.log('Soluzione: ' + m);
        clearInterval(timer);
        return;
    }
}

timer = setInterval(bisezione, 1000, [-2, 0], 0.3, eq[0]);
