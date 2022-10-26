//Menu lateral
//Constantes e variáveis
const barraLateral = document.getElementById('barra-lateral')
const menuLoginFundo = document.querySelector('.menu-login-fundo')

//Funções
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
}

function fecharMenuLogin() {
    barraLateral.setAttribute('style', 'display: block')
    menuLoginFundo.setAttribute('style', 'display: none')
}

