//Create variables here
var dog, dogImg1, happyDogImg, database, foodS, foodStock, readStock;
var foodObj, feedTime, lastFed, feed, addFoods, feedDog;
function preload()
{
	//load images here
  dogImg = loadImage("images/dogImg.png");
  happyDogImg = loadImage("images/happydogImg.png");
}

function setup() {
	createCanvas(800, 500);
  database = firebase.database();
  foodObj = new Food();
  foodStock = database.ref('Food');
  foodStock.on("value", readStock);
  foodStock.set(20);
  

  dog = createSprite(650,150,10,60);
  dog.addImage(dogImg);
  dog.scale = 0.15;

  feed = createButton("Feed the dog");
  feed.position(700,70);
  feed.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.position(800,70);
  addFood.mousePressed(addFoods);
}


function draw() {  
background("green");

foodObj.display();

fedTime = database.ref('FeedTime');
fedTime.on("value", function(data){
  lastFed = data.val();
})

fill(225,225,254);
textSize(15);
if(lastFed >= 12){
  text("Last Feed: " + lastFed %12 + "PM", 200, 30);
}
else if(lastFed == 0){
  text("Last Feed: 12AM ", 350, 30);
}
else{
  text("Last Feed: " + lastFed + "AM", 350, 30);
}

  drawSprites();
  //add styles here
  }



function readStock(data){
  foodStock = data.val();
  foodObj.updateFoodStock(foodS);
}

function feedDog(){
  dog.addImage(happyDogImg);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food: foodObj.getFoodStock(),
    FeedTime : hour()
  })
}

function addFoods(){
  foodS++;
  database.ref('/').update({
    Food: foodS
  })
}