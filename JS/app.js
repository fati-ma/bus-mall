// 'use strict';

var names = ['bag.jpg', 'banana.jpg', 'bathroom.jpg', 'boots.jpg', 'breakfast.jpg',
  'bubblegum.jpg', 'chair.jpg', 'cthulhu.jpg', 'dog-duck.jpg', 'dragon.jpg',
  'pen.jpg', 'pet-sweep.jpg', 'scissors.jpg', 'shark.jpg', 'sweep.png', 'tauntaun.jpg',
  'unicorn.jpg', 'usb.gif', 'water-can.jpg', 'wine-glass.jpg'];

var leftImage = document.getElementById('leftImage');
var middleImage = document.getElementById('middleImage');
var rightImage = document.querySelector('#rightImage');

console.log(leftImage);
console.log(middleImage);
console.log(rightImage);

Product.all = [];

function Product(pName) {
  this.productName = pName;
  this.imagePath = `img/${pName}`;
  this.views = 0;
  this.clicks = 0;
  Product.all.push(this);
}

for (var i = 0; i < names.length; i++) {
  new Product(names[i]);
}

console.log(Product.all);

var leftImage, middleImage, rightImage;
var indecies = [];
var products = [];

function render() {
    
  var indecies = []; //array to store unique indecies for the images 
  while (indecies.length < 3) { //3 images max
  var randNum = Math.floor(Math.random() * Product.all.length);
  if (indecies.indexOf(randNum) < 0) { //making sure random number isn't in the indecies array yet
  indecies.push(randNum); //store the number into indecies array
  }
}
for (var i = 0; i < indecies.length; i++) { //loop through indecies array elements
  products[i] = Product.all[indecies[i]];
}

   leftProduct = products[0];
   middleProduct = products[1];
   rightProduct = products[2];

  // leftProduct = Product.all[randomNumber(0, Product.all.length - 1)];
  // middleProduct = Product.all[randomNumber(0, Product.all.length - 1)];
  // rightProduct = Product.all[randomNumber(0, Product.all.length - 1)];
  
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


}

function renderSummary() {
  imagesSection.removeEventListener('click', handleClickonProduct);

  var ulE1 = document.getElementById('finalResults');
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

  if (totalClicks < 25) {
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

      render();
    }
  } else if (totalClicks === 25) {
    document.getElementById("results").addEventListener("click", renderSummary);
    console.log(totalClicks);
  }

}

// function randomNumber(min, max) {
//   return Math.floor(Math.random() * (max - min + 1)) + min;
// }







































// 'use strict';

// var imageSelectionOne = document.getElementById('imageSelectionOne');
// var imageSelectionTwo = document.getElementById('imageSelectionTwo');
// var imageSelectionThree = document.getElementById('imageSelectionThree');
// var listOfData = document.getElementById('listOfData');


// var imageArray=[];
// var maxClicks = 25;
// var totalClicks = 0;
// var imageUsed = [1, 2, 3, 4, 5, 6];
// var showingList = false;


// // Constructor
// function ItemImage(name){
//   this.name = name;
//   this.filepath = `img/${name}.jpg`;
//   this.timesShown = 0;
//   this.timesSelected = 0;
//   imageArray.push(this);
// }

// // New Instances
// new ItemImage('bag');
// new ItemImage('banana');
// new ItemImage('bathroom');
// new ItemImage('boots');
// new ItemImage('breakfast');
// new ItemImage('bubblegum');
// new ItemImage('chair');
// new ItemImage('cthulhu');
// new ItemImage('dog-duck');
// new ItemImage('dragon');
// new ItemImage('pen');
// new ItemImage('pet-sweep');
// new ItemImage('scissors');
// new ItemImage('shark');
// // new ItemImage('sweep');
// new ItemImage('tauntaun');
// new ItemImage('unicorn');
// // new ItemImage('usb');
// new ItemImage('water-can');
// new ItemImage('wine-glass');

// // Function to append list to the DOM
// function makeList() {
//   if (!showingList) {

//     var ulEl = document.createElement('ul');

//     for (var i=0; i<imageArray.length; i++){
//       var liEl = document.createElement('li');
//       liEl.textContent = imageArray[i].name + ' was clicked ' + imageArray[i].timesSelected + ' times';
//       ulEl.appendChild(liEl);
//     }

//     listOfData.appendChild(ulEl);
//     showingList = true;

//     imageSelectionOne.removeEventListener('click', handleImageSelection);
//     imageSelectionTwo.removeEventListener('click', handleImageSelection);
//     imageSelectionThree.removeEventListener('click', handleImageSelection);
//   }
// }




// // Displays images
// function showRandomImage(socketEl){
//   // generate a random number 0-7
//   var randomIndex = Math.floor(Math.random() * imageArray.length);
//   while (imageUsed.includes(randomIndex)){
//     randomIndex = Math.floor(Math.random() * imageArray.length);
//   }
//   // assign src
//   socketEl.src = imageArray[randomIndex].filepath;
//   // assign title
//   socketEl.title = imageArray[randomIndex].name;
//   // assign the alt
//   socketEl.alt = imageArray[randomIndex].name;
//   // increment times shown
//   imageArray[randomIndex].timesShown++;
//   // Replaces items in used image array
//   imageUsed.shift();
//   imageUsed.push(randomIndex);
// }


// // Event handler
// function handleImageSelection(event){
//   console.log(event.target.alt);
//   totalClicks++;

//   for (var i=0; i < imageArray.length; i++) {
//     if(event.target.alt === imageArray[i].name) {
//       imageArray[i].timesSelected++;
//     }
//   }

//   if (totalClicks < maxClicks) {
//     showRandomImage(imageSelectionOne);
//     showRandomImage(imageSelectionTwo);
//     showRandomImage(imageSelectionThree);
//   } else {
//     makeList();
//   }
// }


// // Event listener
// imageSelectionOne.addEventListener('click', handleImageSelection);
// imageSelectionTwo.addEventListener('click', handleImageSelection);
// imageSelectionThree.addEventListener('click', handleImageSelection);


// // Function Calls
// showRandomImage(imageSelectionOne);
// showRandomImage(imageSelectionTwo);
// showRandomImage(imageSelectionThree);
