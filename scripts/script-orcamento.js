const novCatJanela = document.querySelector('.nova-categoria-janela')
const tbody = document.querySelector('#tbody-orcamento')
const nome = document.getElementById('input-nome')
const orcamento = document.getElementById('input-orcamento')
const alerta = document.getElementById('alerta')
const buscarBD = () => JSON.parse(localStorage.getItem('categorias') || '[]')
const editarBD = () => localStorage.setItem('categorias', JSON.stringify(itens))
let itens
let id

carregarItens()
function carregarItens() {
    itens = buscarBD()
    tbody.innerHTML = ''
    itens.forEach((item, index) => {
        inserirItemTabela(item, index)
    })
    somarTfoot()
}

function inserirItemTabela(item, index) {
    let tabela = document.createElement('tr')

    //Converter valor de string em número
    let numOrcamento = Number.parseFloat(item.orcamento).toFixed(2).replace(".", ",")

    tabela.innerHTML = `
    <td>${item.nome}</td>
    <td><p class="valores">R$ ${numOrcamento}</p></td>
    <td>gasto</td>
    <td>disponivel</td>
    <td class="acao">
    <button onclick="editarItem(${index})" class='btn-acao'><i class="fa-solid fa-pen"></i></button>
    <button onclick="deletarItem(${index})" class='btn-acao'><i class="fa-solid fa-trash"></i></button>
    </td>`
    tbody.appendChild(tabela)
}

function deletarItem(index) {
    let confirmar = confirm(`Deseja apagar a categoria ${itens[index].nome}?`)
    if (confirmar == true) {
        itens.splice(index, 1)
        editarBD()
    }
    carregarItens()
}

function editarItem(index) {
    abrirJanela(true, index)
}

function abrirJanela(editar = false, index = 0) {
    novCatJanela.classList.add('ativo')

    //Fechar ao clicar fora da janela
    novCatJanela.onclick = e => {
        if (e.target.className.indexOf('nova-categoria-janela') !== -1) {
            fecharJanela()
        }
    }

    if (editar) {
        nome.value = itens[index].nome
        orcamento.value = itens[index].orcamento
        id = index
    } else {
        nome.value = ''
        orcamento.value = ''
    }
}

function fecharJanela() {
    alerta.innerHTML = ''
    novCatJanela.classList.remove('ativo')
}

function lancar() {
    if (nome.value == '' || orcamento.value == '') {
        alerta.innerHTML = ''
        let msgAlerta = document.createElement('p')
        msgAlerta.innerHTML = 'Preencha todos os campos!'
        return alerta.appendChild(msgAlerta)
    }
    alerta.innerHTML = ''

    if (id !== undefined) {
        itens[id].nome = nome.value
        itens[id].orcamento = orcamento.value
    } else {
        itens.push({
            'nome': nome.value,
            'orcamento': orcamento.value
        })
    }

    editarBD()
    novCatJanela.classList.remove('ativo')
    carregarItens()
    id = undefined
}

//Soma tfoot
function somarTfoot() {
    const tfoot = document.getElementById('tfoot-orcamento')
    let resOrcamento = 0
    let valoresOrcamento = []
    let totalOrcamento = document.createElement('tr')
    let itensOrcamento = buscarBD()

    //Colocar todos os valores no array e transformar em número
    itensOrcamento.forEach((item) => {
        valoresOrcamento.push(Number.parseFloat(item.orcamento))
    })

    //Somar todos os numeros do array
    for (let i = 0; i < valoresOrcamento.length; i++) {
        resOrcamento += valoresOrcamento[i]
    }

    //Escrever no tfoot o resultado da soma
    tfoot.innerHTML = ''
    inserirSomaTab()
    function inserirSomaTab() {
        totalOrcamento.innerHTML = `
        <td>Totais</td>
        <td><p class="valores">R$ ${resOrcamento.toFixed(2).replace(".", ",")}</p></td>
        <td><p class="valores">R$ 0</p></td>
        <td><p class="valores">R$ 0</p></td>
        <td></td>`
        tfoot.appendChild(totalOrcamento)
    }
}