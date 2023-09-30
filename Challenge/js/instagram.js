let dropdown = document.getElementsByClassName("dropdown-btn");
const ctx = document.getElementById('myChart_feedback');
const top5Curtidas = document.querySelector(".top5palavras p");
let i;

//Função do menu: DropDown; Escutador de evento do clique

for (i = 0; i < dropdown.length; i++) {
  dropdown[i].addEventListener("click", function () {
    this.classList.toggle("active");
    let dropdownContent = this.nextElementSibling;
    if (dropdownContent.style.display === "block") {
      dropdownContent.style.display = "none";
    } else {
      dropdownContent.style.display = "block";
    }
  });
}

//Grafico dos dados dos feedbacks

new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ['1ºTrimestre(2022)', '2ºTrimestre(2022)', '3ºTrimestre(2022)', '4ºTrimestre(2022)', '1ºTrimestre(2023)', '2ºTrimestre(2023)', '3ºTrimestre(2023)'],
    datasets: [{
      label: '#Nº de Curtidas',
      data: [0, 0, 0, 0, 0, 0, 0],
      borderWidth: 1
    }]
  },
  options: {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
});

//função pra calcular a media aritmetica
function calcularMediaAritmetica() {
  const dadosDoGrafico = [0, 0, 0, 0, 0, 0, 0];
  const soma = dadosDoGrafico.reduce((total, valor) => total + valor, 0);
  const media = soma / dadosDoGrafico.length;
  return media.toFixed(2);
}
  // Exibe a média na página
  const mediaElement = document.getElementById("media");
  mediaElement.textContent = calcularMediaAritmetica();

// Função para calcular a mediana
function calcularMediana() {
  const dadosDoGrafico = [0, 0, 0, 0, 0, 0, 0];
  const sortedData = [...dadosDoGrafico].sort((a, b) => a - b);

  if (sortedData.length % 2 === 0) {
    
    const meio = sortedData.length / 2;
    const valor1 = sortedData[meio - 1];
    const valor2 = sortedData[meio];
    return ((valor1 + valor2) / 2).toFixed(2);
  } else {
    const meio = Math.floor(sortedData.length / 2);
    return sortedData[meio].toFixed(2);
  }
}
// Exibe a mediana na página
const medianaElement = document.getElementById("mediana");
medianaElement.textContent = calcularMediana();

//Função para calcular a dispersão (variância)
function calcularDispersao() {
  const dadosDoGrafico = [0, 0, 0, 0, 0, 0, 0];
  const media = calcularMediaAritmetica(); 
  const n = dadosDoGrafico.length;
  
  const somaDosQuadradosDasDiferencas = dadosDoGrafico.reduce((total, valor) => {
    const diferenca = valor - media;
    return total + diferenca * diferenca;
  }, 0);
  
  const variancia = somaDosQuadradosDasDiferencas / (n - 1); 
  return variancia.toFixed(2); 
}
 // Exibe a dispersão na página
 const dispersaoElement = document.getElementById("dispersao");
 dispersaoElement.textContent = calcularDispersao();

 function calcularPrimeiroQuartil() {
  const dadosDoGrafico = [0, 0, 0, 0, 0, 0, 0];
  const n = dadosDoGrafico.length;

  const sortedData = [...dadosDoGrafico].sort((a, b) => a - b);

  const posicaoQ1 = Math.floor(n / 4);

  if (n % 4 !== 0) {
    return sortedData[posicaoQ1];
  } else {
    const valor1 = sortedData[posicaoQ1 - 1];
    const valor2 = sortedData[posicaoQ1];
    const q1= (valor1 + valor2) / 2;
    return q1.toFixed(2);
  }
}
 // Exibe o primeiro quartil (Q1) na página
 const primeiroQuartilElement = document.getElementById("primeiroQuartil");
 primeiroQuartilElement.textContent = calcularPrimeiroQuartil();

 function calcularTerceiroQuartil() {
  const dadosDoGrafico = [0, 0, 0, 0, 0, 0, 0];
  const n = dadosDoGrafico.length;

  const sortedData = [...dadosDoGrafico].sort((a, b) => a - b);
  
  const posicaoQ3 = Math.floor((3 * n) / 4);

  if ((3 * n) % 4 !== 0) {
    return sortedData[posicaoQ3];
  } else {
    const valor1 = sortedData[posicaoQ3 - 1];
    const valor2 = sortedData[posicaoQ3];
    const quartil=(valor1 + valor2) / 2;
    return quartil.toFixed(2); 
  }
}

// Exibe o terceiro quartil (Q3) na página
const terceiroQuartilElement = document.getElementById("terceiroQuartil");
terceiroQuartilElement.textContent = calcularTerceiroQuartil();

  function calcularDesvioPadrao() {
    const dadosDoGrafico = [0, 0, 0, 0, 0, 0, 0]; 
    const media = calcularMediaAritmetica(); 
  
    const somaDasDiferencasQuadradas = dadosDoGrafico.reduce((total, valor) => {
      const diferenca = valor - media;
      return total + diferenca * diferenca;
    }, 0);
  
    const variancia = somaDasDiferencasQuadradas / dadosDoGrafico.length;
  
    const desvioPadrao = Math.sqrt(variancia);
    return desvioPadrao.toFixed(2); 
  }
