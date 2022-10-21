const lancamentoContainer = document.querySelector('.lancamento-container')
const tbody = document.querySelector('#tbody-lancados')
const data = document.getElementById('input-data')
const descricao = document.getElementById('input-descricao')
const categoria = document.getElementById('input-categoria')
const valor = document.getElementById('input-valor')
const alerta = document.getElementById('alerta')
const options = document.getElementById('input-categoria')
const buscarBD = () => JSON.parse(localStorage.getItem('lancamentos') || '[]')
const editarBD = () => localStorage.setItem('lancamentos', JSON.stringify(itens))
const buscarBDcategoria = () => JSON.parse(localStorage.getItem(categoria.value) || '[]')
const editarBDcategoria = () => localStorage.setItem(categoria.value, JSON.stringify(gastoCat))
let itens
let gastoCat
let id

carregarItens()
function carregarItens() {
    itens = buscarBD()
    gastoCat = buscarBDcategoria()
    tbody.innerHTML = ''
    itens.forEach((item, index) => {
        inserirItemTabela(item, index)

        //Todos os da mesma categoria vão para seu BD
        if (itens.categoria == gastoCat.categoria) {
            gastoCat.push({
                'data': itens.data,
                'descricao': itens.descricao,
                'categoria': itens.categoria,
                'valor': itens.valor
            })
        }
    })





}

function inserirItemTabela(item, index) {
    let tabela = document.createElement('tr')

    //Converter valor de string em número
    let numValor = Number.parseFloat(item.valor).toFixed(2).replace(".", ",")

    tabela.innerHTML = `
    <td>${item.data}</td>
    <td>${item.descricao}</td>
    <td>${item.categoria}</td>
    <td><p class="valores">R$ ${numValor}</p></td>
    <td class="acao">
    <button onclick="editarItem(${index})" class='btn-acao'><i class="fa-solid fa-pen"></i></button>    <button onclick="deletarItem(${index})" class='btn-acao'><i class="fa-solid fa-trash"></i></button>
    </td>`
    tbody.appendChild(tabela)
}

function editarItem(index) {
    abrirJanela(true, index)
}

function deletarItem(index) {
    let confirmar = confirm(`Deseja apagar ${itens[index].descricao} de ${itens[index].categoria}?`)
    if (confirmar == true) {
        itens.splice(index, 1)
        editarBD()
    }
    carregarItens()
}

function abrirJanela(editar = false, index = 0) {
    lancamentoContainer.classList.add('ativo')

    //Fechar ao clicar fora da janela
    lancamentoContainer.onclick = e => {
        if (e.target.className.indexOf('lancamento-container') !== -1) {
            fecharJanela()
        }
    }

    //Colocar todas as categorias no input
    //Buscar as categorias e colocar num array
    const buscarBDcategorias = () => JSON.parse(localStorage.getItem('categorias'))
    let itensCat = buscarBDcategorias()

    //Colocar as categorias do array para o documento
    options.innerHTML = ''
    itensCat.forEach((item) => {
        let categorias = document.createElement('option')
        categorias.innerHTML = `<option value="${item.nome}}">${item.nome}</option>`
        options.appendChild(categorias)
    })

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

function fecharJanela() {
    alerta.innerHTML = ''
    options.innerHTML = ''
    lancamentoContainer.classList.remove('ativo')
}

function lancar() {
    if (data.value == '' || descricao.value == '' || categoria.value == '' || valor.value == '') {
        alerta.innerHTML = ''
        let msgAlerta = document.createElement('p')
        msgAlerta.innerHTML = 'Preencha todos os campos!'
        return alerta.appendChild(msgAlerta)
    }
    alerta.innerHTML = ''

    if (id !== undefined) {
        itens[id].data = data.value
        itens[id].descricao = descricao.value
        itens[id].categoria = categoria.value
        itens[id].valor = valor.value
    } else {
        itens.push({
            'data': data.value,
            'descricao': descricao.value,
            'categoria': categoria.value,
            'valor': valor.value
        })
    }

    editarBD()
    lancamentoContainer.classList.remove('ativo')
    carregarItens()
    id = undefined
}