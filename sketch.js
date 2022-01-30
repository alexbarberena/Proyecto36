var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood;
var foodObj;
var dogEat;

//crea aquí las variables feed y lastFed 
var feed;
var lastFed;


function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  //crea aquí el boton Alimentar al perro
  dogEat=createButton("Alimenta al perro") ;
  dogEat.position(680,95);
  dogEat.mousePressed(feedDog);
  
  addFood=createButton("Agregar Alimento");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

  lastFed=hour()
}

function draw() {
  
  background(46,139,87);
  foodObj.display();

  //escribe el código para leer el valor de tiempo de alimentación de la base de datos
  database.ref('/').update({
    FeedTime:lastFed
  })
 
  //escribe el código para mostrar el texto lastFed time aquí
  if(lastFed>=12){
    fill("white")
    text("Ultima hora en la que se alimento:" + lastFed + "PM",150,30);
  
  }else if(lastFed==0){
    fill("white")
    text("Ultima hora en la que se alimento : 12 PM",150,30);


  }
   else{
    fill("white")
    text("Ultima hora en la que se alimento :" + lastFed + "AM",150,30);
    
   }

 
  drawSprites();
}

//función para leer la Existencia de alimento
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


function feedDog(){
  dog.addImage(happyDog);
  
  //escribe el código aquí para actualizar las existencia de alimento, y la última vez que se alimentó al perro
  if (foodS==0)
  {
    fill("white")
    text("Consigue mas comida!",200,200);

  }else{
     foodS--;
     text("¡Dame mas!",800,300);
    } 

  text("¡Dame mas!",800,300);

  database.ref('/').update({
    Food:foodS
  })
  foodObj.getFedTime(lastFed);
  
}
//funcón para agregar alimento al almacén
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}
