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

//Grafico dos dados

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
  data = 
  [{"name":"Fluffy","age":9,"breed":"calico","gender":"male"},
  {"name":"Luna","age":10,"breed":"long hair","gender":"female"},
  {"name":"Cracker","age":8,"breed":"fat","gender":"male"},
  {"name":"Pig","age":6,"breed":"calico","gender":"female"},
  {"name":"Robin","age":7,"breed":"long hair","gender":"male"},
  {"name":"Sammy","age":13,"breed":"fat","gender":"male"},
  {"name":"Aliece","age":9,"breed":"long hair","gender":"female"},
  {"name":"Mehatable","age":5,"breed":"calico","gender":"female"},
  {"name":"Scorpia","age":6,"breed":"long hair","gender":"female"},
  {"name":"Zoomies","age":1,"breed":"fat","gender":"male"},
  {"name":"Zues","age":5,"breed":"long hair","gender":"male"},
  {"name":"Lord Kittybottom","age":9,"breed":"calico","gender":"male"},
  {"name":"Princess Furball","age":5,"breed":"calico","gender":"female"},
  {"name":"Delerium","age":4,"breed":"fat","gender":"female"}];
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
        let start = (curPage-1)*pageSize;
        let end =curPage*pageSize;
        if(index >= start && index < end) return true;
  }).forEach(c => {
     result += `<tr>
     <td>${c.name}</td>
     <td>${c.age}</td>
     <td>${c.breed}</td>
     <td>${c.gender}</td>
     </tr>`;
  });
  table.innerHTML = result;
}

function sort(e) {
  let thisSort = e.target.dataset.sort;
  if(sortCol === thisSort) sortAsc = !sortAsc;
  sortCol = thisSort;
  console.log('sort dir is ', sortAsc);
  data.sort((a, b) => {
    if(a[sortCol] < b[sortCol]) return sortAsc?1:-1;
    if(a[sortCol] > b[sortCol]) return sortAsc?-1:1;
    return 0;
  });
  renderTable();
}

function previousPage() {
  if(curPage > 1) curPage--;
  renderTable();
}

function nextPage() {
  if((curPage * pageSize) < data.length) curPage++;
  renderTable();
}
  