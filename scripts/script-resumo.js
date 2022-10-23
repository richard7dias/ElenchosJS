//Acesso Banco de dados
const buscarBDSaldos = () => JSON.parse(localStorage.getItem('saldos') || '[]')
const editarBDSaldos = () => localStorage.setItem('saldos', JSON.stringify(itensSaldo))
const buscarBDGastos = () => JSON.parse(localStorage.getItem('gastos') || '[]')
const editarBDGastos = () => localStorage.setItem('gastos', JSON.stringify(itensGasto))
const buscarBDcat = () => JSON.parse(localStorage.getItem('categorias') || '[]')

//Variáveis gerais
let resDisp = 0

//Constantes e variáveis Tabela Saldos
const tbodySaldos = document.getElementById('tbody-saldos')
const janelaSaldo = document.querySelector('.janela-container-saldo')
const alertaSaldo = document.getElementById('alerta-saldo')
const conta = document.getElementById('input-conta')
const valorSaldo = document.getElementById('input-valor-conta')
let itensSaldo
let idSaldo

//Constantes e variáveis Tabela Gastos
const tbodyGastos = document.getElementById('tbody-gastos')
const janelaGasto = document.querySelector('.janela-container-gasto')
const alertaGasto = document.getElementById('alerta-gasto')
const descricao = document.getElementById('input-descricao')
const valorGasto = document.getElementById('input-valor-gasto')
let itensGasto
let idGasto

//Funções Tabela Saldos
carregarItensSaldo()
function carregarItensSaldo() {
    itensSaldo = buscarBDSaldos()
    tbodySaldos.innerHTML = ''
    itensSaldo.forEach((item, index) => {
        inserirItemTabSaldos(item, index)
    })
    somarSaldos()
    carregarCaixa()
}

function inserirItemTabSaldos(item, index) {
    let tabela = document.createElement('tr')

    //Converter valor de string em número
    let numSaldo = Number.parseFloat(item.valorSaldo).toFixed(2).replace(".", ",")

    tabela.innerHTML = `
    <td>${item.conta}</td>
    <td><p class="valores">R$ ${numSaldo}</p></td>
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




//Funções Tabela Gastos
carregarItensGasto()
function carregarItensGasto() {
    itensGasto = buscarBDGastos()
    tbodyGastos.innerHTML = ''
    inserirTabGastMes()
    itensGasto.forEach((item, index) => {
        inserirItemTabGasto(item, index)
    })
    somarGastos()
    carregarCaixa()
}

function inserirTabGastMes() {
    //Somar mês atual disponível
    let BDcategorias = buscarBDcat()
    let valoresDisp = []
    //Colocar todos os valores no array e transformar em número
    BDcategorias.forEach((item) => {
        valoresDisp.push(Number.parseFloat(item.disponivel))
    })
    //Somar todos os numeros do array
    for (let i = 0; i < valoresDisp.length; i++) {
        resDisp += valoresDisp[i]
    }

    //Escrever no tbodyGastos para ficar sempre fixo
    let tabela = document.createElement('tr')
    tabela.innerHTML = `
    <td><p>Mês Atual</p></td>
    <td><p class="valores">R$ ${resDisp.toFixed(2).replace(".", ",")}</p></td>
    <td class="acao"></td>`
    tbodyGastos.appendChild(tabela)
}

function inserirItemTabGasto(item, index) {
    let tabela = document.createElement('tr')

    //Converter valor de string em número
    let numGasto = Number.parseFloat(item.valorGasto).toFixed(2).replace(".", ",")

    tabela.innerHTML = `
    <td>${item.descricao}</td>
    <td><p class="valores">R$ ${numGasto}</p></td>
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
    const tfootSaldos = document.getElementById('tfoot-saldos')
    let resSaldos = 0
    let valoresSaldo = []
    let totalSaldos = document.createElement('tr')
    itensSaldo = buscarBDSaldos()

    //Colocar todos os valores no array e transformar em número
    itensSaldo.forEach((item) => {
        valoresSaldo.push(Number.parseFloat(item.valorSaldo))
    })

    //Somar todos os numeros do array
    for (let i = 0; i < valoresSaldo.length; i++) {
        resSaldos += valoresSaldo[i]
    }

    //Escrever no tfoot o resultado da soma
    tfootSaldos.innerHTML = ''
    inserirSomaTab()
    function inserirSomaTab() {
        totalSaldos.innerHTML = `
        <td>Total</td>
        <td>R$ <p class="valores">${resSaldos.toFixed(2).replace(".", ",")}</p></td>
        <td></td>`
        tfootSaldos.appendChild(totalSaldos)
    }
}

//Soma Gastos
function somarGastos() {
    const tfootGastos = document.getElementById('tfoot-gastos')
    let resInicialGastos = 0
    let resGastos = 0
    let valoresGastos = []
    let totalGasto = document.createElement('tr')
    itensGasto = buscarBDGastos()

    //Colocar todos os valores no array e transformar em número
    itensGasto.forEach((item) => {
        valoresGastos.push(Number.parseFloat(item.valorGasto))
    })

    //Somar todos os numeros do array
    for (let i = 0; i < valoresGastos.length; i++) {
        resInicialGastos += valoresGastos[i]
    }

    //Somar array com mês atual
    resGastos = resInicialGastos + resDisp

    //Escrever no tfoot o resultado da soma
    tfootGastos.innerHTML = ''
    inserirSomaTabGast()
    function inserirSomaTabGast() {
        totalGasto.innerHTML = `
        <td>Total</td>
        <td>R$ <p class="valores">${resGastos.toFixed(2).replace(".", ",")}</p></td>
        <td></td>`
        tfootGastos.appendChild(totalGasto)
    }
}

function carregarCaixa() {
    //Carregar a soma saldos
    let resSaldos = 0
    let valoresSaldo = []
    itensSaldo = buscarBDSaldos()
    //Colocar todos os valores no array e transformar em número
    itensSaldo.forEach((item) => {
        valoresSaldo.push(Number.parseFloat(item.valorSaldo))
    })
    //Somar todos os numeros do array
    for (let i = 0; i < valoresSaldo.length; i++) {
        resSaldos += valoresSaldo[i]
    }

    //Carregar a soma gastos
    let resInicialGastos = 0
    let resGastos = 0
    let valoresGastos = []
    itensGasto = buscarBDGastos()
    //Colocar todos os valores no array e transformar em número
    itensGasto.forEach((item) => {
        valoresGastos.push(Number.parseFloat(item.valorGasto))
    })
    //Somar todos os numeros do array
    for (let i = 0; i < valoresGastos.length; i++) {
        resInicialGastos += valoresGastos[i]
    }
    //Somar array com mês atual
    resGastos = resInicialGastos + resDisp


    //Saldos menos gastos
    let resCaixa = resSaldos - resGastos

    //Escrever resultado do caixa
    let caixa = document.getElementById('caixa')
    caixa.innerHTML = ''
    iserirCaixa()
    function iserirCaixa() {
        let msgCaixa = document.createElement('p')
        msgCaixa.innerHTML = `Caixa atual: <p id="valor-caixa"> R$ ${resCaixa.toFixed(2).replace(".", ",")}</p>`
        caixa.appendChild(msgCaixa)
    }

    //Letra vermelha se caixa for negativo
    if (resCaixa < 0) {
        const valorCaixa = document.getElementById('valor-caixa')
        valorCaixa.setAttribute('style', 'color: var(--cor5)')
    }
}