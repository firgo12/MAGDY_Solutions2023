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
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [{
      label: '# of Votes',
      data: [12, 19, 3, 5, 2, 3],
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

//Gráfico dos Top 5
const xValues = ["Italy", "France", "Spain", "USA", "Argentina"];
const yValues = [55, 49, 44, 24, 15];
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
  table = document.querySelector('#catTable tbody');
  // Dados
  data = [{
      "name": 1,
      "age": "Basta trazer de volta garrafas de vidro. Você não se importa com embalagens ecologicamente corretas usando todo aquele plástico volumoso; pelo menos ter uma opção de vidro para quem a) não compra plástico ou b) não quer aquelas garrafas enormes ocupando todo o espaço da geladeira",
      "breed": "Twitter"
    },
    {
      "name": 2,
      "age": "Prezados Decisores, Percebemos que os custos estão subindo. Estamos preparados para pagar um pouco mais por seus produtos que amamos. Não estamos preparados para tentar descascar um Kraft de um pedaço de plástico tão fino quanto a própria embalagem de plástico. Corrija isso, por favor",
      "breed": "Twitter"
    },
    {
      "name": 3,
      "age": "Honestamente, seria cada vez melhor para o meio ambiente se você usasse tampa de cânhamo",
      "breed": "Twitter"
    },
    {
      "name": 4,
      "age": "Não faça isso. Não faça isso. Use vidro ou plástico",
      "breed": "Twitter"
    },
    {
      "name": 5,
      "age": "Conserte seus malditos pacotes de mostarda, eles são muito difíceis de abrir. Pessoas desistem de tentar abrir e jogam fora",
      "breed": "Twitter"
    },
    {
      "name": 6,
      "age": "Que diabo de empresa de alimentos Kraft Heinz?!?! Você aumenta o preço de seus produtos Shake n Bake, mas não pode mais fornecer aos clientes as sacolas plásticas que vêm na caixa? Acho que as pessoas vão ficar com muita fome graças a você!",
      "breed": "Instagram"
    },
    {
      "name": 7,
      "age": "Sou grato por uma mudança potencialmente positiva, porque é muito importante. Que seja realmente um passo em uma direção mais saudável e sustentável e não (conhecida ou desconhecida) lavagem verde com consequências devastadoras. Gostaria muito de solicitar com muita gentileza que você altere a receita para que não contenha mais xarope de milho com alto teor de frutose, conhecido por causar problemas de saúde e como pai de um filho que adora ketchup, agradeceria profundamente. Outra coisa em minha mente para o nosso futuro mais saudável seria apoiar a agricultura orgânica regenerativa, e talvez você tenha os recursos para cultivar seus próprios ingredientes dessa maneira?! Isso seria tão emocionante para os consumidores, sabendo que seus produtos estão realmente criando um futuro mais saudável e sustentável! Obrigado",
      "breed": "Instagram"
    },
    {
      "name": 8,
      "age": "Uau! Isso é ótimo! Eu tenho uma pergunta, onde diabos estão as sacolas plásticas nas caixas do Shake n Bake?!?! Você os removeu, mas não se preocupou em declarar isso na caixa????? Depois de 50 anos você troca por um 'futuro mais sustentável'?! Dane-se o futuro, estou fazendo o jantar e dependo das malditas sacolas para o Shake n Bake! Retire já a palavra 'Shake' da sua embalagem! Vou comprar a marca de farinha de rosca panko de grande valor do Walmart agora porque INCLUEM as malditas sacolas !! Você perdeu um cliente. Boa sorte com o seu futuro!",
      "breed": "Facebook"
    },
    {
      "name": 9,
      "age": "Acabamos de perceber que o shake n bake não conterá mais um saco de agitação. A empresa diz que é para ser mais sustentável e sugere agora que o utilizador encontre um recipiente reutilizável (que tem de ser encontrado no armário e depois lavado com água e detergente). Nosso novo plano é evitar o produto de uma só vez e fazer nossa própria cobertura com farinha de rosca e temperos. Por quase US$ 3,00 a caixa, obrigado por nos incentivar a considerar a ideia de economizar dinheiro e salvar o meio ambiente. Tenho certeza de que muitos amigos concordarão e não usarão mais seu produto.",
      "breed": "Facebook"
    },
    {
      "name": 10,
      "age": "Nunca mais compraremos shake n bake .... eliminar as sacolas anula o propósito de toda a ideia ... e você nunca abaixou o preço .... não mais",
      "breed": "Facebook"
    },
    {
      "name": 11,
      "age": "Que tal colocar os shakers de volta nas caixas do Shake n Bake? Disseram que era uma maneira de manter o plástico fora dos aterros sanitários. Eu chamo BS sobre isso ... você poderia ter substituído os sacos de papel se você realmente fosse tão ambientalmente orientado. Era apenas mais uma forma de economizar às custas do consumidor. E você é muito mesquinho para mudar as instruções da caixa, que exigem o uso de “sacos fechados”. Vamos lá. Os consumidores não são estúpidos.",
      "breed": "Facebook"
    },
    {
      "name": 12,
      "age": "Acho que tirar as sacolas plásticas foi uma ótima ideia! Economiza dinheiro e o plástico não vai para o lixo. Usei sacolas plásticas de supermercado que guardo para reciclar ou coloco em vasilhame para sacudir! Boa ideia!",
      "breed": "Facebook"
    },
    {
      "name": 13,
      "age": "Acabei de comprar 2 shake n bake crispy Buffalo coating mix e nenhuma das caixas tinha os sacos de plástico incluídos! Muito desapontado com o produto, eles não os incluem mais?",
      "breed": "Facebook"
    },
    {
      "name": 14,
      "age": "Kraft Heinz Company Não se preocupe, Melanie. Eles pararam de incluir as sacolas plásticas nessas caixas - supostamente para impedir que mais plástico fosse para os aterros sanitários. Ha! Se fosse esse o caso, eles teriam substituído as sacolas de papel. Mais uma tentativa de economizar. Acabei de desligar o telefone com 'atendimento ao cliente' - provavelmente posso dizer que NÃO estou feliz.",
      "breed": "Facebook"
    },
    {
      "name": 15,
      "age": "Gail Marchand Varney, acho que foi uma boa ideia. Eu uso sacolas de supermercado que reciclo ou coloco em um recipiente e agito",
      "breed": "Facebook"
    }
  ];
  renderTable();

  // listen for sort clicks
  document.querySelectorAll('#catTable thead tr th').forEach(t => {
    t.addEventListener('click', sort, false);
  });

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
     <td>${c.name}</td>
     <td>${c.age}</td>
     <td>${c.breed}</td>
     </tr>`;
  });
  table.innerHTML = result;
}

function sort(e) {
  let thisSort = e.target.dataset.sort;
  if (sortCol === thisSort) sortAsc = !sortAsc;
  sortCol = thisSort;
  console.log('sort dir is ', sortAsc);
  data.sort((a, b) => {
    if (a[sortCol] < b[sortCol]) return sortAsc ? 1 : -1;
    if (a[sortCol] > b[sortCol]) return sortAsc ? -1 : 1;
    return 0;
  });
  renderTable();
}

function previousPage() {
  if (curPage > 1) curPage--;
  renderTable();
}

function nextPage() {
  if ((curPage * pageSize) < data.length) curPage++;
  renderTable();
}