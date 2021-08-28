'use strict';

// console.log('AHHHHHHHH!');


// global variables

const leftImageElement = document.getElementById('leftImg');
const centerImageElement = document.getElementById('centerImg');
const rightImageElement = document.getElementById('rightImg');
const productSectionElement = document.getElementById('products');

let leftProduct = null;
let rightProduct = null;
let centerProduct = null;

let rounds = 25;

// constructor function

function Product(name, image) {
  this.name = name;
  this.image = image;
  this.timesShown = 0;
  this.timesClicked = 0;
}

// protoype
Product.allProducts = [];
Product.prototype.renderOneProduct = function(imageElement) {
  imageElement.src = this.image;
  this.timesShown++;
}

// functions
function makeNewProduct(name, image) {
  Product.allProducts.push(new Product(name, image));
}

function renderThreeProducts() {
  const leftChoice = Math.floor(Math.random() * Product.allProducts.length);
  leftProduct = Product.allProducts[leftChoice];

  while (!rightProduct || rightProduct === leftProduct) {
    const rightChoice = Math.floor(Math.random() * Product.allProducts.length);
    rightProduct = Product.allProducts[rightChoice];
  }

  while (!centerProduct || centerProduct === leftProduct || centerProduct === rightProduct) {
    const centerChoice = Math.floor(Math.random() * Product.allProducts.length);
    centerProduct = Product.allProducts[centerChoice];
  }

  leftProduct.renderOneProduct(leftImageElement);
  rightProduct.renderOneProduct(rightImageElement);
  centerProduct.renderOneProduct(centerImageElement);

}

function renderResults() {
  const resultsElement = document.getElementById('results');
  resultsElement.innerHTML = '';
  for (let product of Product.allProducts) {
    const liElement = document.createElement('li');
    liElement.textContent = `${product.name} was shown ${product.timesShown} times and was clicked ${product.timesClicked} times.`;
    resultsElement.appendChild(liElement);
  }
}


function handleClick(event) {
  console.log(event.target);
  const validTargets = [leftImageElement, rightImageElement, centerImageElement];
  if (validTargets.includes(event.target)) {
    rounds--;
    if (event.target === validTargets[0]) {
      validTargets[0].timesClicked++;
    } else if (event.target === validTargets[1]) {
      validTargets[1].timesClicked++;
    } else {
      validTargets[2].timesClicked++;
    }
    if (rounds === 0) {
      productSectionElement.removeEventListener('click', handleClick);
      alert('Thank you for voting!');
      renderResults();
    } else {
      renderThreeProducts();
    }
  }
}

//don't think i have this quite right

function getRandomProduct() {
  const unavailableProducts = [leftProduct, centerProduct, rightProduct];
  
  while(unavailableProducts.includes(leftProduct)) {
    let leftProduct = Math.floor(Math.random() * Product.allProducts.length);
    leftProduct = Product.allProducts[leftProduct];
  }
  unavailableProducts.push(leftProduct);

  while(unavailableProducts.includes(centerProduct)) {
    let centerProduct = Math.floor(Math.random() * Product.allProducts.length);
    centerProduct = Product.allProducts[centerProduct];
  }
  unavailableProducts.push(centerProduct);

  while(unavailableItems.includes(rightProduct)) {
    let rightProduct = Math.floor(Math.random() * Product.allProducts.length);
    rightProduct = Product.allProducts[rightProduct];
  }
  unavailableProducts.push(rightProduct);
  renderAllItems();
}

//listeners
productSectionElement.addEventListener('click', handleClick);


//call functions
makeNewProduct('Bag2D2', './img/bag.jpg');
makeNewProduct('BananaSlicer', './img/banana.jpg');
makeNewProduct('BathroomMedia', './img/bathroom.jpg');
makeNewProduct('Bootles', './img/boots.jpg');
makeNewProduct('Breakfast3000', './img/breakfast.jpg');
makeNewProduct('BubbleMeatGum', './img/bubblegum.jpg');
makeNewProduct('Chairwow', './img/chair.jpg');
makeNewProduct('CthulhuFigure', './img/cthulhu.jpg');
makeNewProduct('DoggieDuckLips', './img/dog-duck.jpg');
makeNewProduct('DragonMeat', './img/dragon.jpg');
makeNewProduct('Pentensils', './img/pen.jpg');
makeNewProduct('Pwiffer', './img/pet-sweep.jpg');
makeNewProduct('Pizzers', './img/scissors.jpg');
makeNewProduct('SharkBagO', './img/shark.jpg');
makeNewProduct('Swonsie', './img/sweep.png');
makeNewProduct('TauntaunBag', './img/tauntaun.jpg');
makeNewProduct('Unicorn Meat', './img/unicorn.jpg');
makeNewProduct('Watering Can', './img/water-can.jpg');
makeNewProduct('Wine Glass', './img/wine-glass.jpg');

renderThreeProducts();
renderChart();



// chart - first attempt, using sara's color scheme until i can play with my own

function renderChart() {
  const itemData = [];
  const itemLabels = [];

  for (let item of Item.allItems) {
    itemData.push(item.votes);
    itemLabels.push(item.name);
  }

var ctx = document.getElementById('myChart').getContext('2d');
var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: itemLabels,
        datasets: [{
            label: 'Tallied Results',
            data: itemData,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)'
            ],
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
}

// local storage

