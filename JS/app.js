// 'use strict';

var names = ['bag', 'banana', 'bathroom', 'boots', 'breakfast',
  'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon',
  'pen', 'pet-sweep', 'scissors', 'shark', 'sweep', 'tauntaun',
  'unicorn', 'usb', 'water-can', 'wine-glass'];

var leftImage = document.getElementById('leftImage');
var middleImage = document.getElementById('middleImage');
var rightImage = document.getElementById('rightImage');

console.log(leftImage);
console.log(middleImage);
console.log(rightImage);

Product.all = [];

function Product(pName) {
  this.productName = pName;

  if (pName == 'usb') {
    this.imagePath = `img/${pName}.gif`;
  } else if (pName == 'sweep') {
    this.imagePath = `img/${pName}.png`;
  } else {
    this.imagePath = `img/${pName}.jpg`;
  }

  this.views = 0;
  this.clicks = 0;

  Product.all.push(this);
}

for (var i = 0; i < names.length; i++) {
  new Product(names[i]);

  // var product = new Product(names[i]);
  // product.getImagePath();

}

// Product.prototype.getImagePath = function(){
//   if (this.productName == 'usb'){
//     this.imagePath = `img/${this.productName}.gif`;
//   } else if (this.productName == 'sweep'){
//     this.imagePath = `img/${this.productName}.png`;
//   } else{
//     this.imagePath = `img/${this.productName}.jpg`;
//   }
// }

console.log(Product.all);

var leftImage, middleImage, rightImage;
// var indecies = [];
// var products = [];

var alreadyDisplayed = [];

function render() {

  var randomLeft = Math.floor(Math.random() * Product.all.length);
  var randomMiddle = Math.floor(Math.random() * Product.all.length);
  var randomRight = Math.floor(Math.random() * Product.all.length);

  while (randomLeft === randomRight || randomMiddle === randomRight || randomMiddle === randomLeft || alreadyDisplayed.includes(randomLeft) || alreadyDisplayed.includes(randomMiddle) || alreadyDisplayed.includes(randomRight)) {
    randomLeft = Math.floor(Math.random() * Product.all.length);
    randomMiddle = Math.floor(Math.random() * Product.all.length);
    randomRight = Math.floor(Math.random() * Product.all.length);
  }


  leftProduct = Product.all[randomLeft];
  middleProduct = Product.all[randomMiddle];
  rightProduct = Product.all[randomRight];
  localStorage.setItem('Products Array of objects', JSON.stringify(Product.all));

  console.log(leftProduct);
  console.log(middleProduct);
  console.log(rightProduct);

  leftImage.setAttribute('src', leftProduct.imagePath);
  leftImage.setAttribute('alt', leftProduct.productName);
  leftImage.setAttribute('title', leftProduct.productName);

  middleImage.setAttribute('src', middleProduct.imagePath);
  middleImage.setAttribute('alt', middleProduct.productName);
  middleImage.setAttribute('title', middleProduct.productName);

  rightImage.setAttribute('src', rightProduct.imagePath);
  rightImage.setAttribute('alt', rightProduct.productName);
  rightImage.setAttribute('title', rightProduct.productName);

  alreadyDisplayed[0] = randomLeft;
  alreadyDisplayed[1] = randomMiddle;
  alreadyDisplayed[2] = randomRight;

}

function renderSummary() {
  imagesSection.removeEventListener('click', handleClickonProduct);

  var ulE1 = document.getElementById('resultsList');
  for (var i = 0; i < Product.all.length; i++) {
    var liE = document.createElement('li');
    ulE1.appendChild(liE);

    liE.textContent = `${Product.all[i].productName} has ${Product.all[i].clicks} clicks and ${Product.all[i].views} views`;
  }
}

render();

var totalClicks = 0;

var imagesSection = document.querySelector('#imagesSection');
imagesSection.addEventListener('click', handleClickonProduct);

function handleClickonProduct(event) {

  console.log(event.target.id);

  if (totalClicks < 10) {
    if (event.target.id !== 'imagesSection') {

      totalClicks++;
      console.log(totalClicks);

      rightProduct.views++;
      middleProduct.views++;
      leftProduct.views++;

      
      if (event.target.id === 'leftImage') {
        leftProduct.clicks++;
      }

      if (event.target.id === 'middleImage') {
        middleProduct.clicks++;

      }
      if (event.target.id === 'rightImage') {
        rightProduct.clicks++;
      }
      
      localStorage.setItem('Number of clicks', JSON.stringify(totalClicks));

      render();
    }
  } else if (totalClicks === 10) {
    document.getElementById("results").addEventListener("click", renderSummary);
    document.getElementById("results").addEventListener("click", createChartSummary);
    console.log(totalClicks);

  }
}
  

function getFromStorage() {

  totalClicks = JSON.parse(localStorage.getItem('Number of clicks'));
  Product.all = JSON.parse(localStorage.getItem('Products Array of objects')) || [];
  render();
}

getFromStorage();

function createChartSummary() {

  var productsArr = [];
  var clicksArr = [];
  var viewsArr = [];
  for (var i = 0; i < Product.all.length; i++) {
    productsArr.push(Product.all[i].productName);
    clicksArr.push(Product.all[i].clicks);
    viewsArr.push(Product.all[i].views);
  }


  var ctx = document.getElementById('barChart').getContext('2d');
  var barChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: productsArr,
      datasets: [{
        label: '# of clicks',
        data: clicksArr,
        backgroundColor:
        'rgba(255, 99, 132, 1)',
        borderColor:
          'rgba(54, 162, 235, 1)',
        borderWidth: 2
      },
      {
        label: '# of Views',
        data: viewsArr,
        backgroundColor:
        'rgba(54, 162, 235, 1)',
        borderColor:
          'rgba(255, 99, 132, 1)',
        borderWidth: 3
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });
}



















  // My previous code that I want to update 

  // var indecies = []; //array to store unique indecies for the images 
  // while (indecies.length < 3) { //3 images max
  //   var randNum = Math.floor(Math.random() * Product.all.length);
  //   if (indecies.indexOf(randNum) < 0) { //making sure random number isn't in the indecies array yet
  //     indecies.push(randNum); //store the number into indecies array
  //   }
  // }
  // for (var i = 0; i < indecies.length; i++) { //loop through indecies array elements
  //   products[i] = Product.all[indecies[i]];
  // }

  // leftProduct = products[0];
  // middleProduct = products[1];
  // rightProduct = products[2];


  // function randomNumber(min, max) {
  //   return Math.floor(Math.random() * (max - min + 1)) + min;
  // }

  // do {
  //   leftProduct = Product.all[randomNumber(0, Product.all.length - 1)];
  //   middleProduct = Product.all[randomNumber(0, Product.all.length - 1)];
  //   rightProduct = Product.all[randomNumber(0, Product.all.length - 1)];
  // }
  // while (leftProduct === rightProduct || middleProduct === rightProduct || middleProduct === leftProduct)



































