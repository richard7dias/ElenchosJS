//Banco de dados
const buscarBDlanc = () => JSON.parse(localStorage.getItem('lancamentos') || '[]')
const bdLancamentos = buscarBDlanc()

//Variáveis e constantes gerais
const relatorios = document.getElementById('res-relatorios')
let cores = [
    'rgb(9, 111, 171)',
    'rgb(169, 0, 0)',
    'rgb(9, 171, 97)',
    'rgb(34, 190, 205)',
    'rgb(126, 126, 126)',
    'rgb(5, 54, 83)',
    'rgb(182, 12, 143)',
    'rgb(6, 88, 45)',
    'rgb(194, 200, 15)',
    'rgb(123, 97, 185)',
    'rgb(74, 100, 140)',
    'rgb(222, 152, 48)',
    'rgb(0, 0, 0)']
let todosAnos = []
let todosMeses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']
const divCat = document.getElementById('janela-categoria')
const divRes = document.getElementById('resultados')
const divResultadosCat = document.getElementById('resultados-categorias')
let itensCres

//Variaveis e constantes janela anos
let inputAnoDoAno
let inputCategoria
let categoriasRelatorio
let nomeCategoriasRelatorio
const tabLancCat = document.getElementById('lancados-cat')
const captionLancadosCat = document.getElementById('caption-cat')
const tbodyCat = document.getElementById('tbody-lancados-cat')

//Variaveis e constantes janela meses
let inputMes
let inputAnoDoMes
let mesNumero
const tabLancMes = document.getElementById('lancados')
const captionLancadosMes = document.getElementById('caption-mes')
const tbodyMes = document.getElementById('tbody-lancados-mes')

//Funnções necessárias ao abrir a página
carregarAnos()
function carregarAnos() {
    //Colocar todos os anos em um array
    let anosRepetidos = []
    bdLancamentos.forEach((item) => {
        anosRepetidos.push(Number(item.data.substring(0, 4)))
    })

    //Limpar anos repetidos e colocar no novo array
    todosAnos = anosRepetidos.filter(function (el, i) {
        return anosRepetidos.indexOf(el) === i
    })

    //Ordenar anos de forma crescente e depois decrescente
    todosAnos.sort()
    todosAnos.reverse()
}

//Janelas botões
//Relatórios por ano
function janelaAnos() {
    //Limpar se houver dados e inserir divs
    divRes.innerHTML = ''
    divResultadosCat.innerHTML = ''
    divCat.innerHTML = ''
    tbodyCat.innerHTML = ''
    divCat.setAttribute('style', 'display: none')
    tabLancMes.setAttribute('style', 'display: none')
    tabLancCat.setAttribute('style', 'display: none')

    //Inserir divs
    let res = document.createElement('p')
    res.innerHTML = `
    <div id="tot-categorias">
        <div id="titulo-categorias"></div>
        <div id="inserir-canvas-cat"></div>
    </div>
    <div id="tot-mes">
        <div id="titulo-por-mes"></div>
        <div id="inserir-canvas-mes"></div>
    </div>
    `
    divRes.appendChild(res)

    //Abrir janela opções anos
    const janela = document.getElementById('janela-escolhas')
    janela.setAttribute('style', 'display: flex')

    //Opções de anos
    let opcoesAnos = document.createElement('p')
    janela.innerHTML = ''
    opcoesAnos.innerHTML = `
    <p>Escolha o ano:</p>
    <select class="inputs" id="input-ano"></select>
    <buttom class="botoes" id="btn-relatorios" onclick="visualizarRelatorioAno()">Visualizar relatório</buttom>
    `
    janela.appendChild(opcoesAnos)

    //Colocar anos do BD nos options
    inputAnoDoAno = document.getElementById('input-ano')
    inputAnoDoAno.innerHTML = ''
    todosAnos.forEach((item) => {
        let anos = document.createElement('option')
        anos.innerHTML = `<option value="${item}}">${item}</option>`
        inputAnoDoAno.appendChild(anos)
    })
}

