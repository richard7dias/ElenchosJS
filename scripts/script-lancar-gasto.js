const lancamentoContainer = document.querySelector('.lancamento-container')
const tbody = document.querySelector('tbody')
const data = document.getElementById('input-data')
const descricao = document.getElementById('input-descricao')
const categoria = document.getElementById('input-categoria')
const valor = document.getElementById('input-valor')
const btnLancar = document.getElementById('btn-lancar')
const alerta = document.getElementById('alerta')
let itens
let id

function abrirLancamento(editar = false, index = 0) {
    lancamentoContainer.classList.add('ativo')

    lancamentoContainer.onclick = e => {
        if (e.target.className.indexOf('lancamento-container') !== -1) {
            fechaJanela()
        }
    }

    if (editar) {
        data.value = itens[index].data
        descricao.value = itens[index].descricao
        categoria.value = itens[index].categoria
        valor.value = itens[index].valor
        id = index
    } else {
        data.value = ''
        descricao.value = ''
        categoria.value = ''
        valor.value = ''
    }
}

function fechaJanela() {
    lancamentoContainer.classList.remove('ativo')
}

function editarItem(index) {

    abrirLancamento(true, index)
}

function deletaItem(index) {
    itens.splice(index, 1)
    setItensBD()
    loadItens()
}

function insereItem(item, index) {
    let tr = document.createElement('tr')

    tr.innerHTML = `
    <td>${item.data}</td>
    <td>${item.descricao}</td>
    <td>${item.categoria}</td>
    <td>R$ ${item.valor}</td>
    <td class="acao">
    <button onclick="editarItem(${index})" class='btn-acao'><i class="fa-solid fa-pen"></i></button>    <button onclick="deletaItem(${index})" class='btn-acao'><i class="fa-solid fa-trash"></i></button>
    </td>`
    tbody.appendChild(tr)
}

btnLancar.onclick = e => {

    if (data.value == '' || descricao.value == '' || categoria.value == '' || valor.value == '') {
        let msgAlerta = document.createElement('p')
        msgAlerta.innerHTML = 'Preencha todos os campos!'
        return alerta.appendChild(msgAlerta)
    }

    e.preventDefault(); //para não executar nada do botão de origem

    if (id !== undefined) {
        itens[id].data = data.value
        itens[id].descricao = descricao.value
        itens[id].categoria = categoria.value
        itens[id].valor = valor.value
    } else {
        itens.push({ 'data': data.value, 'descricao': descricao.value, 'categoria': categoria.value, 'valor': valor.value })
    }

    setItensBD()

    lancamentoContainer.classList.remove('ativo')
    loadItens()
    id = undefined
}

function loadItens() {
    itens = getItensBD()
    tbody.innerHTML = ''
    itens.forEach((item, index) => {
        insereItem(item, index)
    })

}

const getItensBD = () => JSON.parse(localStorage.getItem('dbfunc')) ?? []
const setItensBD = () => localStorage.setItem('dbfunc', JSON.stringify(itens))

loadItens()