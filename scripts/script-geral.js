//Banco de dados
const bdUsuariosBuscar = () => JSON.parse(localStorage.getItem('listaUsuarios'))
const bdUsuariosEditar = () => localStorage.setItem('listaUsuarios', JSON.stringify(usuarios))
let usuarios = bdUsuariosBuscar()

//Constantes e variáveis gerais
let logNome
let logSobrenome
let logEmail
let logSenha

//Autenticação de login aberto
//Caso não haja cadastros no BD
if (usuarios == null) {
    window.location.href = 'index.html'
}

//Autenticando login
carregarUsuário()
function carregarUsuário() {
    usuarios.forEach((item) => {
        if (item.logado == true) {
            logNome = item.nome
            logSobrenome = item.sobrenome
            logEmail = item.email
            logSenha = item.senha
        }
    })
}

//Se não encontrar alguém logado, voltar à pag de login
if (logNome == undefined) {
    window.location.href = 'index.html'
}

//Menu lateral
//Constantes e variáveis
const barraLateral = document.getElementById('barra-lateral')
const menuLoginFundo = document.querySelector('.menu-login-fundo')
const infos = document.getElementById('infos-logado')
const inputsEdicao = document.getElementById('inputs-edicao')
let inputNome
let inputSobrenome
let inputEmail
let inputSenhaAntiga
let inputNovaSenha
let inputConfSenha
let validSenha = false
let validConfSenha = false
let validSenhaAntiga = false
let msgSenha
let olho1
let olho2
let olho3

//Escrever dados do usuário na barra lateral
function dadosLogado() {
    inputsEdicao.innerHTML = ''
    infos.innerHTML = `
    <h3>Olá, ${logNome}!</h3>
    <p>${logEmail}</p>
    `
}

//Editar dados Logado
function inputsEditar() {
    inputsEdicao.innerHTML = `
    <p>Primeiro nome</p>
    <input class="input" id="inp-nome" type="text"></input>
    <p>Sobrenome</p>
    <input class="input" id="inp-sobrenome" type="text"></input>
    <p>Email</p>
    <input class="input" id="imp-email" type="text"></input>
    <button class="botoes" id="btn-editado" onclick="editar()">Editar</button>
    <button id="btn-deletar" onclick="deletarPerfil()">Deletar Perfil</button>
    `

    inputNome = document.getElementById('inp-nome')
    inputSobrenome = document.getElementById('inp-sobrenome')
    inputEmail = document.getElementById('imp-email')

    //Deixar escrito nos inputs as infos atuais
    inputNome.value = logNome
    inputSobrenome.value = logSobrenome
    inputEmail.value = logEmail
}

function editar() {
    usuarios.forEach((item) => {
        if (item.logado == true) {
            item.nome = inputNome.value
            item.sobrenome = inputSobrenome.value
            item.email = inputEmail.value
        }
    })

    bdUsuariosEditar()
    carregarUsuário()
    dadosLogado()

    //Escrever confirmação da edição e apagar msg depois de 3 segundos
    inputsEdicao.innerHTML = '<p>Dados atualizados!<p/>'
    setTimeout(function () {
        inputsEdicao.innerHTML = ''
    }, 3000);
}

function deletarPerfil() {
    let confirmar = confirm(`Deseja apagar o perfil de ${logNome} ${logSobrenome}, com o email ${logEmail}?`)
    if (confirmar == true) {
        usuarios.forEach((item, index) => {
            if (item.logado == true) {
                usuarios.splice(index, 1)
                window.location.href = "index.html"
            }
        })
        bdUsuariosEditar()
    }
}

