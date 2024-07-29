// Lista de cuentas 
let cuentas = [
    {nombre: "Juan Garcia", saldo: 300, password: '1234'},
    {nombre: "Edgar Guzman", saldo: 300, password: '4444'},
    {nombre: "Pedro Gomez", saldo: 300, password: '5555'},

]
 
let nombre, saldoActual; // Variables para almacenar el nombre y saldo actual del usuario


function login() {
    const usuario = document.getElementById('usuario').value; // Obtiene el nombre de usuario ingresado
    const contraseña = document.getElementById('password').value; // Obtiene la contraseña ingresada
 
    let usuarioEncontrado = false; // Variable para verificar si el usuario fue encontrado
 
    // Recorre la lista de cuentas para verificar el usuario y contraseña
    for (let i = 0; i < cuentas.length; i++) {
        if (usuario === cuentas[i].nombre && contraseña === cuentas[i].password) {
            nombre = usuario; // Guarda el nombre del usuario
            // Intenta obtener el saldo desde el almacenamiento local, si no existe, usa el saldo de la cuenta
            saldoActual = parseFloat(localStorage.getItem(nombre)) || cuentas[i].saldo;
            localStorage.setItem('saludo', nombre); // Guarda el nombre en el almacenamiento local
            localStorage.setItem(nombre, saldoActual); // Guarda el saldo en el almacenamiento local
            mostrarCajero(); // Cambia a la página del cajero
            usuarioEncontrado = true; // Marca que el usuario fue encontrado
            break; // Sale del bucle
        }
    }
 
    // Si el usuario no fue encontrado, muestra un mensaje de error
    if (!usuarioEncontrado) {
        document.getElementById('alerta').innerHTML = 'Usuario o contraseña incorrectos';
    }
}

function mostrarCajero() {
    location.href = 'cajero.html';
}

function cerrarSesion() {
    location.href = 'index.html';
}

function nomUsuario() {
    let nombreUsuario = localStorage.getItem('saludo'); // Obtiene el nombre del usuario del almacenamiento local
    saldoActual = parseFloat(localStorage.getItem(nombreUsuario)) || 0; // Obtiene el saldo del usuario del almacenamiento local
    document.getElementById('saludo').innerHTML = "Usuario: "+  nombreUsuario; // Muestra el nombre del usuario
    Swal.fire({
        title: "Bienvenido ",
        text: nombreUsuario,
        imageUrl: "imagenes/Devf Bank.png",
        imageWidth: 100,
        imageHeight: 100,
         });
}




document.addEventListener('DOMContentLoaded', () => {
    let consultar = document.getElementById('btnConsultar'); 
    let depositar = document.getElementById('btnDepositar'); 
    let retirar = document.getElementById('btnRetirar'); 
    let boton = document.getElementById('iniciar'); 
   
    
    if (boton) boton.addEventListener('click', login);
    if (!boton) nomUsuario();
 
  
    if (consultar) consultar.addEventListener('click', consultarSaldo);
    if (depositar) depositar.addEventListener('click', depositarMonto);
   if (retirar) retirar.addEventListener('click', retirarMonto);
});
 


function consultarSaldo() {
    document.getElementById('saldo').innerHTML = 'Saldo: $' + saldoActual; 
    vaciarInputDepositar(); 
    //vaciarAlertas(); 
    vaciarTransaccion(); 
}

function vaciarSaldo() {
    document.getElementById('saldo').innerHTML = "";
}
function vaciarInputDepositar() {
    document.getElementById('ingresarmonto').value = "";

}
    
function vaciarTransaccion() {
    document.getElementById('transaccion').innerHTML = "";
    document.getElementById('nuevoSaldo').innerHTML = "";
}


