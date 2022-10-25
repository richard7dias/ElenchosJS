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

// //Funções para data
// //Constantes e variáveis
// let dataHoje = new Date()

// //Ano atual
// let anoAtual = dataHoje.getFullYear()

// //Mês atual
// let dataMes = dataHoje.getMonth()
// let mesAtual
// switch (dataMes) {
//     case 0:
//         mesAtual = 'Janeiro'
//         break
//     case 1:
//         mesAtual = 'Fevereiro'
//         break
//     case 2:
//         mesAtual = 'Março'
//         break
//     case 3:
//         mesAtual = 'Abril'
//         break
//     case 4:
//         mesAtual = 'Maio'
//         break
//     case 5:
//         mesAtual = 'Junho'
//         break
//     case 6:
//         mesAtual = 'Julho'
//         break
//     case 7:
//         mesAtual = 'Agosto'
//         break
//     case 8:
//         mesAtual = 'Setembro'
//         break
//     case 9:
//         mesAtual = 'Outubro'
//         break
//     case 10:
//         mesAtual = 'Novembro'
//         break
//     case 11:
//         mesAtual = 'Dezembro'
//         break
// }

