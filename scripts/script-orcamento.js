const novCatJanela = document.querySelector('.nova-categoria-janela')
const tbody = document.querySelector('#tbody-orcamento')
const caption = document.querySelector('#caption')
const nome = document.getElementById('input-nome')
const orcamento = document.getElementById('input-orcamento')
const alerta = document.getElementById('alerta')
const buscarBDcat = () => JSON.parse(localStorage.getItem('categorias') || '[]')
const editarBDcat = () => localStorage.setItem('categorias', JSON.stringify(itens))
const buscarBDlan = () => JSON.parse(localStorage.getItem('lancamentos') || '[]')
const editarBDlan = () => localStorage.setItem('lancamentos', JSON.stringify(lancamentos))
let itens
let id
let lancamentos
let resDisponivel

//Descobrir data atual
let dataHoje = new Date()
let dataAno = dataHoje.getFullYear()
let dataMes = dataHoje.getMonth() + 1
let mesAtual
carregarMesAtual()
function carregarMesAtual() {
    switch (dataMes) {
        case 1:
            mesAtual = 'Janeiro'
            break
        case 2:
            mesAtual = 'Fevereiro'
            break
        case 3:
            mesAtual = 'Março'
            break
        case 4:
            mesAtual = 'Abril'
            break
        case 5:
            mesAtual = 'Maio'
            break
        case 6:
            mesAtual = 'Junho'
            break
        case 7:
            mesAtual = 'Julho'
            break
        case 8:
            mesAtual = 'Agosto'
            break
        case 9:
            mesAtual = 'Setembro'
            break
        case 10:
            mesAtual = 'Outubro'
            break
        case 11:
            mesAtual = 'Novembro'
            break
        case 12:
            mesAtual = 'Dezembro'
            break
    }
    //Escrever na tela o mês
    caption.innerHTML = `Orçamento de ${mesAtual} de ${dataAno}`
}

carregarItens()
function carregarItens() {
    buscarBDlan()
    itens = buscarBDcat()
    tbody.innerHTML = ''
    itens.forEach((item, index) => {
        somarGasto(item, index)
        somarDisponivel(item, index)
        inserirItemTabela(item, index)
    })
    somarTfoot()
}

function inserirItemTabela(item, index) {
    let tabela = document.createElement('tr')

    //Converter valor de string em número e os que já são números colocar o float2
    let numOrcamento = Number.parseFloat(item.orcamento).toFixed(2).replace(".", ",")
    let numGasto = item.gasto.toFixed(2).replace(".", ",")
    let numDisponivel = (item.disponivel).toFixed(2).replace(".", ",")

    //Escrever no documento
    tabela.innerHTML = `
    <td>${item.nome}</td>
    <td><p class="valores">R$ ${numOrcamento}</p></td>
    <td><p class="gasto">R$ ${numGasto}</p></td>
    <td><p class="valor-disponivel">R$ ${numDisponivel}</p></td>
    <td class="acao">
    <button onclick="editarItem(${index})" class='btn-acao'><i class="fa-solid fa-pen"></i></button>
    <button onclick="deletarItem(${index})" class='btn-acao'><i class="fa-solid fa-trash"></i></button>
    </td>`

    //Letra vermelha Disponível for negativo
    if (resDisponivel < 0) {
        tabela.classList.add('negativo')
    }

    tbody.appendChild(tabela)
}

function deletarItem(index) {
    let confirmar = confirm(`Deseja apagar a categoria ${itens[index].nome}?`)
    if (confirmar == true) {
        itens.splice(index, 1)
        editarBDcat()
    }
    carregarItens()
}

function editarItem(index) {
    abrirJanela(true, index)
}

