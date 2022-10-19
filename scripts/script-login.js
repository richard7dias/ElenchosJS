const email = document.getElementById('email')
const senha = document.getElementById('senha')
const msg = document.getElementById('msg')
let olho = document.getElementById('olho')

function logar() {
    if (email.value == 'admin' && senha.value == 'admin') {
        return window.alert('OK!')
    } else {
        return window.alert('Usuário e senha incorretos!')
    }
}

olho.addEventListener('click', () => {
    if (senha.getAttribute('type') == 'password'){
        senha.setAttribute('type', 'text')
    } else {
        senha.setAttribute('type', 'password')
    }
})