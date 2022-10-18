let nome = document.getElementById('nome')
let sobrenome = document.getElementById('sobrenome')
let email = document.getElementById('email')
let senha = document.getElementById('senha')

function cadastrar() {
    return window.alert(`Cadastrado com sucesso! Seu nome é ${nome.value} ${sobrenome.value}, seu email para login é ${email.value} e sua senha é ${senha.value}.`)
}