//variables
const btnEnviar = document.querySelector('#enviar')
const btnReset = document.querySelector('#resetBtn')

const formulario = document.querySelector('#enviar-mail')

//variables para campos
const email = document.querySelector('#email');
const asunto = document.querySelector('#asunto');
const mensaje = document.querySelector('#mensaje');
const er = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


eventListeners();
function eventListeners() {
    document.addEventListener('DOMContentLoaded', iniciarApp);
    email.addEventListener('blur', validarFormulario);
    asunto.addEventListener('blur', validarFormulario);
    mensaje.addEventListener('blur', validarFormulario);
    formulario.addEventListener('submit', enviarEmail );
    btnReset.addEventListener('click', resetearFormulario );
}

//funciones e
function iniciarApp() {
    btnEnviar.disabled = true
    btnEnviar.classList.add('cursor-not-allowed', 'opacity-50')
}
function validarFormulario(e) {


    if(e.target.value !== '') {

        const error = document.querySelector('p.error');
        console.log(e.target.name + 'este campo esta lleno')
        if(e.target.classList.contains('form--error')) {
            e.target.classList.remove('form--error')
            error.remove();
        }
        e.target.classList.add('form--success')

    } else {
        e.target.classList.add('form--error')
        mostrarError('Todos los campos son obligatorios')
    } 

    if(e.target.type === 'email') {

        if( er.test(e.target.value)) {
            console.log(e.target.value)
            const error = document.querySelector('p.error');
            console.log('Email valido')
            if(e.target.classList.contains('form--error')) {
                e.target.classList.remove('form--error')
                error.remove();
            }
            // mostrarError('Este e-mail no es valido')
        } else {
            e.target.classList.add('form--error')
            console.log('E-mail no valido');
            mostrarError('E-mail no valido')


        }

    }
    if(er.test(email.value) && asunto.value !== '' && mensaje.value !== '') {
        console.log('pasaste la validacion')
        btnEnviar.disabled = false ;
        btnEnviar.classList.remove('cursor-not-allowed', 'opacity-50')
    } else {
        console.log('hay campos por validar')
    }


}
//

function mostrarError(mensaje) {
    const mensajeError = document.createElement('p')
    mensajeError.textContent = mensaje;
    mensajeError.classList.add('form--error', 'error')
    
    const errores = document.querySelectorAll('.error')
    if(errores.length === 0) {
        formulario.appendChild(mensajeError)
    }
}

function enviarEmail(e) {
    e.preventDefault()
    const elementoSpinner = document.querySelector('#spinner')
    elementoSpinner.style.display = 'flex'

    setTimeout(() => {
        const parrafo = document.createElement('p');
        parrafo.textContent = 'El mensaje se envio correctamente';
        formulario.insertBefore(parrafo, elementoSpinner);
        elementoSpinner.style.display = 'none'
        resetearFormulario()    
        setTimeout(() => {
            parrafo.remove()
        }, 3000)
    }, 3000)
}

//funcion que resetea el formulario

function resetearFormulario() {
    formulario.reset();
    iniciarApp();
}