function getProductsFromStorage() {
  const stringifiedProducts = localStorage.getItem('productsInStorage')
  if(stringifiedProducts) {
    const parsedProducts = JSON.parse(stringifiedProducts)
    console.log(parsedProducts)
    for(let Product of parsedProducts) {
      const myProduct = new Item(item.name, item.image);
      Product.parsedProducts.push(myProduct);
    }
    renderResults();
  } else {
    alert('no productst');
  }
}

function storeProducts() {
  const stringifiedProducts = JSON.stringify(Product.allProducts);
  console.log(stringifiedProducts)
  localStorage.setProduct('itemsInStorage', stringifiedProducts)
}

getProductsFromStorage();






// trying something new below, but it's not working too well either... 

// 'use strict'

// // console.log('All hail the mighty glow cloud.')

// //global variables

// const leftImageElement = document.getElementById('leftImg');
// const centerImageElement = document.getElementById('centerImg');
// const rightImageElement = document.getElementById('rightImg');

// const leftH3Elem = document.getElementById('leftH3');
// const centerH3Elem = document.getElementById('centerH3');
// const rightH3Elem = document.getElementById('rightH3');


// const productSectionElement = document.getElementById('products'); 

// let leftProduct = null;
// let rightProduct = null;
// let centerProduct = null;

// let rounds = 25;

// //constructor function

// function Product(name, image) {
//   this.name = name;
//   this.image = image;
//   this.userViews = 0;
//   this.userClicks = 0;
// }



// //prototype methods
// Product.allproducts = [];

// Product.prototype.renderOneProduct = function(imageElement, h3Element) {
//   imageElement.src = this.image;
//   h3Element.textContent = this.name;
//   this.userViews++;
// }

// // functions
// function makeNewProduct(name, image) {
//   Product.allProducts.push(new Product(name, image));
// }

// function getRandomProducts(){
//   const recycleProducts = [leftProduct, centerProduct, rightProduct];
//   while(recycleProducts.includes(leftProduct)) {
//     let leftOption = Math.floor(Math.random () * Product.allproducts.length);
//     leftProduct = Product.allproducts[leftOption];
//   }
//   recycleProducts.push(leftProduct)
//   while(recycleProducts.includes(centerProduct)) {
//     let centerOption = Math.floor(Math.random () * Product.allproducts.length);
//     centerProduct = Product.allproducts[centerOption];
//   }
//   recycleProducts.push(centerProducts)
//   while(recycleProducts.includes(rightProtduct)) {
//     let rightOption = Math.floor(Math.random () * Product.allproducts.length);
//     rightProtduct = Product.allproducts[rightOption];
//   }
//   renderAllItems();
// }

// function renderThreeProducts() {
//   leftProduct.renderOneProduct(leftImageElement, leftH3Elem);
//   centerProduct.renderOneProduct(centerImageElement, centerH3Elem);
//   rightProduct.renderOneProduct(rightImageElement, rightH3Elem);
// }

// function clickHandle(event) {
//   let yesClick = event.target.id;
//   // console.log(yesClick);
//   if (yesClick === 'leftImg' || yesClick === 'middleImg' || yesClick === 'rightImg') {
//     rounds--;
//     if (yesClick === 'leftImg') {
//       leftProduct.votes++;
//     } else if (yesClick === 'middleImg') {
//       centerProduct.votes++;
//     } else if (yesClick === 'rightImg') {
//       rightProduct.votes++;
//     }
//   } else {
//     alert('Invalid vote.');
//   }
//   if (rounds === 0) {
//     allProductSectionElement.removeEventListener('click', clickHandle);
//     alert('Thank you for voting. Results now available for viewing.');
//   } else {
//     renderResults();
//     getRandomProducts();
//     renderThreeProducts();
//   }
// }

// function renderResults() {
//   const resultsElement = document.getElementById('results');
//   resultsElement.innerHTML = '';
//   for (let product of Product.allProducts) {
//     const liElement = document.createElement('li');
//     liElement.textContent = `${product.name} was shown ${product.timesShown} times and was clicked ${product.timesClicked} times.`;
//     resultsElement.appendChild(liElement);
//   }
// }

// //listeners

// productSectionElement.addEventListener('click', clickHandle);

// // call functions

// new Product('Bag2D2', './img/bag.jpg');
// new Product('BananaSlicer', './img/banana.jpg');
// new Product('BathroomMedia', './img/bathroom.jpg');
// new Product('Bootles', './img/boots.jpg');
// new Product('Breakfast3000', './img/breakfast.jpg');
// new Product('BubbleMeatGum', './img/bubblegum.jpg');
// new Product('Chairwow', './img/chair.jpg');
// new Product('CthulhuFigure', './img/cthulhu.jpg');
// new Product('DoggieDuckLips', './img/dog-duck.jpg');
// new Product('DragonMeat', './img/dragon.jpg');
// new Product('Pentensils', './img/pen.jpg');
// new Product('Pwiffer', './img/pet-sweep.jpg');
// new Product('Pizzers', './img/scissors.jpg');
// new Product('SharkBagO', './img/shark.jpg');
// new Product('Swonsie', './img/sweep.png');
// new Product('TauntaunBag', './img/tauntaun.jpg');
// new Product('Unicorn Meat', './img/unicorn.jpg');
// new Product('Watering Can', './img/water-can.jpg');
// new Product('Wine Glass', './img/wine-glass.jpg');

// renderThreeProducts();
// // renderChart();

