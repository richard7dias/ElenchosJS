const nome = document.getElementById('nome')
const sobrenome = document.getElementById('sobrenome')
const email = document.getElementById('email')
const senha = document.getElementById('senha')
const confSenha = document.getElementById('conf-senha')
const msgSenha = document.getElementById('msg-senha')
const msgConfSenha = document.getElementById('msg-confi-senha')
const footer = document.querySelector('footer')
const olho1 = document.getElementById('olho1')
const olho2 = document.getElementById('olho2')
const msgFinal = document.getElementById('msg')
const btnCadastar = document.getElementById('cadastrar')
let validNome = false
let validSobrenome = false
let validEmail = false
let validSenha = false
let validConfSenha = false
const listaUsuarios = JSON.parse(localStorage.getItem('listaUsuarios') || '[]')


//Visualizar senhas
olho1.addEventListener('click', () => {
    if (senha.getAttribute('type') == 'password') {
        senha.setAttribute('type', 'text')
    } else {
        senha.setAttribute('type', 'password')
    }
})
olho2.addEventListener('click', () => {
    if (confSenha.getAttribute('type') == 'password') {
        confSenha.setAttribute('type', 'text')
    } else {
        confSenha.setAttribute('type', 'password')
    }
})

//Validação dos campos
//Campo Nome digitado
nome.addEventListener('keyup', () => {
    if (nome.value.length < 1) {
        nome.setAttribute('style', 'border: 1px solid var(--cor5)')
        validNome = false
    } else {
        nome.setAttribute('style', 'border: none')
        validNome = true
    }
})

//Campo Sobrenome digitado
sobrenome.addEventListener('keyup', () => {
    if (sobrenome.value.length < 1) {
        sobrenome.setAttribute('style', 'border: 1px solid var(--cor5)')
        validSobrenome = false
    } else {
        sobrenome.setAttribute('style', 'border: none')
        validSobrenome = true
    }
})

//Campo Email digitado
email.addEventListener('keyup', () => {
    if (email.value.length < 1) {
        email.setAttribute('style', 'border: 1px solid var(--cor5)')
        validEmail = false
    } else {
        email.setAttribute('style', 'border: none')
        validEmail = true
    }
})

//Tamanho da senha e validaçao do campo
senha.addEventListener('keyup', () => {
    if (senha.value.length < 6) {
        msgSenha.innerHTML = 'A senha deve ter no mínimo 6 caracteres'
        senha.setAttribute('style', 'border: 1px solid var(--cor5)')
        validSenha = false
    } else {
        msgSenha.innerHTML = ''
        senha.setAttribute('style', 'border: none')
        validSenha = true
    }
})

//Confirmação do campo confSenha e senhas iguais
confSenha.addEventListener('keyup', () => {
    if (confSenha.value.length < 1) {
        confSenha.setAttribute('style', 'border: 1px solid var(--cor5)')
        validConfSenha = false
    } else {
        if (senha.value != confSenha.value) {
            msgConfSenha.innerHTML = 'As senhas não conferem'
            confSenha.setAttribute('style', 'border: 1px solid var(--cor5)')
            validConfSenha = false
        } else {
            msgConfSenha.innerHTML = ''
            confSenha.setAttribute('style', 'border: none')
            validConfSenha = true
        }
    }
})

//Cadastrar form
btnCadastar.addEventListener('click', () => {
    //Campos preenchidos e com senhas validadas
    if (validNome == false || validSobrenome == false || validEmail == false || validSenha == false || validConfSenha == false) {
        msgFinal.innerHTML = 'Preencha todos os campos corretamente!'
    } else {
        listaUsuarios.push({
            'nome': nome.value,
            'sobrenome': sobrenome.value,
            'email': email.value,
            'senha': senha.value
        })
        localStorage.setItem('listaUsuarios', JSON.stringify(listaUsuarios))

        let confirmar = confirm(`${nome.value}, seu cadastro foi feito com sucesso!`)
        if (confirmar == true) {
            window.location.href = 'index.html'
        } else {
            window.location.href = 'nova-conta.html'
        }
    }
})
