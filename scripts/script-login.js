const email = document.getElementById('login')
const senha = document.getElementById('senha')
const msg = document.getElementById('msg')

function logar() {
    if (email.value == 'admin' && senha.value == 'admin'){
        return window.alert('OK!')
    } else {
        return window.alert('Usuário e senha incorretos!')
    }
}