//Relatórios por mês
function janelaMeses() {
    //Limpar se houver dados
    divRes.innerHTML = ''
    divResultadosCat.innerHTML = ''
    divCat.innerHTML = ''
    divCat.setAttribute('style', 'display: none')
    tabLancMes.setAttribute('style', 'display: none')
    tabLancCat.setAttribute('style', 'display: none')

    //Inserir divs
    let res = document.createElement('p')
    res.innerHTML = `
    <div id="tot-categorias">
        <div id="titulo-categorias"></div>
        <div id="inserir-canvas-cat"></div>
    </div>
    <div id="tot-mes">
        <div id="titulo-por-mes"></div>
        <div id="inserir-canvas-mes"></div>
    </div>
    `
    divRes.appendChild(res)

    //Abrir janela meses
    const janela = document.getElementById('janela-escolhas')
    janela.setAttribute('style', 'display: flex')

    //Opções de meses
    let opcoesMeses = document.createElement('p')
    janela.innerHTML = ''
    opcoesMeses.innerHTML = `
    <p>Escolha o mês:</p>
    <select class="inputs" id="input-mes"></select>
    <p>do ano de:</p>
    <select class="inputs" id="input-ano"></select>
    <buttom class="botoes" id="btn-relatorios" onclick="visualizarRelatorioMes()">Visualizar relatório</buttom>
    `
    janela.appendChild(opcoesMeses)

    //Escrever meses do array nos options
    inputMes = document.getElementById('input-mes')
    inputMes.innerHTML = ''
    todosMeses.forEach((item) => {
        let meses = document.createElement('option')
        meses.innerHTML = `<option value="${item}}">${item}</option>`
        inputMes.appendChild(meses)
    })

    //Colocar anos do BD nos options
    inputAnoDoMes = document.getElementById('input-ano')
    inputAnoDoMes.innerHTML = ''
    todosAnos.forEach((item) => {
        let anos = document.createElement('option')
        anos.innerHTML = `<option value="${item}}">${item}</option>`
        inputAnoDoMes.appendChild(anos)
    })
}

function visualizarRelatorioAno() {
    divResultadosCat.innerHTML = ''
    tabLancCat.setAttribute('style', 'display: none')
    categoriasPorAno(inputAnoDoAno.value)
    totaisMesPorAno(inputAnoDoAno.value)
    menuCategorias(inputAnoDoAno.value)
}

function visualizarRelatorioMes() {
    categoriasPorMes(inputMes.value, inputAnoDoMes.value)
    lancamentosPorMes(inputMes.value, inputAnoDoMes.value)
}