function abrirJanela(editar = false, index = 0) {
    novCatJanela.classList.add('ativo')
    nome.focus()

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
        nome.focus()
        alerta.innerHTML = ''
        let msgAlerta = document.createElement('p')
        msgAlerta.innerHTML = 'Preencha todos os campos!'
        return alerta.appendChild(msgAlerta)
    }
    alerta.innerHTML = ''

    lancamentos = buscarBDlan()
    if (id !== undefined) {
        //Quando for editado o nome da categoria, atualizar BD Lancamentos as categorias tb
        let catBDcat = itens[id].nome
        if (nome.value !== catBDcat) {
            lancamentos.forEach((item) => {
                if (item.categoria == catBDcat) {
                    item.categoria = nome.value
                }
            })
        }
        itens[id].nome = nome.value
        itens[id].orcamento = orcamento.value
    } else {
        itens.push({
            'nome': nome.value,
            'orcamento': orcamento.value,
            'gasto': '',
            'disponivel': ''
        })
    }

    editarBDlan()
    editarBDcat()
    novCatJanela.classList.remove('ativo')
    carregarItens()
    id = undefined
}

function somarGasto(item, index) {
    let valores = []
    let nomeCategoria = item.nome
    let resultado = 0
    let todosLancamentos = buscarBDlan()
    lancamentos = []

    // Filtrar apenas lancamentos do mes atual
    todosLancamentos.forEach((item) => {
        if (item.data.substring(0, 4) == dataAno && item.data.substring(5, 7) == dataMes)
            lancamentos.push(item)
    })

    //Conferir todas as categorias conforme o BD e colocar todos os valores na array de cada categoria
    lancamentos.forEach((lanc) => {
        if (nomeCategoria == lanc.categoria) {
            //Já colocar dentro do array em número
            valores.push(Number.parseFloat(lanc.valor))
        }
    })

    //Somar todos os números do array
    for (let i = 0; i < valores.length; i++) {
        resultado += valores[i]
    }

    //Inserir no BD através da array itens
    itens[index].gasto = resultado
    editarBDcat()
}

function somarDisponivel(item, index) {
    let gasto = item.gasto
    let orcamento = Number(item.orcamento)
    resDisponivel = orcamento - gasto

    //Inserir no BD através do resultado
    itens[index].disponivel = resDisponivel
    editarBDcat()
}

function somarTfoot() {
    let BDcategorias = buscarBDcat()

    //Somar Orcamento
    let resOrcamento = 0
    let valoresOrcamento = []
    //Colocar todos os valores no array e transformar em número
    BDcategorias.forEach((item) => {
        valoresOrcamento.push(Number.parseFloat(item.orcamento))
    })
    //Somar todos os numeros do array
    for (let i = 0; i < valoresOrcamento.length; i++) {
        resOrcamento += valoresOrcamento[i]
    }

    //Somar Gasto
    let resGasto = 0
    let valoresGasto = []
    //Colocar todos os valores no array e transformar em número
    BDcategorias.forEach((item) => {
        valoresGasto.push(Number.parseFloat(item.gasto))
    })
    //Somar todos os numeros do array
    for (let i = 0; i < valoresGasto.length; i++) {
        resGasto += valoresGasto[i]
    }

    //Somar Disponível
    let resDisp = 0
    let valoresDisp = []
    //Colocar todos os valores no array e transformar em número
    BDcategorias.forEach((item) => {
        valoresDisp.push(Number.parseFloat(item.disponivel))
    })
    //Somar todos os numeros do array
    for (let i = 0; i < valoresDisp.length; i++) {
        resDisp += valoresDisp[i]
    }

    //Escrever no tfoot o resultado da soma
    const tfoot = document.getElementById('tfoot-orcamento')
    let totais = document.createElement('tr')
    tfoot.innerHTML = ''
    inserirSomaTab()
    function inserirSomaTab() {
        totais.innerHTML = `
        <td>Totais</td>
        <td><p class="valores">R$ ${resOrcamento.toFixed(2).replace(".", ",")}</p></td>
        <td><p class="gasto">R$ ${resGasto.toFixed(2).replace(".", ",")}</p></td>
        <td><p class="valor-disponivel">R$ ${resDisp.toFixed(2).replace(".", ",")}</p></td>
        <td></td>`
        tfoot.appendChild(totais)
    }

    //Letra vermelha Disponível for negativo
    if (resDisp < 0) {
        totais.classList.add('negativo')
    }
}