let nome = document.getElementById('nome')
let sobrenome = document.getElementById('sobrenome')
let email = document.getElementById('email')
let senha = document.getElementById('senha')

/*
function cadastrar() {
    return window.alert(`Cadastrado com sucesso! Seu nome é ${nome.value} ${sobrenome.value}, seu email para login é ${email.value} e sua senha é ${senha.value}.`)
}
*/





const campos = document.querySelectorAll("[required]")

function ValidateField(campo) {
    // logica para verificar se existem erros
    function verifyErrors() {
        let foundError = false;

        for(let error in campo.validity) {
            // se não for customError
            // então verifica se tem erro
            if (campo.validity[error] && !campo.validity.valid ) {
                foundError = error
            }
        }
        return foundError;
    }

    function customMessage(typeError) {
        const messages = {
            text: {
                valueMissing: "Por favor, preencha este campo"
            },
            email: {
                valueMissing: "Email é obrigatório",
                typeMismatch: "Por favor, preencha um email válido"
            }
        }

        return messages[campo.type][typeError]
    }

    function setCustomMessage(message) {
        const spanError = campo.parentNode.querySelector("span.error")
        
        if (message) {
            spanError.classList.add("active")
            spanError.innerHTML = message
        } else {
            spanError.classList.remove("active")
            spanError.innerHTML = ""
        }
    }

    return function() {

        const error = verifyErrors()

        if(error) {
            const message = customMessage(error)

            campo.style.borderColor = "red"
            setCustomMessage(message)
        } else {
            campo.style.borderColor = "green"
            setCustomMessage()
        }
    }
}


function customValidation(event) {

    const campo = event.target
    const validation = ValidateField(campo)

    validation()

}

for(campo of campos ){
    campo.addEventListener("invalid", event => { 
        // eliminar o bubble
        event.preventDefault()

        customValidation(event)
    })
    campo.addEventListener("blur", customValidation)
}


document.querySelector("form")
.addEventListener("submit", event => {
    console.log("enviar o formulário")

    // não vai enviar o formulário
    event.preventDefault()
})