//Graficos - padrão por ano
//Categorias em gráfico de pizza
function categoriasPorAno(ano) {
    //Escrever título
    let titulo = document.getElementById('titulo-categorias')
    titulo.innerHTML = ''
    const tit = document.createElement('h3')
    tit.innerHTML = `<h3 class="titulos">Média das Categorias de ${ano}</h3>`
    titulo.appendChild(tit)

    //Arrays
    let categorias = []
    let nomeCatRepetidos = []

    //Colocar nome das categorias dentro do array pelo ano selecionado e filtrar ano
    bdLancamentos.forEach((item) => {
        if (item.data.substring(0, 4) == ano) {
            categorias.push({
                'categoria': item.categoria,
                'valor': item.valor
            })
            nomeCatRepetidos.push(item.categoria)
        }
    })

    //Separar nome categorias repetidas em um array sem repetições - para ficar com as categorias que foram usadas
    let nomeCategorias = nomeCatRepetidos.filter(function (el, i) {
        return nomeCatRepetidos.indexOf(el) === i
    })

    //Varrer cada categoria, se as categorias forem iguais as do ano, colocar a soma no array
    let somaCategorias = []
    nomeCategorias.forEach((nome) => {
        let valores = []
        categorias.forEach((item) => {
            if (nome == item.categoria) {
                valores.push(Number(item.valor))
            }
        })

        //Somar o array e fazer a média
        let soma = 0
        for (let i = 0; i < valores.length; i++) {
            soma += valores[i]
        }
        let media = soma / valores.length

        //Colocar os objetos no array externo
        somaCategorias.push({
            'categoria': nome,
            'valor': media
        })
    })

    //Colocar nomes e valores em arrays separados para o gráfico
    let nomesCategorias = []
    let valoresCategorias = []

    somaCategorias.forEach((item) => {
        nomesCategorias.push(item.categoria)
        valoresCategorias.push(item.valor)
    })

    //Criar Chart
    let inserirCanvas = document.getElementById('inserir-canvas-cat')
    inserirCanvas.innerHTML = ''
    let canvas = document.createElement('p')
    canvas.innerHTML = '<canvas id="totais-categorias"></canvas>'
    inserirCanvas.appendChild(canvas)

    let ctxCategorias = document.getElementById('totais-categorias')
    let pizzaCategorias = new Chart(ctxCategorias, {
        type: 'doughnut',
        data: {
            labels: nomesCategorias,
            datasets: [{
                data: valoresCategorias,
                backgroundColor: cores,
                hoverOffset: 0,
                offset: 10,
            }]
        }
    })
}

//Totais por mês em gráfico de coluna
function totaisMesPorAno(ano) {
    //Título
    const titulo = document.getElementById('titulo-por-mes')
    titulo.innerHTML = ''
    const tit = document.createElement('h3')
    tit.innerHTML = `<h3 class="titulos">Total gastos por mês de ${ano}</h3>`
    titulo.appendChild(tit)

    //Variáveis e arrays
    let lancamentosMes = []
    let jan = 0; let fev = 0; let mar = 0; let abr = 0; let mai = 0; let jun = 0; let jul = 0; let ago = 0; let set = 0; let out = 0; let nov = 0; let dez = 0
    let janSoma = 0; let fevSoma = 0; let marSoma = 0; let abrSoma = 0; let maiSoma = 0; let junSoma = 0; let julSoma = 0; let agoSoma = 0; let setSoma = 0; let outSoma = 0; let novSoma = 0; let dezSoma = 0

    //Colocar todos os meses e valores na array
    bdLancamentos.forEach((item) => {
        if (item.data.substring(0, 4) == ano) {
            lancamentosMes.push({
                'mes': Number(item.data.substring(5, 7)),
                'valor': Number(item.valor)
            })
        }
    })

    lancamentosMes.forEach((item) => {
        switch (item.mes) {
            case 1:
                jan += item.valor
                break
            case 2:
                fev += item.valor
                break
            case 3:
                mar += item.valor
                break
            case 4:
                abr += item.valor
                break
            case 5:
                mai += item.valor
                break
            case 6:
                jun += item.valor
                break
            case 7:
                jul += item.valor
                break
            case 8:
                ago += item.valor
                break
            case 9:
                set += item.valor
                break
            case 10:
                out += item.valor
                break
            case 11:
                nov += item.valor
                break
            case 12:
                dez += item.valor
                break
        }
    })

    //Colocar soma dos meses no array
    let somaMeses = []
    somaMeses.push(jan, fev, mar, abr, mai, jun, jul, ago, set, out, nov, dez)

    //Criar Chart
    let inserirCanvas = document.getElementById('inserir-canvas-mes')
    inserirCanvas.innerHTML = ''
    let canvas = document.createElement('p')
    canvas.innerHTML = '<canvas id="totais-mes"></canvas>'
    inserirCanvas.appendChild(canvas)

    let ctxTotMes = document.getElementById('totais-mes')
    let totaisMes = new Chart(ctxTotMes, {
        type: 'bar',
        data: {
            labels: todosMeses,
            datasets: [{
                label: 'Total do mês',
                data: somaMeses,
                backgroundColor: cores,
            }]
        },
    })
}

