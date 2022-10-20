//Tabela Saldos
//Constantes e variáveis
const tbodySaldos = document.getElementById('tbody-saldos')
const janelaSaldo = document.querySelector('.janela-container-saldo')
const alertaSaldo = document.getElementById('alerta-saldo')
const conta = document.getElementById('input-conta')
const valorSaldo = document.getElementById('input-valor-conta')
let itensSaldo
let idSaldo
const buscarBDSaldos = () => JSON.parse(localStorage.getItem('saldos') || '[]')
const editarBDSaldos = () => localStorage.setItem('saldos', JSON.stringify(itensSaldo))

//Funções
carregarItensSaldo()

function carregarItensSaldo() {
    itensSaldo = buscarBDSaldos()
    tbodySaldos.innerHTML = ''
    itensSaldo.forEach((item, index) => {
        inserirItemTabSaldos(item, index)
    })
}

function inserirItemTabSaldos(item, index) {
    let tabela = document.createElement('tr')

    tabela.innerHTML = `
    <td>${item.conta}</td>
    <td>R$ ${item.valorSaldo}</td>
    <td class="acao">
    <button onclick="editarItemSaldo(${index})" class='btn-acao'><i class="fa-solid fa-pen"></i></button>
    <button onclick="deletarItemSaldo(${index})" class='btn-acao'><i class="fa-solid fa-trash"></i></button>
    </td>`
    tbodySaldos.appendChild(tabela)
}

function deletarItemSaldo(index) {
    let confirmar = confirm(`Deseja apagar a conta ${itensSaldo[index].conta} no valor de R$${itensSaldo[index].valorSaldo}?`)
    if (confirmar == true) {
        itensSaldo.splice(index, 1)
        editarBDSaldos()
    }
    carregarItensSaldo()
}

function editarItemSaldo(index) {
    abrirJanelaSaldo(true, index)
}

function abrirJanelaSaldo(editar = false, index = 0) {
    janelaSaldo.classList.add('ativo')

    if (editar) {
        conta.value = itensSaldo[index].conta
        valorSaldo.value = itensSaldo[index].valorSaldo
        idSaldo = index
    } else {
        conta.value = ''
        valorSaldo.value = ''
    }

    //Fechar ao clicar fora da janela
    janelaSaldo.onclick = e => {
        if (e.target.className.indexOf('janela-container-saldo') !== -1) {
            fecharJanelaSaldo()
        }
    }
}

function fecharJanelaSaldo() {
    alertaSaldo.innerHTML = ''
    janelaSaldo.classList.remove('ativo')
}

function lancarSaldo() {
    if (conta.value == '' || valorSaldo.value == '') {
        alertaSaldo.innerHTML = ''
        let msgAlertaSaldo = document.createElement('p')
        msgAlertaSaldo.innerHTML = 'Preencha todos os campos!'
        return alertaSaldo.appendChild(msgAlertaSaldo)
    }
    alertaSaldo.innerHTML = ''

    if (idSaldo !== undefined) {
        itensSaldo[idSaldo].conta = conta.value
        itensSaldo[idSaldo].valorSaldo = valorSaldo.value
    } else {
        itensSaldo.push({
            'conta': conta.value,
            'valorSaldo': valorSaldo.value
        })
    }

    editarBDSaldos()
    janelaSaldo.classList.remove('ativo')
    carregarItensSaldo()
    idSaldo = undefined
}

//Tabela Gastos
//Constantes e variáveis
const tbodyGastos = document.getElementById('tbody-gastos')
const janelaGasto = document.querySelector('.janela-container-gasto')
const alertaGasto = document.getElementById('alerta-gasto')
const descricao = document.getElementById('input-descricao')
const valorGasto = document.getElementById('input-valor-gasto')
let itensGasto
let idGasto
const buscarBDGastos = () => JSON.parse(localStorage.getItem('gastos') || '[]')
const editarBDGastos = () => localStorage.setItem('gastos', JSON.stringify(itensGasto))

//Funções
carregarItensGasto()

function carregarItensGasto() {
    itensGasto = buscarBDGastos()
    tbodyGastos.innerHTML = ''
    itensGasto.forEach((item, index) => {
        inserirItemTabGasto(item, index)
    })
}

function inserirItemTabGasto(item, index) {
    let tabela = document.createElement('tr')

    tabela.innerHTML = `
    <td>${item.descricao}</td>
    <td>R$ ${item.valorGasto}</td>
    <td class="acao">
    <button onclick="editarItemGasto(${index})" class='btn-acao'><i class="fa-solid fa-pen"></i></button>
    <button onclick="deletarItemGasto(${index})" class='btn-acao'><i class="fa-solid fa-trash"></i></button>
    </td>`
    tbodyGastos.appendChild(tabela)
}

function deletarItemGasto(index) {
    let confirmar = confirm(`Deseja apagar ${itensGasto[index].descricao} no valor de R$${itensGasto[index].valorGasto}?`)
    if (confirmar == true) {
        itensGasto.splice(index, 1)
        editarBDGastos()
    }
    carregarItensGasto()
}

function editarItemGasto(index) {
    abrirJanelaGasto(true, index)
}

function abrirJanelaGasto(editar = false, index = 0) {
    janelaGasto.classList.add('ativo')

    if (editar) {
        descricao.value = itensGasto[index].descricao
        valorGasto.value = itensGasto[index].valorGasto
        idGasto = index
    } else {
        descricao.value = ''
        valorGasto.value = ''
    }

    //Fechar ao clicar fora da janela
    janelaGasto.onclick = e => {
        if (e.target.className.indexOf('janela-container-gasto') !== -1) {
            fecharJanelaGasto()
        }
    }
}

function fecharJanelaGasto() {
    alertaGasto.innerHTML = ''
    janelaGasto.classList.remove('ativo')
}

function lancarGasto() {
    if (descricao.value == '' || valorGasto.value == '') {
        alertaGasto.innerHTML = ''
        let msgAlertaGasto = document.createElement('p')
        msgAlertaGasto.innerHTML = 'Preencha todos os campos!'
        return alertaGasto.appendChild(msgAlertaGasto)
    }
    alertaGasto.innerHTML = ''

    if (idGasto !== undefined) {
        itensGasto[idGasto].descricao = descricao.value
        itensGasto[idGasto].valorGasto = valorGasto.value
    } else {
        itensGasto.push({
            'descricao': descricao.value,
            'valorGasto': valorGasto.value
        })
    }

    editarBDGastos()
    janelaGasto.classList.remove('ativo')
    carregarItensGasto()
    idGasto = undefined
}

//Soma Saldos
function somarSaldos() {
    let resSaldos = 0
    const tfootSaldos = document.getElementById('tfoot-saldos')
    let totalSaldos = document.createElement('tr')

    // itensSaldo.forEach((item) => {
    //     item.valorSaldo += resSaldos
    // })

    totalSaldos.innerHTML = `
    <td>Total</td>
    <td>R$ ${resSaldos}</td>
    <td></td>`
    tfootSaldos.appendChild(totalSaldos)
}
somarSaldos()




//Soma Gastos

//Soma Caixa
let resCaixa = 0
let caixa = document.getElementById('caixa')

function carregarCaixa() {
    let msgCaixa = document.createElement('p')
    msgCaixa.innerHTML = `Caixa atual: R$${resCaixa}`
    return caixa.appendChild(msgCaixa)
}
carregarCaixa()