function inputsSenha() {
    inputsEdicao.innerHTML = `
    <p>Senha antiga</p>
    <div class="senhas">
        <input id="imp-senha-antiga" type="password"></input>
        <i class="fa-solid fa-eye" id="olho1"></i>
    </div>
    <p>Nova senha</p>
    <div class="senhas">
        <input id="inp-nova-senha" type="password"></input>
        <i class="fa-solid fa-eye" id="olho2"></i>
    </div>
    <p>Confirme a nova senha</p>
    <div class="senhas">
        <input id="inp-conf-senha" type="password"></input>
        <i class="fa-solid fa-eye" id="olho3"></i>
    </div><br>
    <div id="msg-senha"></div>
    <button class="botoes" id="btn-editado" onclick="mudarSenha()">Editar</button>
    `

    inputSenhaAntiga = document.getElementById('imp-senha-antiga')
    inputNovaSenha = document.getElementById('inp-nova-senha')
    inputConfSenha = document.getElementById('inp-conf-senha')
    msgSenha = document.getElementById('msg-senha')
    olho1 = document.getElementById('olho1')
    olho2 = document.getElementById('olho2')
    olho3 = document.getElementById('olho3')
    inputSenhaAntiga.focus()

    //Visualizar senhas
    olho1.addEventListener('click', () => {
        if (inputSenhaAntiga.getAttribute('type') == 'password') {
            inputSenhaAntiga.setAttribute('type', 'text')
        } else {
            inputSenhaAntiga.setAttribute('type', 'password')
        }
    })
    olho2.addEventListener('click', () => {
        if (inputNovaSenha.getAttribute('type') == 'password') {
            inputNovaSenha.setAttribute('type', 'text')
        } else {
            inputNovaSenha.setAttribute('type', 'password')
        }
    })
    olho3.addEventListener('click', () => {
        if (inputConfSenha.getAttribute('type') == 'password') {
            inputConfSenha.setAttribute('type', 'text')
        } else {
            inputConfSenha.setAttribute('type', 'password')
        }
    })

    //Validação da senha antiga
    inputSenhaAntiga.addEventListener('keyup', () => {
        if (inputSenhaAntiga.value == logSenha) {
            validSenhaAntiga = true
        } else {
            validSenhaAntiga = false
        }
    })

    //Tamanho da senha e validaçao do campo
    inputNovaSenha.addEventListener('keyup', () => {
        if (inputNovaSenha.value.length < 6) {
            msgSenha.setAttribute('style', 'display: block')
            msgSenha.innerHTML = 'A senha deve ter no mínimo 6 caracteres'
            inputNovaSenha.setAttribute('style', 'border: 1px solid var(--cor5)')
            validSenha = false
        } else {
            msgSenha.setAttribute('style', 'display: none')
            msgSenha.innerHTML = ''
            inputNovaSenha.setAttribute('style', 'border: none')
            validSenha = true
        }
    })

    //Confirmação do campo confSenha e senhas iguais
    inputConfSenha.addEventListener('keyup', () => {
        if (inputConfSenha.value.length < 1) {
            inputConfSenha.setAttribute('style', 'border: 1px solid var(--cor5)')
            validConfSenha = false
        } else {
            if (inputConfSenha.value != inputNovaSenha.value) {
                msgSenha.setAttribute('style', 'display: block')
                msgSenha.innerHTML = 'As senhas não conferem'
                inputConfSenha.setAttribute('style', 'border: 1px solid var(--cor5)')
                validConfSenha = false
            } else {
                msgSenha.setAttribute('style', 'display: none')
                msgSenha.innerHTML = ''
                inputConfSenha.setAttribute('style', 'border: none')
                validConfSenha = true
            }
        }
    })
}

function mudarSenha() {
    if (inputSenhaAntiga.value == false || inputNovaSenha.value == false || inputConfSenha.value == false) {
        msgSenha.setAttribute('style', 'display: block')
        msgSenha.innerHTML = 'Preencha todos os campos corretamente!'
        inputSenhaAntiga.setAttribute('style', 'border: 1px solid var(--cor5)')
        inputNovaSenha.setAttribute('style', 'border: 1px solid var(--cor5)')
        inputConfSenha.setAttribute('style', 'border: 1px solid var(--cor5)')
        inputSenhaAntiga.focus()
    } else if (validSenhaAntiga == false) {
        msgSenha.setAttribute('style', 'display: block')
        msgSenha.innerHTML = 'Senha antiga incorreta'
        inputSenhaAntiga.setAttribute('style', 'border: 1px solid var(--cor5)')
        inputSenhaAntiga.focus()
    } else if (validSenhaAntiga == true && validSenha == true && validConfSenha == true) {
        usuarios.forEach((item) => {
            if (item.logado == true) {
                item.senha = inputNovaSenha.value
            }
        })

        bdUsuariosEditar()
        carregarUsuário()
        dadosLogado()

        //Escrever confirmação da edição e apagar msg depois de 3 segundos
        inputsEdicao.innerHTML = '<p>Senha atualizada!<p/>'
        setTimeout(function () {
            inputsEdicao.innerHTML = ''
        }, 3000);
    }
}

function abrirMenuLogin() {
    //Abrir barra menu
    barraLateral.setAttribute('style', 'display: none')
    menuLoginFundo.setAttribute('style', 'display: block')

    //Fechar ao clicar fora do menu
    menuLoginFundo.onclick = e => {
        if (e.target.className.indexOf('menu-login-fundo') !== -1) {
            fecharMenuLogin()
        }
    }
    dadosLogado()
}

function fecharMenuLogin() {
    barraLateral.setAttribute('style', 'display: block')
    menuLoginFundo.setAttribute('style', 'display: none')
}

function logout() {
    usuarios.forEach((item) => {
        if (item.logado == true) {
            item.logado = false
        }
        bdUsuariosEditar()
    })
    window.location.href = 'index.html'
}