//Graficos - padrão por mes
//Categorias em gráfico de pizza
function categoriasPorMes(mes, ano) {
    //Escrever título
    let titulo = document.getElementById('titulo-categorias')
    titulo.innerHTML = ''
    const tit = document.createElement('h3')
    tit.innerHTML = `<h3 class="titulos">Categorias de ${mes} de ${ano}</h3>`
    titulo.appendChild(tit)

    //Trocar nome do mes de strting para número
    switch (mes) {
        case 'Janeiro':
            mesNumero = 1
            break
        case 'Fevereiro':
            mesNumero = 2
            break
        case 'Março':
            mesNumero = 3
            break
        case 'Abril':
            mesNumero = 4
            break
        case 'Maio':
            mesNumero = 5
            break
        case 'Junho':
            mesNumero = 6
            break
        case 'Julho':
            mesNumero = 7
            break
        case 'Agosto':
            mesNumero = 8
            break
        case 'Setembro':
            mesNumero = 9
            break
        case 'Outubro':
            mesNumero = 10
            break
        case 'Novembro':
            mesNumero = 11
            break
        case 'Dezembro':
            mesNumero = 12
            break
    }

    //Arrays
    let categorias = []
    let nomeCatRepetidos = []

    //Colocar nome das categorias dentro do array pelo ano selecionado e filtrar ano
    bdLancamentos.forEach((item) => {
        if (item.data.substring(0, 4) == ano && Number(item.data.substring(5, 7)) == mesNumero) {
            categorias.push({
                'categoria': item.categoria,
                'valor': item.valor
            })
            nomeCatRepetidos.push(item.categoria)
        }
    })

    //Separar nome categorias repetidas em um array sem repetições - para ficar com as categorias que foram usadas
    let nomeCategorias = nomeCatRepetidos.filter(function (el, i) {
        return nomeCatRepetidos.indexOf(el) === i
    })

    //Somar categorias e colocar soma em um array
    let somaCategorias = []

    nomeCategorias.forEach((nome) => {
        let soma = 0
        categorias.forEach((item) => {
            if (nome == item.categoria) {
                soma += Number(item.valor)
            }
        })
        somaCategorias.push(soma)
    })

    //Criar Chart
    let inserirCanvas = document.getElementById('inserir-canvas-cat')
    inserirCanvas.innerHTML = ''
    let canvas = document.createElement('p')
    canvas.innerHTML = '<canvas id="totais-categorias"></canvas>'
    inserirCanvas.appendChild(canvas)

    let ctxCategorias = document.getElementById('totais-categorias')
    let pizzaCategorias = new Chart(ctxCategorias, {
        type: 'doughnut',
        data: {
            labels: nomeCategorias,
            datasets: [{
                data: somaCategorias,
                backgroundColor: cores,
                hoverOffset: 0,
                offset: 10,
            }]
        }
    })
    totaisCatPorMes(nomeCategorias, somaCategorias, mes, ano)
}

//Totais por categorias em gráfico de coluna
function totaisCatPorMes(nomes, soma, mes, ano) {
    //Título
    const tituloMes = document.getElementById('titulo-por-mes')
    tituloMes.innerHTML = ''
    const titMes = document.createElement('h3')
    titMes.innerHTML = `<h3 class="titulos">Categorias de ${mes} de ${ano}</h3>`
    tituloMes.appendChild(titMes)

    //Criar Chart
    let inserirCanvasMes = document.getElementById('inserir-canvas-mes')
    inserirCanvasMes.innerHTML = ''
    let canvas = document.createElement('p')
    canvas.innerHTML = '<canvas id="totais-mes"></canvas>'
    inserirCanvasMes.appendChild(canvas)

    let ctxTotMes = document.getElementById('totais-mes')
    let totaisMes = new Chart(ctxTotMes, {
        type: 'bar',
        data: {
            labels: nomes,
            datasets: [{
                label: 'Total do mês',
                data: soma,
                backgroundColor: cores,
            }]
        },
    })
}

