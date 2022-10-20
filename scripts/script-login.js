const email = document.getElementById('email')
const senha = document.getElementById('senha')
const msg = document.getElementById('msg')
const btnEntrar = document.getElementById('entrar')
let olho = document.getElementById('olho')

//Mostrar senha
olho.addEventListener('click', () => {
    if (senha.getAttribute('type') == 'password') {
        senha.setAttribute('type', 'text')
    } else {
        senha.setAttribute('type', 'password')
    }
})

//Entrar
btnEntrar.addEventListener('click', () => {
    let listaUsuarios = []
    let validUsuario = { nome: '', sobrenome: '', email: '', senha: '' }

    listaUsuarios = JSON.parse(localStorage.getItem('listaUsuarios'))

    listaUsuarios.forEach((item) => {
        if (email.value == item.email && senha.value == item.senha) {
            validUsuario = {
                nome: item.nome,
                sobrenome: item.sobrenome,
                email: item.email,
                senha: item.senha
            }
        }
    })

    if (email.value.length < 1 || senha.value.length < 1) {
        msg.innerHTML = 'Preencha todos os campos!'
    } else if (email.value == validUsuario.email && senha.value == validUsuario.senha) {
        alert(`Olá, ${validUsuario.nome}!`)
        window.location.href = 'lancar-gasto.html'
    } else {
        msg.innerHTML = 'Usuário e senha incorretos'
        email.setAttribute('style', 'border: 1px solid var(--cor5)')
        senha.setAttribute('style', 'border: 1px solid var(--cor5)')
        email.focus()
    }
})