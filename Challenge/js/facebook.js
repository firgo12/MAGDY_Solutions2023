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
      data: [0, 0, 1, 0, 7, 0, 0],
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
  const dadosDoGrafico = [0, 0, 1, 0, 7, 0, 0];
  const soma = dadosDoGrafico.reduce((total, valor) => total + valor, 0);
  const media = soma / dadosDoGrafico.length;
  return media.toFixed(2);
}
  // Exibe a média na página
  const mediaElement = document.getElementById("media");
  mediaElement.textContent = calcularMediaAritmetica();

// Função para calcular a mediana
function calcularMediana() {
  const dadosDoGrafico = [0, 0, 1, 0, 7, 0, 0];
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
  const dadosDoGrafico = [0, 0, 1, 0, 7, 0, 0];
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
  const dadosDoGrafico = [0, 0, 1, 0, 7, 0, 0];
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
  const dadosDoGrafico = [0, 0, 1, 0, 7, 0, 0];
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
    const dadosDoGrafico = [0, 0, 1, 0, 7, 0, 0]; 
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
  const dadosDoGrafico = [0, 0, 1, 0, 7, 0, 0];
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
  const dadosDoGrafico = [0, 0, 1, 0, 7, 0, 0];
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

let data = [], table, sortCol;
let sortAsc = false;
const pageSize = 3;
let curPage = 1;

async function init() {

  // Select the table (well, tbody)
  table = document.querySelector('#tableFeedback tbody');
  // Dados
  data = [{
      "codigo": 8,
      "feedback": "Uau! Isso é ótimo! Eu tenho uma pergunta, onde diabos estão as sacolas plásticas nas caixas do Shake n Bake?!?! Você os removeu, mas não se preocupou em declarar isso na caixa????? Depois de 50 anos você troca por um 'futuro mais sustentável'?! Dane-se o futuro, estou fazendo o jantar e dependo das malditas sacolas para o Shake n Bake! Retire já a palavra 'Shake' da sua embalagem! Vou comprar a marca de farinha de rosca panko de grande valor do Walmart agora porque INCLUEM as malditas sacolas !! Você perdeu um cliente. Boa sorte com o seu futuro!",
      "nCurtidas": 2,
      "nAmei": 0,
      "nForca":0,
      "nHaha": 0,
      "nUau": 0,
      "nTriste": 0,
      "nGrr": 0,
      "data": "22/03/2023",
      "user": "Jackie Wright",
      "post": "Water is essential to life, yet about 2 billion people worldwide don’t have access to safe drinking water. As a proud signatory of the CEO Water Mandate, we’re committed to water stewardship across our entire value chain and aim to reduce water use by 20% in high-risk watershed areas and by 15% across all sites by 2025. We’re on our way to achieving our goals and leading the future of food. Learn more about a few of the initiatives taking place #HereAtKraftHeinz"
    },
    {
      "codigo": 9,
      "feedback": "Acabamos de perceber que o shake n bake não conterá mais um saco de agitação. A empresa diz que é para ser mais sustentável e sugere agora que o utilizador encontre um recipiente reutilizável (que tem de ser encontrado no armário e depois lavado com água e detergente). Nosso novo plano é evitar o produto de uma só vez e fazer nossa própria cobertura com farinha de rosca e temperos. Por quase US$ 3,00 a caixa, obrigado por nos incentivar a considerar a ideia de economizar dinheiro e salvar o meio ambiente. Tenho certeza de que muitos amigos concordarão e não usarão mais seu produto.",
      "nCurtidas": 1,
      "nAmei": 0,
      "nForca":0,
      "nHaha": 0,
      "nUau": 0,
      "nTriste": 0,
      "nGrr": 0,
      "data": "06/03/2023",
      "user": "Linda Louise Pierson",
      "post": "Hoje e todos os dias, damos graças aos nossos Veteranos, Dever Ativo, e membros da Reserva dos Serviços Armados. #HereAtKraftHeinz, estamos empenhados em construir um ambiente onde pessoas de todos os esferas de vida sintam que pertencem e aplaudem o trabalho do nosso Grupo de Recursos Empresariais de Veteranos para ajudar a tornar isso realidade. Estamos honrados por ver esse trabalho reconhecido como um dos Melhores Empregadores para Veteranos da Forbes America e estamos orgulhosos de proporcionar um espaço solidário e acolhedor para os Veteranos na nossa mesa."
    },
    {
      "codigo": 10,
      "feedback": "Nunca mais compraremos shake n bake .... eliminar as sacolas anula o propósito de toda a ideia ... e você nunca abaixou o preço .... não mais",
      "nCurtidas": 1,
      "nAmei": 0,
      "nForca":0,
      "nHaha": 0,
      "nUau": 0,
      "nTriste": 0,
      "nGrr": 0,
      "data": "08/02/2023",
      "user": "Jim Flynn",
      "post": "As a global food and beverage company, we believe it's our duty to help feed and nourish the world -- responsibly. We're pleased to share our 2022 ESG Report. Join us 'Together at the Table' as we reflect on our progress and recognize the partnerships -- and innovations -- that make it possible. https://www.kraftheinzcompany.com/.../KraftHeinz-2022-ESG...#HereAtKraftHeinz #WeDareToDoBetter #ESG"
    },
    {
      "codigo": 11,
      "feedback": "Que tal colocar os shakers de volta nas caixas do Shake n Bake? Disseram que era uma maneira de manter o plástico fora dos aterros sanitários. Eu chamo BS sobre isso ... você poderia ter substituído os sacos de papel se você realmente fosse tão ambientalmente orientado. Era apenas mais uma forma de economizar às custas do consumidor. E você é muito mesquinho para mudar as instruções da caixa, que exigem o uso de “sacos fechados”. Vamos lá. Os consumidores não são estúpidos.",
      "nCurtidas": 1,
      "nAmei": 0,
      "nForca":0,
      "nHaha": 0,
      "nUau": 0,
      "nTriste": 0,
      "nGrr": 0,
      "data": "07/01/2023",
      "user": "Gail Marchand Varney",
      "post": "No #WorldFoodDay, somos lembrados do grande número de pessoas em todo o mundo que enfrentam a insegurança alimentar e são gratos pelos parceiros que partilham a nossa visão de um mundo sem fome. Um desses parceiros de assinatura é a Heifer International. Através do seu Projeto Gana Nutrition Link, estamos a ajudar a impactar famílias como a da Rachel Djaba.Rachel e a sua família cuidam de nove filhos e netos. Através deste projeto, a sua família recebeu e aprendeu a criar galinhas poedeiras de ovos, permitindo-lhes vender ovos no mercado para aumentar o rendimento doméstico, ao mesmo tempo que fornecia à família proteína que de outra forma não teriam. Para apoiar mais indivíduos como a Rachel, a Fundação Kraft Heinz tem estado a fazer parceria com a Heifer International desde 2020 para ajudar a aumentar o acesso a alimentos saudáveis, promover uma agricultura sustentável e inteligente para o clima e enfrentar a pobreza de formas sustentáveis em mais de 20 países. #AquiNoKraftHeinz"
    },
    {
      "codigo": 12,
      "feedback": "Acho que tirar as sacolas plásticas foi uma ótima ideia! Economiza dinheiro e o plástico não vai para o lixo. Usei sacolas plásticas de supermercado que guardo para reciclar ou coloco em vasilhame para sacudir! Boa ideia!",
      "nCurtidas": 0,
      "nAmei": 0,
      "nForca":0,
      "nHaha": 1,
      "nUau": 0,
      "nTriste": 0,
      "nGrr": 0,
      "data": "14/07/2023",
      "user": "Renee French Martin",
      "post": "Today we announced our Q2 2022 business results. Our teams #HereAtKraftHeinz delivered strong results by anticipating and adapting to changing market conditions. As the year continues, we're confident we can continue meeting the needs of our consumers. Read our full Q2 earnings release here:  https://bit.ly/3PLt8ZK"
    },
    {
      "codigo": 13,
      "feedback": "Acabei de comprar 2 shake n bake crispy Buffalo coating mix e nenhuma das caixas tinha os sacos de plástico incluídos! Muito desapontado com o produto, eles não os incluem mais?",
      "nCurtidas": 1,
      "nAmei": 0,
      "nForca":0,
      "nHaha": 0,
      "nUau": 0,
      "nTriste": 0,
      "nGrr": 0,
      "data": "29/09/2022",
      "user": "Melanie Fogleman",
      "post": "Today we announced our Q2 2022 business results. Our teams #HereAtKraftHeinz delivered strong results by anticipating and adapting to changing market conditions. As the year continues, we're confident we can continue meeting the needs of our consumers. Read our full Q2 earnings release here:  https://bit.ly/3PLt8ZK"
    },
    {
      "codigo": 14,
      "feedback": "Kraft Heinz Company Não se preocupe, Melanie. Eles pararam de incluir as sacolas plásticas nessas caixas - supostamente para impedir que mais plástico fosse para os aterros sanitários. Ha! Se fosse esse o caso, eles teriam substituído as sacolas de papel. Mais uma tentativa de economizar. Acabei de desligar o telefone com 'atendimento ao cliente' - provavelmente posso dizer que NÃO estou feliz.",
      "nCurtidas": 2,
      "nAmei": 0,
      "nForca":0,
      "nHaha": 0,
      "nUau": 0,
      "nTriste": 0,
      "nGrr": 0,
      "data": "06/01/2023",
      "user": "Gail Marchand Varney",
      "post": "Today we announced our Q2 2022 business results. Our teams #HereAtKraftHeinz delivered strong results by anticipating and adapting to changing market conditions. As the year continues, we're confident we can continue meeting the needs of our consumers. Read our full Q2 earnings release here:  https://bit.ly/3PLt8ZK"
    },
    {
      "codigo": 15,
      "feedback": "Gail Marchand Varney, acho que foi uma boa ideia. Eu uso sacolas de supermercado que reciclo ou coloco em um recipiente e agito",
      "nCurtidas": 0,
      "nAmei": 0,
      "nForca":0,
      "nHaha": 0,
      "nUau": 0,
      "nTriste": 0,
      "nGrr": 0,
      "data": "14/07/2023",
      "user": "Renee French Martin",
      "post": "Today we announced our Q2 2022 business results. Our teams #HereAtKraftHeinz delivered strong results by anticipating and adapting to changing market conditions. As the year continues, we're confident we can continue meeting the needs of our consumers. Read our full Q2 earnings release here:  https://bit.ly/3PLt8ZK"
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
     <td>${c.nAmei}</td>
     <td>${c.nForca}</td>
     <td>${c.nHaha}</td>
     <td>${c.nUau}</td>
     <td>${c.nTriste}</td>
     <td>${c.nGrr}</td>
     <td>${c.data}</td>
     <td>${c.user}</td>
     <td>${c.post}</td>
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

  return dado
}

document.addEventListener("DOMContentLoaded", () => {
  const ordenedData = orderDataByCurtidas();
  top5Curtidas.innerHTML = "Código dos 5 feedbacks com mais curtidas: <br>";
  for (let i = 0; i < 5; i++) {
    console.log(typeof ordenedData[i].nCurtidas);
    if (
      ordenedData[i].nCurtidas === 0 ||
      ordenedData[i].nCurtidas == undefined
    ) {
      top5Curtidas.innerHTML += "<br>Não há feedbacks com reação";
      break;
    } else
      top5Curtidas.innerHTML += `<br>${i + 1}º lugar: ${ordenedData[i].codigo}`;
  }
});