function menuCategorias(ano) {
    //Limpar dados se houver e colocar divs
    divCat.innerHTML = ''
    let escrever = document.createElement('p')
    escrever.innerHTML = `
    <h3>Relatório por categoria específica de ${ano}</h3>
    <p>Escolha a categoria:</p>
    <select class="inputs" id="input-categorias"></select>
    <buttom class="botoes" id="btn-relatorios-cat" onclick="visualizarRelatorioCat(${ano})">Visualizar relatório</buttom>
    `
    divCat.appendChild(escrever)

    //Mostrar janela menu
    divCat.setAttribute('style', 'display: flex')

    //Arrays
    categoriasRelatorio = []
    let nomeCatRepetidos = []

    //Colocar nome das categorias dentro do array pelo ano selecionado e filtrar ano
    bdLancamentos.forEach((item) => {
        if (item.data.substring(0, 4) == ano) {
            categoriasRelatorio.push({
                'categoria': item.categoria,
                'valor': item.valor,
                'mes': item.data.substring(5, 7)
            })
            nomeCatRepetidos.push(item.categoria)
        }
    })

    //Separar nome categorias repetidas em um array sem repetições - para ficar com as categorias que foram usadas
    nomeCategoriasRelatorio = nomeCatRepetidos.filter(function (el, i) {
        return nomeCatRepetidos.indexOf(el) === i
    })

    //Escrever categorias do array nos options
    inputCategoria = document.getElementById('input-categorias')
    inputCategoria.innerHTML = ''
    nomeCategoriasRelatorio.forEach((item) => {
        let cats = document.createElement('option')
        cats.innerHTML = `<option value="${item}}">${item}</option>`
        inputCategoria.appendChild(cats)
    })
}

function visualizarRelatorioCat(ano) {
    divResultadosCat.innerHTML = ''
    tbodyCat.innerHTML = ''

    //Título
    const titCat = document.createElement('h3')
    titCat.innerHTML = `<h3 class="titulos">${inputCategoria.value} - ${ano}</h3>`
    divResultadosCat.appendChild(titCat)

    //Colocar categoria selecionada pelo usuário no array
    let categoriaSelecionada = []
    categoriasRelatorio.forEach((item) => {
        if (item.categoria == inputCategoria.value) {
            categoriaSelecionada.push(item)
        }
    })

    //Separar por mês
    //Arays dos meses
    let jan = 0; let fev = 0; let mar = 0; let abr = 0; let mai = 0; let jun = 0; let jul = 0; let ago = 0; let set = 0; let out = 0; let nov = 0; let dez = 0

    //Separar objeto no mês do array
    categoriaSelecionada.forEach((item) => {
        switch (item.mes) {
            case '01':
                jan += item.valor
                break
            case '02':
                fev += item.valor
                break
            case '03':
                mar += item.valor
                break
            case '04':
                abr += item.valor
                break
            case '05':
                mai += item.valor
                break
            case '06':
                jun += item.valor
                break
            case '07':
                jul += item.valor
                break
            case '08':
                ago += item.valor
                break
            case '09':
                set += item.valor
                break
            case '10':
                out += item.valor
                break
            case '11':
                nov += item.valor
                break
            case '12':
                dez += item.valor
                break
        }
    })

    //Guardar somas em ordem dos meses
    let somaCat = []
    somaCat.push(jan, fev, mar, abr, mai, jun, jul, ago, set, out, nov, dez)

    //Criar Chart
    let canvas = document.createElement('p')
    canvas.innerHTML = '<canvas id="relatorio-categorias"></canvas>'
    divResultadosCat.appendChild(canvas)

    let ctxRelatorioCat = document.getElementById('relatorio-categorias')
    let relCat = new Chart(ctxRelatorioCat, {
        type: 'bar',
        data: {
            labels: todosMeses,
            datasets: [{
                label: 'Total da categoria',
                data: somaCat,
                backgroundColor: cores,
            }]
        },
    })
    tabelaCategoria(ano)
}