// Exibe o desvio padrão na página
const desvioPadraoElement = document.getElementById("desvioPadrao");
desvioPadraoElement.textContent = calcularDesvioPadrao();

function calcularMediaGeometrica() {
  const dadosDoGrafico = [0, 0, 0, 0, 0, 0, 0];
  if (dadosDoGrafico.length === 0 || dadosDoGrafico.includes(0)) {
    return NaN, "Impossível calcular: divisão por zero";
  }

  const produto = dadosDoGrafico.reduce((acumulador, valor) => acumulador * valor, 1);

  const mediaGeometrica = Math.pow(produto, 1 / dadosDoGrafico.length);
  return mediaGeometrica.toFixed(2);
}
// Exibe a média geométrica na página
const mediaGeometricaElement = document.getElementById("mediaGeometrica");
mediaGeometricaElement.textContent = calcularMediaGeometrica();

function calcularMediaHarmonica() {
  const dadosDoGrafico = [0, 0, 0, 0, 0, 0, 0];
  const inversos = dadosDoGrafico.map(valor => 1 / valor);
  if (dadosDoGrafico.length === 0 || inversos.includes(Infinity)) {
    return NaN, "Impossível calcular: divisão por zero";
   
  }
  const somaInversos = inversos.reduce((acumulador, valor) => acumulador + valor, 0);

  const mediaHarmonica = dadosDoGrafico.length / somaInversos;

  return mediaHarmonica.toFixed(2); 
}
const mediaHarmonicaElement=document.getElementById("mediaHarmonica");
mediaHarmonicaElement.textContent=calcularMediaHarmonica();

//Tabela dos feedbacks

document.addEventListener('DOMContentLoaded', init, false);

let data, table, sortCol;
let sortAsc = false;
const pageSize = 3;
let curPage = 1;

async function init() {

  // Select the table (well, tbody)
  table = document.querySelector('#tableFeedback tbody');
  // Dados
  data = [{
      "codigo": 6,
      "feedback": "Que diabo de empresa de alimentos Kraft Heinz?!?! Você aumenta o preço de seus produtos Shake n Bake, mas não pode mais fornecer aos clientes as sacolas plásticas que vêm na caixa? Acho que as pessoas vão ficar com muita fome graças a você!",
      "nCurtidas": 0,
      "data": "06/08/2023",
      "user": "kimberly.m_03",
      "post": "https://www.instagram.com/p/CsyThIKsCtN/?utm_source=ig_web_copy_link&igshid=MzRlODBiNWFlZA=="
    },
    {
      "codigo": 7,
      "feedback": "Sou grato por uma mudança potencialmente positiva, porque é muito importante. Que seja realmente um passo em uma direção mais saudável e sustentável e não (conhecida ou desconhecida) lavagem verde com consequências devastadoras. Gostaria muito de solicitar com muita gentileza que você altere a receita para que não contenha mais xarope de milho com alto teor de frutose, conhecido por causar problemas de saúde e como pai de um filho que adora ketchup, agradeceria profundamente. Outra coisa em minha mente para o nosso futuro mais saudável seria apoiar a agricultura orgânica regenerativa, e talvez você tenha os recursos para cultivar seus próprios ingredientes dessa maneira?! Isso seria tão emocionante para os consumidores, sabendo que seus produtos estão realmente criando um futuro mais saudável e sustentável! Obrigado",
      "nCurtidas": 0,
      "data": "22/12/2022",
      "user": "vmcalib",
      "post": "https://www.instagram.com/p/CdYRP7vAIlh/?utm_source=ig_web_copy_link&igshid=MzRlODBiNWFlZA=="
    }
  ];
  renderTable();

  document.querySelector('#nextButton').addEventListener('click', nextPage, false);
  document.querySelector('#prevButton').addEventListener('click', previousPage, false);
}

function renderTable() {
  // create html
  let result = '';
  data.filter((row, index) => {
    let start = (curPage - 1) * pageSize;
    let end = curPage * pageSize;
    if (index >= start && index < end) return true;
  }).forEach(c => {
    result += `<tr>
     <td>${c.codigo}</td>
     <td>${c.feedback}</td>
     <td>${c.nCurtidas}</td>
     <td>${c.data}</td>
     <td>${c.user}</td>
     <td><a href="${c.post}">Link do post</a></td>
     </tr>`;
  });
  table.innerHTML = result;
}


function previousPage() {
  if (curPage > 1) curPage--;
  renderTable();
}

function nextPage() {
  if ((curPage * pageSize) < data.length) curPage++;
  renderTable();
}

function orderDataByCurtidas() {
  const dado = data;
  dado.sort(function (x, y) {
    return y.nCurtidas - x.nCurtidas;
  });

  return dado;
}

document.addEventListener("DOMContentLoaded", () => {
  const ordenedData = orderDataByCurtidas();
  top5Curtidas.innerHTML = "Código dos 5 feedbacks com mais curtidas: <br>";
  for (let i = 0; i < 5; i++) {
    console.log(typeof(ordenedData[i].nCurtidas));
      if (ordenedData[i].nCurtidas === 0 || ordenedData[i].nCurtidas == undefined) {
        top5Curtidas.innerHTML += "<br>Não há feedbacks com reação";
        break
    } else
        top5Curtidas.innerHTML += `<br>${i + 1}º lugar: ${ordenedData[i].codigo}` ;
    }
});