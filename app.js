'use strict';

// console.log('AHHHHHH')

// product constructor function

// display products with a prototype method
// display 3 products
// randomize products
// product array
// product vote counter
// convert votes to percentages
// determine which picture cliked on
// event listen & clickHander
// updates global counter
// convert votes to percentage

// -------------------- Global Variables --------------------//
const leftProductImgElement = document.getElementById('leftProductImg');
const leftProductH3Element = document.getElementById('leftProductH3');
const middleProductImgElement = document.getElementById('middleProductImg');
const middleProductH3Element = document.getElementById('middleProductH3');
const rightProductImgElement = document.getElementById('rightProductImg');
const rightProductH3Element = document.getElementById('rightProductH3');

let leftProduct = null;
let middleProduct = null;
let rightProduct = null;

let rounds = 25

// -------------------- Constructor Function --------------------//

function Product(name, image) {
  this.name = name;
  this.image = image;
  this.timesShown = 0;
  this.votes = 0;
}

// -------------------- Prototype --------------------//

Product.prototype.renderProduct = function (img, h3) {
  img.src = this.image;
  h3.textContent = this.name;
  this.timesShown++;
}

Product.allProducts = [];

// -------------------- Global Functions --------------------//
function randomProducts () {
  let leftProduct = Math.floor(Math.random() * Product.allProducts.length);
  let middleProduct = Math.floor(Math.random() * Product.allProducts.length)
  let rightProduct = Math.floor(Math.random() * Product.allProducts.length);

    while (leftProduct === undefined || leftProduct === rightProduct) {
      leftProduct = Math.floor(Math.random() * Product.allProducts.length);
    }
    while (middleProduct === undefined || middleProduct === leftProduct || middleProduct === rightProduct) {
      middleProduct = Math.floor(Math.random() * Product.allProducts.length);
    }
  }

  leftProduct = Product.allProducts[leftProduct]
  middleProduct = Product.allProducts[middleProduct];
  rightProduct = Product.allProducts[rightProduct]

renderThreeProducts(leftProduct, middleProduct, rightProduct);

function renderThreeProducts(leftProduct, middleProduct, rightProduct) {
  leftProduct.renderProduct(leftProductImgElement, leftProductH3Element);
  middleProduct.renderProduct(middleProductImgElement, middleProductH3Element);
  rightProduct.renderProduct(rightProductImgElement, rightProductImgElement);
}

function clickHandler(event) {
  console.log(event.target);
  if (event.target === leftProductImgElement || event.target === middleProductImgElement || rightProductImgElement) {
    rounds--;
    if (event.target === leftProductImgElement) {
        leftProduct.votes++;
      } else if (event.target === rightProductImgElement) {
        rightProduct.votes++;
      } else {
        middleProduct.votes++;
    }
    if (rounds === 0) {
      allProductsSectionElem.removeEventListener(click.clickHandler)
    }
    renderResults();
  }
  randomProducts();
}

function renderRestults() {
  const ulElement = document.getElementById('l1')
  leftProductImgElement.textContent = `${product.name}: ${product.votes}`
  ulElement.appendChild(liElement);
}



// -------------------- Listeners --------------------//

allProductsSectionElem.addEventListener('click', clickHander)

// -------------------- Call Function --------------------//

new Product('Bag2D2', './img/bag.jpg');
new Product('BananaSlicer', './img/banana.jpg');
new Product('BathroomReading', './img/bathroom.jpg')
new Product('Bootdles', './img/boots.jpg')
new Product('BreakfastInOne', './img/breakfast.jpg')
new Product('BubblegumMeatballs', './img/bubblegum.jpg')
new Product('ChairSupreme', './img/chair.jpg')
new Product('CthulhuFigure', './img/cthulhu.jpg')
new Product('DoggieDuckLips', './img/dog-duck.jpg')
new Product('DragonMeat', './img/dragon.jpg')
new Product('Pentensils', './img/pen.jpg')
new Product('PetSweep', './img/pet-sweep.jpg')
new Product('Pissors', './img/scissors.jpg')
new Product('SharkBag', './img/shark.jpg')
new Product('Swiffsie', './img/sweep.png')
new Product('TauntaunBag', './img/tauntaun.jpg')
new Product('UnicornMeat', './img/unicorn.jpg')
new Product('WateringCan', './img/water-can.jpg')
new Product('Wine-OGlass', './img/wine-glass.jpg')

randomProducts();