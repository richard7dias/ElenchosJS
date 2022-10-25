//Banco de dados
const buscarBDcat = () => JSON.parse(localStorage.getItem('categorias') || '[]')
const bdCategorias = buscarBDcat()
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

//Variaveis e constantes janela anos
let inputAnoDoAno

//Variaveis e constantes janela meses
let inputMes
let inputAnoDoMes

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
    //Limpar se houver grafico e inserir divs
    const divRes = document.getElementById('resultados')
    divRes.innerHTML = ''
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
    //Limpar se houver grafico e inserir divs
    const divRes = document.getElementById('resultados')
    divRes.innerHTML = ''
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
    categoriasPorAno(inputAnoDoAno.value)
    totaisMesPorAno(inputAnoDoAno.value)
    menuCategorias()
}

function visualizarRelatorioMes() {
    categoriasPorMes(inputMes.value, inputAnoDoMes.value)
}

//Graficos - padrão por ano
//Categorias em gráfico de pizza
function categoriasPorAno(ano) {
    //Mostrar tabela
    const janela = document.getElementById('tot-categorias')
    janela.setAttribute('style', 'display: inline-block')

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
    //Mostrar tabela
    const janela = document.getElementById('tot-mes')
    janela.setAttribute('style', 'display: inline-block')

    //Título
    const titulo = document.getElementById('titulo-por-mes')
    titulo.innerHTML = ''
    const tit = document.createElement('h3')
    tit.innerHTML = `<h3 class="titulos">Total gastos por mês de ${ano}</h3>`
    titulo.appendChild(tit)

    //Variáveis e arrays
    let lancamentosMes = []
    let jan = []; let fev = []; let mar = []; let abr = []; let mai = []; let jun = []; let jul = []; let ago = []; let set = []; let out = []; let nov = []; let dez = []
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
                jan.push(item.valor)
                break
            case 2:
                fev.push(item.valor)
                break
            case 3:
                mar.push(item.valor)
                break
            case 4:
                abr.push(item.valor)
                break
            case 5:
                mai.push(item.valor)
                break
            case 6:
                jun.push(item.valor)
                break
            case 7:
                jul.push(item.valor)
                break
            case 8:
                ago.push(item.valor)
                break
            case 9:
                set.push(item.valor)
                break
            case 10:
                out.push(item.valor)
                break
            case 11:
                nov.push(item.valor)
                break
            case 12:
                dez.push(item.valor)
                break
        }
    })

    //Somar todos os arrays dos meses
    for (let i = 0; i < jan.length; i++) {
        janSoma += jan[i]
    }
    for (let i = 0; i < fev.length; i++) {
        fevSoma += fev[i]
    }
    for (let i = 0; i < mar.length; i++) {
        marSoma += mar[i]
    }
    for (let i = 0; i < abr.length; i++) {
        abrSoma += abr[i]
    }
    for (let i = 0; i < mai.length; i++) {
        maiSoma += mai[i]
    }
    for (let i = 0; i < jun.length; i++) {
        junSoma += jun[i]
    }
    for (let i = 0; i < jul.length; i++) {
        julSoma += jul[i]
    }
    for (let i = 0; i < ago.length; i++) {
        agoSoma += ago[i]
    }
    for (let i = 0; i < set.length; i++) {
        setSoma += set[i]
    }
    for (let i = 0; i < out.length; i++) {
        outSoma += out[i]
    }
    for (let i = 0; i < nov.length; i++) {
        novSoma += nov[i]
    }
    for (let i = 0; i < dez.length; i++) {
        dezSoma += dez[i]
    }

    //Colocar soma dos meses no array
    let somaMeses = []
    somaMeses.push(janSoma, fevSoma, marSoma, abrSoma, maiSoma, junSoma, julSoma, agoSoma, setSoma, outSoma, novSoma, dezSoma)

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
    //Mostrar tabela
    const janela = document.getElementById('tot-categorias')
    janela.setAttribute('style', 'display: inline-block')

    //Escrever título
    let titulo = document.getElementById('titulo-categorias')
    titulo.innerHTML = ''
    const tit = document.createElement('h3')
    tit.innerHTML = `<h3 class="titulos">Categorias de ${mes} de ${ano}</h3>`
    titulo.appendChild(tit)

    //Trocar nome do mes de strting para número
    let mesNumero
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
    //Mostrar tabela
    const janelaMesCat = document.getElementById('tot-mes')
    janelaMesCat.setAttribute('style', 'display: inline-block')

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

function menuCategorias() {
    const divCat = document.getElementById('totais-por-categoria')
    divCat.innerHTML = ''
    let escrever = document.createElement('p')
    escrever.innerHTML = `
    teste
    `
    divCat.appendChild(escrever)
}