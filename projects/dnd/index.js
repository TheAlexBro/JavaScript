/* Задание со звездочкой */

/*
 Создайте страницу с кнопкой.
 При нажатии на кнопку должен создаваться div со случайными размерами,
 цветом и позицией на экране
 
 Необходимо предоставить возможность перетаскивать созданные div при помощи drag and drop
 
 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем,
 что встроено в браузер
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу,
 то добавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
import './dnd.html';

const homeworkContainer = document.querySelector('#app');
const addDivBtn = document.querySelector('#addDiv');

let currentDrag;
let startX = 0;
let startY = 0;

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
};

const getRandomColor = () => {
  return `rgb(${getRandomInt(0, 255)}, ${getRandomInt(0, 255)}, ${getRandomInt(0, 255)})`;
};

const createDiv = () => {
  const minSize = 50;
  const maxSize = 200;

  const block = document.createElement('div');
  block.classList.add('draggable-div');
  block.style.width = `${getRandomInt(minSize,maxSize)}px`;
  block.style.height = `${getRandomInt(minSize,maxSize)}px`;
  block.style.background =  getRandomColor();
  block.setAttribute('draggable', 'true');
  block.style.left = `${getRandomInt(10,window.innerWidth)}px`;
  block.style.top = `${getRandomInt(10,window.innerHeight)}px`;

  block.addEventListener('mousedown', e => {
    e.preventDefault();
    currentDrag = block;
    startX = e.offsetX;
    startY = e.offsetY;
    block.style.zIndex = 100;
  });
  block.addEventListener('mouseup', () => {
    currentDrag = false;
    block.style.zIndex = 0;
  })
 
  return block;
};

document.addEventListener('mousemove', e => {
  if (currentDrag) {
    currentDrag.style.left = e.clientX - startX + 'px';
    currentDrag.style.top = e.clientY - startY + 'px'; 
  }
});

addDivBtn.addEventListener('click', e => {
  const div = createDiv();
  homeworkContainer.appendChild(div);
});