function tabelaCategoria(ano) {
    //Visualizar tabela e limpar dados se houver
    tabLancCat.setAttribute('style', 'display: block')

    //Filtrar array e colocar em um novo array em ordem crescente
    let lancFiltrados = []
    bdLancamentos.forEach((item) => {
        if (item.categoria == inputCategoria.value && item.data.substring(0, 4) == ano) {
            lancFiltrados.push({
                'data': item.data,
                'descricao': item.descricao,
                'valor': item.valor
            })
        }
    })
    ordenarCresData(lancFiltrados)

    //Escrever título tabela
    captionLancadosCat.innerHTML = ''
    captionLancadosCat.innerHTML = `Lançamentos de ${inputCategoria.value} de ${ano}`
    //Escrever tabela
    itensCres.forEach((item) => {
        let numValor = Number.parseFloat(item.valor).toFixed(2).replace(".", ",")
        let tabela = document.createElement('tr')
        tabela.innerHTML = `
        <td>${item.data.split('-').reverse().join('/')}</td>
        <td>${item.descricao}</td>
        <td><p class="valores">R$ ${numValor}</p></td>`
        tbodyCat.appendChild(tabela)

    })
}

function lancamentosPorMes(mes, ano) {
    //Visualizar tabela e limpar dados se houver
    tabLancMes.setAttribute('style', 'display: block')
    tbodyMes.innerHTML = ''

    //Filtrar array e colocar em um novo array em ordem crescente
    let lancFiltrados = []
    bdLancamentos.forEach((item) => {
        if (item.data.substring(0, 4) == ano && item.data.substring(5, 7) == mesNumero) {
            lancFiltrados.push({
                'data': item.data,
                'descricao': item.descricao,
                'categoria': item.categoria,
                'valor': item.valor
            })
        }
    })
    ordenarCresData(lancFiltrados)

    //Escrever título tabela
    captionLancadosMes.innerHTML = ''
    captionLancadosMes.innerHTML = `Lançamentos de ${mes} de ${ano}`
    //Escrever tabela
    itensCres.forEach((item) => {
        let numValor = Number.parseFloat(item.valor).toFixed(2).replace(".", ",")
        let tabela = document.createElement('tr')
        tabela.innerHTML = `
        <td>${item.data.split('-').reverse().join('/')}</td>
        <td>${item.descricao}</td>
        <td>${item.categoria}</td>
        <td><p class="valores">R$ ${numValor}</p></td>`
        tbodyMes.appendChild(tabela)
    })
}

function ordenarCresData(lanc) {
    itensCres = lanc
    let ordemNumero = []
    //Separar ano, mês e dia em número
    itensCres.forEach((item) => {
        ordemNumero.push({
            'dia': Number(item.data.substring(8, 10)),
            'mes': Number(item.data.substring(5, 7)),
            'ano': Number(item.data.substring(0, 4)),
            'descricao': item.descricao,
            'categoria': item.categoria,
            'valor': item.valor
        })
    })
    //Ordenar o array novo
    ordemNumero.sort(function (a, b) {
        return a.dia - b.dia
    })
    ordemNumero.sort(function (a, b) {
        return a.mes - b.mes
    })
    ordemNumero.sort(function (a, b) {
        return a.ano - b.ano
    })
    // Atualizar objetos em ordem
    itensCres = []
    ordemNumero.forEach((item) => {
        itensCres.push({
            'data': `${item.ano}-${item.mes}-${item.dia}`,
            'descricao': item.descricao,
            'categoria': item.categoria,
            'valor': item.valor
        })
    })
}