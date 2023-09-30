let dropdown = document.getElementsByClassName("dropdown-btn");
const ctx = document.getElementById('myChart_feedbackGeral');
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
  type: 'line',
  data: {
    labels: ['1ºTrimestre(2022)', '2ºTrimestre(2022)', '3ºTrimestre(2022)', '4ºTrimestre(2022)', '1ºTrimestre(2023)', '2ºTrimestre(2023)', '3ºTrimestre(2023)'],
    datasets: [{
      label: '# Nº de feedbacks',
      data: [0, 1, 2, 3, 6, 0, 3],
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

//CALCULOS->

// Função para calcular a média aritmética
function calcularMediaAritmetica() {
  const dadosDoGrafico = [0, 1, 2, 3, 6, 0, 3];
  const soma = dadosDoGrafico.reduce((total, valor) => total + valor, 0);
  const media = soma / dadosDoGrafico.length;
  return media.toFixed(2);
}
  // Exibe a média na página
  const mediaElement = document.getElementById("media");
  mediaElement.textContent = calcularMediaAritmetica();

// Função para calcular a mediana
function calcularMediana() {
  const dadosDoGrafico = [0, 1, 2, 3, 6, 0, 3];
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
  const dadosDoGrafico = [0, 1, 2, 3, 6, 0, 3];
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
  const dadosDoGrafico = [0, 1, 2, 3, 6, 0, 3];
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
  const dadosDoGrafico = [0, 1, 2, 3, 6, 0, 3];
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
    const dadosDoGrafico = [0, 1, 2, 3, 6, 0, 3]; 
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
  const dadosDoGrafico = [0, 1, 2, 3, 6, 0, 3];
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
  const dadosDoGrafico = [0, 1, 2, 3, 6, 0, 3];
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

//Gráfico dos Top 5
const xValues = ["1º", "2º", "3º", "4º", "1º"];
const yValues = [0, 1, 2, 24, 15];
const barColors = [
  "#b91d47",
  "#00aba9",
  "#2b5797",
  "#e8c3b9",
  "#1e7145"
];

new Chart("myChart_top5", {
  type: "doughnut",
  data: {
    labels: xValues,
    datasets: [{
      backgroundColor: barColors,
      data: yValues
    }]
  },
  options: {
    title: {
      display: true,
      text: "World Wide Wine Production 2018"
    }
  }
});

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
      "codigo": 1,
      "feedback": "Basta trazer de volta garrafas de vidro. Você não se importa com embalagens ecologicamente corretas usando todo aquele plástico volumoso; pelo menos ter uma opção de vidro para quem a) não compra plástico ou b) não quer aquelas garrafas enormes ocupando todo o espaço da geladeira",
      "redeSocial": "Twitter"
    },
    {
      "codigo": 2,
      "feedback": "Prezados Decisores, Percebemos que os custos estão subindo. Estamos preparados para pagar um pouco mais por seus produtos que amamos. Não estamos preparados para tentar descascar um Kraft de um pedaço de plástico tão fino quanto a própria embalagem de plástico. Corrija isso, por favor",
      "redeSocial": "Twitter"
    },
    {
      "codigo": 3,
      "feedback": "Honestamente, seria cada vez melhor para o meio ambiente se você usasse tampa de cânhamo",
      "redeSocial": "Twitter"
    },
    {
      "codigo": 4,
      "feedback": "Não faça isso. Não faça isso. Use vidro ou plástico",
      "redeSocial": "Twitter"
    },
    {
      "codigo": 5,
      "feedback": "Conserte seus malditos pacotes de mostarda, eles são muito difíceis de abrir. Pessoas desistem de tentar abrir e jogam fora",
      "redeSocial": "Twitter"
    },
    {
      "codigo": 6,
      "feedback": "Que diabo de empresa de alimentos Kraft Heinz?!?! Você aumenta o preço de seus produtos Shake n Bake, mas não pode mais fornecer aos clientes as sacolas plásticas que vêm na caixa? Acho que as pessoas vão ficar com muita fome graças a você!",
      "redeSocial": "Instagram"
    },
    {
      "codigo": 7,
      "feedback": "Sou grato por uma mudança potencialmente positiva, porque é muito importante. Que seja realmente um passo em uma direção mais saudável e sustentável e não (conhecida ou desconhecida) lavagem verde com consequências devastadoras. Gostaria muito de solicitar com muita gentileza que você altere a receita para que não contenha mais xarope de milho com alto teor de frutose, conhecido por causar problemas de saúde e como pai de um filho que adora ketchup, agradeceria profundamente. Outra coisa em minha mente para o nosso futuro mais saudável seria apoiar a agricultura orgânica regenerativa, e talvez você tenha os recursos para cultivar seus próprios ingredientes dessa maneira?! Isso seria tão emocionante para os consumidores, sabendo que seus produtos estão realmente criando um futuro mais saudável e sustentável! Obrigado",
      "redeSocial": "Instagram"
    },
    {
      "codigo": 8,
      "feedback": "Uau! Isso é ótimo! Eu tenho uma pergunta, onde diabos estão as sacolas plásticas nas caixas do Shake n Bake?!?! Você os removeu, mas não se preocupou em declarar isso na caixa????? Depois de 50 anos você troca por um 'futuro mais sustentável'?! Dane-se o futuro, estou fazendo o jantar e dependo das malditas sacolas para o Shake n Bake! Retire já a palavra 'Shake' da sua embalagem! Vou comprar a marca de farinha de rosca panko de grande valor do Walmart agora porque INCLUEM as malditas sacolas !! Você perdeu um cliente. Boa sorte com o seu futuro!",
      "redeSocial": "Facebook"
    },
    {
      "codigo": 9,
      "feedback": "Acabamos de perceber que o shake n bake não conterá mais um saco de agitação. A empresa diz que é para ser mais sustentável e sugere agora que o utilizador encontre um recipiente reutilizável (que tem de ser encontrado no armário e depois lavado com água e detergente). Nosso novo plano é evitar o produto de uma só vez e fazer nossa própria cobertura com farinha de rosca e temperos. Por quase US$ 3,00 a caixa, obrigado por nos incentivar a considerar a ideia de economizar dinheiro e salvar o meio ambiente. Tenho certeza de que muitos amigos concordarão e não usarão mais seu produto.",
      "redeSocial": "Facebook"
    },
    {
      "codigo": 10,
      "feedback": "Nunca mais compraremos shake n bake .... eliminar as sacolas anula o propósito de toda a ideia ... e você nunca abaixou o preço .... não mais",
      "redeSocial": "Facebook"
    },
    {
      "codigo": 11,
      "feedback": "Que tal colocar os shakers de volta nas caixas do Shake n Bake? Disseram que era uma maneira de manter o plástico fora dos aterros sanitários. Eu chamo BS sobre isso ... você poderia ter substituído os sacos de papel se você realmente fosse tão ambientalmente orientado. Era apenas mais uma forma de economizar às custas do consumidor. E você é muito mesquinho para mudar as instruções da caixa, que exigem o uso de “sacos fechados”. Vamos lá. Os consumidores não são estúpidos.",
      "redeSocial": "Facebook"
    },
    {
      "codigo": 12,
      "feedback": "Acho que tirar as sacolas plásticas foi uma ótima ideia! Economiza dinheiro e o plástico não vai para o lixo. Usei sacolas plásticas de supermercado que guardo para reciclar ou coloco em vasilhame para sacudir! Boa ideia!",
      "redeSocial": "Facebook"
    },
    {
      "codigo": 13,
      "feedback": "Acabei de comprar 2 shake n bake crispy Buffalo coating mix e nenhuma das caixas tinha os sacos de plástico incluídos! Muito desapontado com o produto, eles não os incluem mais?",
      "redeSocial": "Facebook"
    },
    {
      "codigo": 14,
      "feedback": "Kraft Heinz Company Não se preocupe, Melanie. Eles pararam de incluir as sacolas plásticas nessas caixas - supostamente para impedir que mais plástico fosse para os aterros sanitários. Ha! Se fosse esse o caso, eles teriam substituído as sacolas de papel. Mais uma tentativa de economizar. Acabei de desligar o telefone com 'atendimento ao cliente' - provavelmente posso dizer que NÃO estou feliz.",
      "redeSocial": "Facebook"
    },
    {
      "codigo": 15,
      "feedback": "Gail Marchand Varney, acho que foi uma boa ideia. Eu uso sacolas de supermercado que reciclo ou coloco em um recipiente e agito",
      "redeSocial": "Facebook"
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
     <td>${c.redeSocial}</td>
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