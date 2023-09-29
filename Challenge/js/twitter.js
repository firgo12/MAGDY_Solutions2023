let dropdown = document.getElementsByClassName("dropdown-btn");
const ctx = document.getElementById('myChart_feedback');
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
      "feedback": "Basta trazer de volta garrafas de vidro. Você não se importa com embalagens ecologicamente corretas usando todo aquele plástico volumoso; pelo menos ter uma opção de vidro para quem a) não compra plástico ou b) não quer aquelas garrafas enormes ocupando todo o espaço da geladeira.",
      "nCurtidas": 0,
      "data": "30/03/2023",
      "user": " @SuzytheFox",
      "post": "https://twitter.com/KraftHeinzCo/status/1524020222050586634"
    },
    {
      "codigo": 2,
      "feedback": "Prezados Decisores, Percebemos que os custos estão subindo. Estamos preparados para pagar um pouco mais por seus produtos que amamos. Não estamos preparados para tentar descascar um Kraft de um pedaço de plástico tão fino quanto a própria embalagem de plástico. Corrija isso, por favor.",
      "nCurtidas": 0,
      "data": "18/12/2022",
      "user": "@Pkbpeanut31",
      "post": "https://twitter.com/KraftHeinzCo/status/1552360510615683075"
    },
    {
      "codigo": 3,
      "feedback": "Honestamente, seria cada vez melhor para o meio ambiente se você usasse tampa de cânhamo",
      "nCurtidas": 2,
      "data": "30/05/2022",
      "user": "@08MamaKitti08",
      "post": "https://twitter.com/KraftHeinzCo/status/1524020222050586634"
    },
    {
      "codigo": 4,
      "feedback": "Não faça isso. Não faça isso. Use vidro ou plástico",
      "nCurtidas": 1,
      "data": "24/09/2022",
      "user": " @peachsugar",
      "post": "https://twitter.com/KraftHeinzCo/status/1524020222050586634"
    },
    {
      "codigo": 5,
      "feedback": "Conserte seus malditos pacotes de mostarda, eles são muito difíceis de abrir. Pessoas desistem de tentar abrir e jogam fora",
      "nCurtidas": 0,
      "data": "19/10/2022",
      "user": "@CreekHug",
      "post": "https://twitter.com/KraftHeinzCo/status/1564718043950899200"
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