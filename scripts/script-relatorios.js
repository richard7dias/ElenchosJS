//Banco de dados
const buscarBDcat = () => JSON.parse(localStorage.getItem('categorias') || '[]')
const bdCategorias = buscarBDcat()
const buscarBDlanc = () => JSON.parse(localStorage.getItem('lancamentos') || '[]')
const bdLancamentos = buscarBDlanc()




//Categorias em gráfico de pizza
//Variáveis
let categorias = []
let valoresCat = []

//Colocar nome das categorias dentro do array
bdCategorias.forEach(item => {
    categorias.push(item.nome)
});

//Colocar valores das categorias dentro do array em números
bdCategorias.forEach(item => {
    valoresCat.push(item.gasto)
});

//Criar biblioteca Chart
let ctxCategorias = document.getElementById('totais-categorias')
let pizzaCategorias = new Chart(ctxCategorias, {
    type: 'doughnut',
    data: {
        labels: categorias,
        datasets: [{
            data: valoresCat,
            backgroundColor: [
                'rgb(9, 111, 171)',
                'rgb(169, 0, 0)',
                'rgb(9, 171, 97)',
                'rgb(8, 82, 125)',
                'rgb(230, 230, 230)',
                'rgb(5, 54, 83)',
                'rgb(243, 243, 243)',
                'rgb(6, 88, 45)',
                'rgb(10, 55, 204)',
                'rgb(0, 199, 23)',
                'rgb(210, 0, 0)',
                'rgb(231, 240, 255)',
                'rgb(0, 0, 0)'
            ],
            hoverOffset: 0,
            offset: 10,
        }]
    },
})






//Totais por mês em gráfico de coluna
//Variáveis
let bdLancamentosMes = []
let jan = []; let fev = []; let mar = []; let abr = []; let mai = []; let jun = []; let jul = []; let ago = []; let set = []; let out = []; let nov = []; let dez = []
let janSoma = 0; let fevSoma = 0; let marSoma = 0; let abrSoma = 0; let maiSoma = 0; let junSoma = 0; let julSoma = 0; let agoSoma = 0; let setSoma = 0; let outSoma = 0; let novSoma = 0; let dezSoma = 0

//Colocar todos os meses e valores na array
bdLancamentos.forEach((item) => {
    bdLancamentosMes.push({
        'mes': Number(item.data.substring(5, 7)),
        'valor': Number(item.valor)
    })
})

bdLancamentosMes.forEach((item) => {
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

//Criar biblioteca Chart
let ctxTotMes = document.getElementById('totais-mes')
let totaisMes = new Chart(ctxTotMes, {
    type: 'bar',
    data: {
        labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
        datasets: [{
            label: 'Valores por mês',
            data: somaMeses,
            backgroundColor: [
                'rgb(9, 111, 171)',
                'rgb(169, 0, 0)',
                'rgb(9, 171, 97)',
                'rgb(8, 82, 125)',
                'rgb(230, 230, 230)',
                'rgb(5, 54, 83)',
                'rgb(243, 243, 243)',
                'rgb(6, 88, 45)',
                'rgb(10, 55, 204)',
                'rgb(0, 199, 23)',
                'rgb(210, 0, 0)',
                'rgb(231, 240, 255)'
            ],
            hoverOffset: 0,
            offset: 10,
        }]
    },
})

