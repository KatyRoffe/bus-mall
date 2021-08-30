'use strict';
// console.log("why?")

// global variables
const ulElem = document.getElementById('votingUL');
const prodSectionElem = document.getElementById('prodSection');
const buttonElem = document.getElementById('viewResults');


const leftImgElem = document.getElementById('leftImg');
const leftH3Elem = document.getElementById('leftH3');

const centerImgElem = document.getElementById('centerImg');
const centerH3Elem = document.getElementById('centerH3');

const rightImgElem = document.getElementById('rightImg');
const rightH3Elem = document.getElementById('rightH3');


let leftItem = null;
let centerItem = null;
let rightItem = null;

let clickCounter = 0;
const roundsOfVoting = 25;



// constructor

function Item (name, imgPath) {
  this.name = name;
  this.imgPath = imgPath;
  this.views = 0;
  this.likes = 0;
  this.likesPercentage = 0;
}

Item.allItems = [];

//prototype

Item.prototype.renderItem = function (img, H3) {
  img.src = this.imgPath;
  H3.textContent = this.name;
}

Item.prototype.getLikesPercentage = function () {
  this.likesPercentage = Number(this.likes / this.views * 100).toFixed(2);
}

// global functions

function getThreeItems() {
  const currentItems = [leftItem, centerItem, rightItem];
  while (currentItems.includes(leftItem)){
    let leftItemChoice = Math.floor(Math.random() * Item.allItems.length);
    leftItem = Item.allItems[leftItemChoice];
  }
  currentItems.push(leftItem);

  while (currentItems.includes(centerItem)){
    let centerItemChoice = Math.floor(Math.random() * Item.allItems.length);
    centerItem = Item.allItems[centerItemChoice];
  }
  currentItems.push(centerItem);

  while (currentItems.includes(rightItem)){
    let rightItemChoice = Math.floor(Math.random() * Item.allItems.length);
    rightItem = Item.allItems[rightItemChoice];
  }
  currentItems.push(rightItem);

  leftItem.views++;
  centerItem.views++;
  rightItem.views++;
}

function renderNewItems() {
  leftItem.renderItem(leftImgElem, leftH3Elem);
  centerItem.renderItem(centerImgElem, centerH3Elem);
  rightItem.renderItem(rightImgElem, rightH3Elem);
}

function renderResults() {
  ulElem.textContent = '';
  for (let item of Item.allItems) {
    console.log(item);
    let liElem = document.createElement('li');
    if (item.views === 0) {
      liElem.textContent = `${item.name} was not viewed.`;
      ulElem.appendChild(liElem);
    }
    else {
      item.getLikesPercentage();
      liElem.textContent = `${item.name}: ${item.likes} likes`;
      ulElem.appendChild(liElem);
    }
  }
}


function handleButtonClick(){
  renderChart();
  putInStorage();
  buttonElem.removeEventListener('click', handleButtonClick);
}

// event listener

prodSectionElem.addEventListener('click', handleClick);
buttonElem.addEventListener('click', handleButtonClick);

//calling functions

getFromStorage();
getThreeItems();
renderNewItems();


//chart

function renderChart(){
  const ctx = document.getElementById('chart').getContext('2d');
  let myItemNameArr = [];
  let myViewsArr = [];
  let myLikesArr = [];
  let myLikesPercentageArr = [];

  for(let item of Item.allItems){
    myItemNameArr.push(item.name);
    myViewsArr.push(item.views);
    myLikesArr.push(item.likes);
    myLikesPercentageArr.push(item.likesPercentage);
  }

  var itemsChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: myItemNameArr,
      datasets: [{
          id: 'views',
          label: 'Views',
          data: myViewsArr,
          backgroundColor: 'yellow',
          borderColor: 'grey',
          borderWidth: 2
        },{
        id: 'likes',
        label: 'Likes',
        data: myLikesArr,
        backgroundColor: 'red',
        borderColor: 'grey',
        borderWidth: 2
      },{
        id: 'percentage',
        label: 'Percentage',
        data: myLikesPercentageArr,
        backgroundColor: 'blue',
        borderColor: 'grey',
        borderWidth: 2
      }]
    },
    options: {      
      plugins: {
        title: {
          text: 'Voting Results',
          display: true,
          font: {
            size: 20
          },
          padding: 15
        },
        legend: {
          position: 'bottom'
        }},
      layout: {
        padding: {
          top: 50
        }
      },
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}

function handleClick(e) {
  let imageClicked = e.target.id;
  console.log(imageClicked);
  if (imageClicked === 'leftImg' || imageClicked === 'centerImg' || imageClicked === 'rightImg') {
    clickCounter++;
      if (imageClicked === 'leftImg') {
      leftItem.likes++;
    } if (imageClicked === 'centerImg') {
      centerItem.likes++;
    } if (imageClicked === 'rightImg') {
      rightItem.likes++;
    } if (clickCounter === roundsOfVoting) {
    alert('Thank you for voting! All hail Bus Mall.');
    buttonElem.style.display = 'block';
    prodSectionElem.removeEventListener('click', handleClick);
    renderResults();
    } else {
    getThreeItems();
    renderNewItems();
    }
  } else {
    alert('Please select an option. All hail Bus Mall.');
  }
  
}


//storage
function getFromStorage() {
  let storedItems = localStorage.getItem('items');
  if (storedItems) {
    let parsedItems = JSON.parse(storedItems);
    console.log(parsedItems);
    for (let item of parsedItems) {
      let newItem = new Item(item.name, item.imgPath)
      newItem.views = item.views;
      newItem.likes = item.likes;
      Item.allItems.push(newItem);
    }
    renderResults();
  } else {
      Item.allItems.push(new Item('Bag2D2', './img/bag.jpg'));
      Item.allItems.push(new Item('Banana Slicer', './img/banana.jpg'));
      Item.allItems.push(new Item('Bathroom Media', './img/bathroom.jpg'));
      Item.allItems.push(new Item('Bootdles', './img/boots.jpg'));
      Item.allItems.push(new Item('Breakfast2020', './img/breakfast.jpg'));
      Item.allItems.push(new Item('BubbleMeat Gum', './img/bubblegum.jpg'));
      Item.allItems.push(new Item('Chair?', './img/chair.jpg'));
      Item.allItems.push(new Item('Cthulhu Figure', './img/cthulhu.jpg'));
      Item.allItems.push(new Item('Doggie Duck Lips', './img/dog-duck.jpg'));
      Item.allItems.push(new Item('Dragon Meat', './img/dragon.jpg'));
      Item.allItems.push(new Item('Pentensil', './img/pen.jpg'));
      Item.allItems.push(new Item('Pwiffer Shoes', './img/pet-sweep.jpg'));
      Item.allItems.push(new Item('Pizzers', './img/scissors.jpg'));
      Item.allItems.push(new Item('SharkBagO', './img/shark.jpg'));
      Item.allItems.push(new Item('Swonsie', './img/sweep.png'));
      Item.allItems.push(new Item('Tauntaun Sleeper', './img/tauntaun.jpg'));
      Item.allItems.push(new Item('Unicorn Meat', './img/unicorn.jpg'));
      Item.allItems.push(new Item('Watering Cant', './img/water-can.jpg'));
      Item.allItems.push(new Item('Wine-Oh! Glass', './img/wine-glass.jpg'));
  }
}

function putInStorage() {
  let preppedItems = JSON.stringify(Item.allItems);
  localStorage.setItem('items', preppedItems);
}
