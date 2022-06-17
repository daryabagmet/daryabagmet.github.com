const draggableList = document.getElementById('draggable-list');
const checkOrderBtn = document.getElementById('check-btn');
const strongestMaterials = [
  'Graphene', 
  'Buckypaper', 
  'Metal glass', 
  'Dyneema', 
  'Lonsdaleite', 
  'Wurtizite boron nitride',
  'Diamond',
  'Nano-kevlar',
  'Silicon carbide',
  'Spiders Silk'
];

const listItems = [];
let dragStartIndex;

createList();

function createList() {
  [...strongestMaterials]
    .map(item => ({ title: item, sort: Math.random() }))
    .sort((item1, item2)=> item1.sort - item2.sort)
    .map(item => item.title)
    .forEach((item, index) => {
      const listItem = document.createElement('li');
      listItem.classList.add('draggable-list__item');
      listItem.setAttribute('data-index', index);
      listItem.innerHTML = `
        <span class="draggable-list__item-number">${index + 1}</span>
        <span class="draggable-list__item-content draggable" draggable="true">
          ${item}
        </span>
      `;

      listItems.push(listItem);
      draggableList.appendChild(listItem);
  });

  initEventListeners();
}

function dragStart() {
  dragStartIndex = this.closest('li').getAttribute('data-index');
  
}

function dragOver(e) {
	e.preventDefault();
}

function dragDrop(e) {
  const dragEndIndex = this.getAttribute('data-index');
  
  swapItems(dragStartIndex, dragEndIndex);

  this.classList.remove('over');
}

function swapItems(fromIndex, toIndex) {
  const itemOne = listItems[fromIndex].querySelector('.draggable');
  const itemTwo = listItems[toIndex].querySelector('.draggable');

  listItems[fromIndex].appendChild(itemTwo);
  listItems[toIndex].appendChild(itemOne);

}

function checkOrder() {
  listItems.forEach((item, index)=>{
    const material = item.querySelector('.draggable').innerText.trim();

    if(material !== strongestMaterials[index]) {
      item.classList.add('wrong');
    }else {
      item.classList.remove('wrong');
      item.classList.add('correct');
    }
  });
}

function initEventListeners() {
  const draggables = document.querySelectorAll('.draggable');
  const dragListItems = document.querySelectorAll('.draggable-list li');

  draggables.forEach(draggable => {
    draggable.addEventListener('dragstart', dragStart);
  });

  dragListItems.forEach((item) => {
			item.addEventListener('dragover', dragOver);
			item.addEventListener('drop', dragDrop);
  });

  checkOrderBtn.addEventListener('click', checkOrder);
  
}

