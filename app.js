/**
 * TIC TAC TOE
 */

let turno = true;

let tablero = document.getElementsByClassName('casilla');

let contadorX = document.getElementById("contadorX");
contadorX.textContent = 0;

let contadorO = document.getElementById("contadorO");
contadorO.textContent = 0;

let buttonReset = document.getElementById("button-reset");
buttonReset.setAttribute('onclick', 'Reset()');

let mostrarTurnoX = document.getElementById("mostrarTurnoX");
let mostrarTurnoO = document.getElementById("mostrarTurnoO");

let div_mostrarTurnoX = document.getElementById("temporizadorX");
let div_mostrarTurnoO = document.getElementById("temporizadorO");

let temporizadorX = document.getElementById("temporizadorX");
let temporizadorO = document.getElementById("temporizadorO");

let intervalX = setInterval(timerX, 1000);
let intervalO = setInterval(timerO, 1000);

const tiempo = 5;

let contadorFichas = 0;

let tiempoX = tiempo;
let tiempoO = tiempo;

let combinacionGanadora = [
    [3, 4, 5],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
stopTimerX();
stopTimerO();
iniciar();

function Reset() {
    tiempoX = tiempo;
    tiempoO = tiempo;
    turno = true;
    contadorX.textContent = 0;
    contadorO.textContent = 0;
    resetearTablero();
    stopTimerX();
    stopTimerO();
}

function timerX() {
    temporizadorX.innerHTML = tiempoX--;
    if (tiempoX < 0) {
        alert("Se le acabó el tiempo a las X, gana las O ");
        contadorO.textContent = parseInt(contadorO.textContent) + 1;


        resetearTablero();
        stopTimerX();
        MOSTRARTURNO(turno)

        turno = !turno;

    }
}



function stopTimerX() {
    clearInterval(intervalX);
    tiempoX = tiempo;
    temporizadorX.innerHTML = tiempoX;
}

function timerO() {
    temporizadorO.innerHTML = tiempoO--;
    if (tiempoO < 0) {
        alert("Se le acabó el tiempo a las O, gana las X");
        contadorX.textContent = parseInt(contadorX.textContent) + 1;
        resetearTablero();
        stopTimerO();
        MOSTRARTURNO(turno)

        turno = !turno;

    }
}

function stopTimerO() {
    clearInterval(intervalO);
    tiempoO = tiempo;
    temporizadorO.innerHTML = tiempoO;
}

function iniciar() {
    for (let i = 0; i < tablero.length; i++) {
        tablero[i].setAttribute('onclick', `pintaConsola(${i})`);
        tablero[i].setAttribute('id', `hover`);
        tablero[i].textContent = '';
    }
}


function pintaConsola(numero) {

    MOSTRARTURNO(turno);
    if (turno) {
        tablero[numero].textContent = 'X';
    }
    else {

        tablero[numero].textContent = 'O';
    }
    contadorFichas++;

    tablero[numero].removeAttribute('onclick');
    tablero[numero].removeAttribute('id', `hover`);
    GANADOR();
    if (contadorFichas == 9) {

        resetearTablero();
    }
    turno = !turno;
}

function GANADOR() {
    let actualX = [];
    let actualO = [];
    for (let i = 0; i < tablero.length; i++) {
        if (tablero[i].innerHTML == 'O') {
            actualO.push(i);
        }
        else if (tablero[i].innerHTML == 'X') {
            actualX.push(i);
        }
    }

    for (let i = 0; i < combinacionGanadora.length; i++) {
        if (actualX.includes(combinacionGanadora[i][0]) && actualX.includes(combinacionGanadora[i][1]) && actualX.includes(combinacionGanadora[i][2])) {

            tablero[combinacionGanadora[i][0]].style.backgroundColor = "green";
            tablero[combinacionGanadora[i][1]].style.backgroundColor = "green";
            tablero[combinacionGanadora[i][2]].style.backgroundColor = "green";

            setTimeout(function () {

                tablero[combinacionGanadora[i][0]].removeAttribute('style');
                tablero[combinacionGanadora[i][1]].removeAttribute('style');
                tablero[combinacionGanadora[i][2]].removeAttribute('style');

                alert('GANAN LAS X');
            }, 1500);
            contadorX.textContent = parseInt(contadorX.textContent) + 1;
            resetearTablero();
        }
    }

    for (let i = 0; i < combinacionGanadora.length; i++) {
        if (actualO.includes(combinacionGanadora[i][0]) && actualO.includes(combinacionGanadora[i][1]) && actualO.includes(combinacionGanadora[i][2])) {
            console.log(combinacionGanadora[i][0]);
            tablero[combinacionGanadora[i][0]].style.backgroundColor = "green";
            tablero[combinacionGanadora[i][1]].style.backgroundColor = "green";
            tablero[combinacionGanadora[i][2]].style.backgroundColor = "green";
            setTimeout(function () {
                tablero[combinacionGanadora[i][0]].removeAttribute('style');
                tablero[combinacionGanadora[i][1]].removeAttribute('style');
                tablero[combinacionGanadora[i][2]].removeAttribute('style');
                alert('GANAN LAS O');
            }, 1500);
            contadorO.textContent = parseInt(contadorO.textContent) + 1;
            resetearTablero();
        }
    }
}
function resetearTablero() {
    for (let j = 0; j < tablero.length; j++) {
        tablero[j].setAttribute('onclick', `pintaConsola(${j})`);
        tablero[j].setAttribute('id', `hover`);

        tablero[j].textContent = '';

        contadorFichas = 0;
    }
}

function MOSTRARTURNO(turno) {
    if (turno) {

        div_mostrarTurnoO.setAttribute('id', `tiempo`);
        div_mostrarTurnoX.removeAttribute('id', `tiempo`);
        intervalO = setInterval(timerO, 1000);
        stopTimerX();
    }
    else {
        div_mostrarTurnoX.setAttribute('id', `tiempo`);
        div_mostrarTurnoO.removeAttribute('id', `tiempo`);

        intervalX = setInterval(timerX, 1000);
        stopTimerO();
    }
}