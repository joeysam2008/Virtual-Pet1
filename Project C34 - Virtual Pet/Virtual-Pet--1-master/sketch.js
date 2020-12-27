var dog, dogImg, happyDog;
var database, foodS, foodStock;

function preload()
{
  dogImg = loadImage("dogImg.png");
  happyDog = loadImage("dogImg1.png");
  
}

function setup() {
 createCanvas(600, 580);

 database = firebase.database();

  dog = createSprite(250, 400,3, 3);
  dog.addImage(dogImg);
  dog.scale = 0.2;
  

  foodStock = database.ref('Food'); 
  foodStock.on("value", readStock);
  
}

//function to read values from database
function readStock(data){
  foodS = data.val()
}

function draw() { 
  background(46,139,87)



  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happyDog);
  }
  else if(keyWentUp(UP_ARROW)){
    dog.addImage(dogImg);
  }


  drawSprites();

  textSize(18);
  stroke("red")
  fill("white")
  text("Press UP_ARROW key to feed Timmy milk!",100,40)
  text("Food Remaining: "+ foodS, 200, 250 )

}

function writeStock(x){

  if(x<=0){
    x = 0
  }
  else{
    x = x-1
  }

  database.ref('/').update({
      'Food': x,
  })

}



