const email = document.getElementById('email')
const senha = document.getElementById('senha')
const msg = document.getElementById('msg')

function logar() {
    if (email.value == 'admin' && senha.value == 'admin') {
        return window.alert('OK!')
    } else {
        return window.alert('Usuário e senha incorretos!')
    }
}