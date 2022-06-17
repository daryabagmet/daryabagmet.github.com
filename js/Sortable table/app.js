const content = document.getElementById('content');
const sidebar = document.getElementById('sidebar');
const addBtn = document.getElementById('add-btn');
const doubleBtn = document.getElementById('double-btn');
const filterBtn = document.getElementById('filter-btn');
const sortBtn = document.getElementById('sort-btn');
const totalBtn = document.getElementById('total-btn');
const contentMsg = document.getElementById('content-msg');

let data =[];
let timeoutId = null;

getRandomUser();
getRandomUser();
getRandomUser();

async function getRandomUser() {
  const result = await fetch('https://randomuser.me/api');
  const data = await result.json();
  const user = data.results[0];

  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 1000000)
  };

  addData(newUser);
}

function addData(obj) {
  data.push(obj);

  updateDOM();
}

function updateDOM(providedData = data) {
  content.innerHTML = '<h2 class="content__title">Persons</h2>';

  providedData.forEach(person => {
    const element =  document.createElement('div');
    element.classList.add('content__item');
    element.innerHTML = `<span>${person.name}</span><span>${formattedMoney(person.money)}</span>`;

    content.appendChild(element);
  });

  clearTimeout(timeoutId);
}

function formattedMoney(number) {
  return `$ ${(number).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`;
}

function showMsg() {
  contentMsg.classList.add('shown');

  timeoutId = setTimeout(()=> {
			contentMsg.classList.remove('shown');
		}, 4000);
}

function getDoubledMoney() {
  data = data.map(person => {
    return {...person, money: person.money * 2}
  });

  updateDOM();
}

function getSortedMoney() {
  data = data.sort((a, b)=> b.money - a.money);

  updateDOM();
}

function getFilteredMoney() {
  let filteredData= data.filter(item => item.money > 1000000);

  if(filteredData.length > 0){
    data = filteredData;
    updateDOM();
  }else {
    showMsg();
  }
}

function getTotalMoney() {
  const total = data.reduce((num, person)=> (num += person.money), 0);
  
  const totalElement = document.createElement('div');
  totalElement.innerHTML = `<strong>${formattedMoney(total)}</strong>`
  totalElement.classList.add('content__total');
  content.appendChild(totalElement);
}

addBtn.addEventListener('click', getRandomUser);
doubleBtn.addEventListener('click', getDoubledMoney);
sortBtn.addEventListener('click', getSortedMoney);
filterBtn.addEventListener('click', getFilteredMoney);
totalBtn.addEventListener('click', getTotalMoney);