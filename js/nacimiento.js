export function valida(input){
    const tipoDeInput= input.dataset.tipo;
    if(validadores[tipoDeInput]){
        validadores[tipoDeInput](input);

    }
    console.log(input.parentElement);
    if(input.validity.valid){
        input.parentElement.classList.remove("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML='';
    }else{
        input.parentElement.classList.add("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML = mostrarMensajeError(tipoDeInput,input);
    }
    
}
const tipoErrores=[
    'valueMissing',
    'typeMismatch',
    'patternMismatch',
    'customError'
];
const mensajesError={
    nombre:{
        valueMissing:"Este campo no puede estar vacío"
    },
    email:{
        valueMissing:"Este campo no puede estar vacío",
        typeMismatch: "El correo no es valido"
    },
    password:{
        valueMissing:"Este campo no puede estar vacío",
        patternMismatch: "Al menos 6 caracteres, maximo 12, una mayuscula, una minuscula, un numero y sin caracteres especiales"
    },
    nacimiento:{
        valueMissing:"Este campo no puede estar vacío",
        customError:"debes tener al menos 18 años de edad"
    }

}
const validadores ={
    nacimiento:(input) => validarNacimiento(input),

};

function mostrarMensajeError(tipoDeInput,input){
    let mensaje='';
    tipoErrores.forEach(error => {
        if(input.validity[error]){
            console.log(input.validity[error]);
            console.log(mensajesError[tipoErrores][error]);
            mensaje=mensajesError[tipoDeInput][error];
        }
    });

    return mensaje;
};
function validarNacimiento(input){
    const fechaCliente=new Date(input.value);
    let mensaje='';

    if(!mayorEdad(fechaCliente)){
        mensaje="debes tener al menos 18 años de edad";
    }

    input.setCustomValidity(mensaje);
};

function mayorEdad(fecha){
    const fechaActual=new Date();
    const diferenciaFechas =new Date(fecha.getUTCFullYear() + 18,
     fecha.getUTCMonth(),
     fecha.getUTCDate()
     );
    return  diferenciaFechas<= fechaActual;
}