const email = document.getElementById('email')
const senha = document.getElementById('senha')
const msg = document.getElementById('msg')
const btnEntrar = document.getElementById('entrar')
let olho = document.getElementById('olho')

email.focus()

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
    let validUsuario = { nome: '', sobrenome: '', email: '', senha: '' }
    let listaUsuarios = []
    listaUsuarios = JSON.parse(localStorage.getItem('listaUsuarios'))
    const bdUsuariosEditar = () => localStorage.setItem('listaUsuarios', JSON.stringify(listaUsuarios))

    //Conferir antes se tem cadastro
    if (listaUsuarios == null) {
        msg.innerHTML = 'Usuário não encontrado!'
    } else {  //Validando
        listaUsuarios.forEach((item) => {
            if (email.value == item.email && senha.value == item.senha) {
                item.logado = true
                validUsuario = {
                    nome: item.nome,
                    sobrenome: item.sobrenome,
                    email: item.email,
                    senha: item.senha,
                }
            }
        })
        bdUsuariosEditar()

        if (email.value == validUsuario.email && senha.value == validUsuario.senha) {
            document.location = 'resumo.html'
        } else if (email.value.length < 1 || senha.value.length < 1) {
            msg.innerHTML = 'Preencha todos os campos!'
            email.focus()
        } else {
            msg.innerHTML = 'Usuário e senha incorretos'
            email.setAttribute('style', 'border: 1px solid var(--cor5)')
            senha.setAttribute('style', 'border: 1px solid var(--cor5)')
            email.focus()
        }
    }
})