function depositarMonto() {
    let monto = document.getElementById('ingresarmonto').value; // Obtiene el monto del input
    let deposito = parseFloat(monto); 
    let saldoMasDeposito = deposito + saldoActual; //Saldo nuevo despues del deposito
 
  
 
    if (monto === '') { // Verifica si el monto está vacío
        // document.getElementById('vacio').innerHTML = 'Escriba el monto a depositar';
        Swal.fire({
            title: "Error ",
            text: "Ingrese el monto a depositar.",
            icon: "error",
        });
       
        
    } else if (deposito <= 0) { // Verifica si se ingresó un monto válido
        // document.getElementById('alerta').innerHTML = 'Ingrese una cantidad válida';
        Swal.fire({
            title: "Atención ",
            text: "Favor de ingresar un monto válido.",
            icon: "warning",
        });
        vaciarSaldo();
        vaciarTransaccion();
        vaciarInputDepositar();
    } else if (saldoMasDeposito > 990) { // Verifica si el saldo no excede el límite
        //document.getElementById('alerta').innerHTML = 'Lo lamento, no puede tener más de $990 en su cuenta';

        Swal.fire({
            title: "Lo sentimos ",
            text: "Su cuenta no debe exceder de $990mxn, por favor ingrese un monto menor. " +
                "Saldo actual: $" + saldoActual +
                "mxn. Monto ingresado: $" + deposito + "mxn",
            
            icon: "warning",
        });
        vaciarSaldo();
        vaciarTransaccion();
        vaciarInputDepositar();

       // document.getElementById('alertaSaldo').innerHTML = 'Saldo actual: $' + saldoActual;
        //document.getElementById('alertaTransaccion').innerHTML = 'Error en la transacción: depósito de $' + deposito;
        vaciarInputDepositar();
        vaciarSaldo();
        vaciarTransaccion();
    } else { 
        saldoActual = saldoMasDeposito; // Actualiza el saldo actual
        localStorage.setItem(nombre, saldoActual); // Guarda el saldo actualizado en el almacenamiento local
        document.getElementById('nuevoSaldo').innerHTML = 'Saldo actual: $' + saldoActual; // Muestra el nuevo saldo
        document.getElementById('transaccion').innerHTML = 'Depósito de: $' + deposito; 
        vaciarInputDepositar(); 
        vaciarSaldo(); 
    }
}

function retirarMonto() {
    let cantidad = document.getElementById('ingresarmonto').value; 
    let retiro = parseFloat(cantidad); // Convierte la cantidad a un número
    let saldoMenosRetiro = saldoActual - retiro; 
    vaciarInputDepositar(); 
    vaciarTransaccion();
    vaciarSaldo();
 
    if (cantidad === '') { // Verifica si la cantidad está vacía
        //document.getElementById('alerta').innerHTML = 'Escriba el monto a retirar';
        Swal.fire({
            title: "Atención ",
            text: "Ingrese el monto que desea retirar.",
            icon: "warning",
        });

        
    } else if (retiro <= 0) { // Verifica si la cantidad es válida
        //document.getElementById('alerta').innerHTML = 'Ingrese una cantidad válida';
        
        Swal.fire({
            title: "Atención ",
            text: "Favor de ingresar un monto válido.",
            icon: "warning",
        });
        vaciarSaldo();
        vaciarTransaccion();

    } else if (saldoMenosRetiro < 10) { // Verifica si el saldo no baja del mínimo de 10mxn
        console.log("Menor a 10")
       // document.getElementById('alerta').innerHTML = 'Lo lamento, no puede tener menos de $10 en su cuenta';
       // document.getElementById('alertaSaldo').innerHTML = 'Saldo actual: $' + saldoActual;
       // document.getElementById('alertaTransaccion').innerHTML = 'Error en la transacción: retiro de $' + retiro;

        Swal.fire({
            title: "Lo sentimos ",
            text: "Su cuenta no debe tener menos de $10mxn, por favor ingrese un monto menor. " + "Su saldo actual es: $" + saldoActual + "mxn y el monto ingresado fue de: $" + retiro + "mxn.",
            icon: "warning",
        });

        vaciarInputDepositar();
        vaciarSaldo();
        vaciarTransaccion();
    } else { // Si todo está bien, realiza el retiro

        saldoActual = saldoMenosRetiro; // Actualiza el saldo actual
        localStorage.setItem(nombre, saldoActual); // Guarda el saldo actualizado en el almacenamiento local
        document.getElementById('transaccion').innerHTML = 'Retiro de: $' + retiro;
        document.getElementById('nuevoSaldo').innerHTML = 'Saldo actual: $' + saldoActual;
    }
}