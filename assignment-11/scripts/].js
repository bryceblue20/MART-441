var canvas;
var ctx;
var x = 50;
var y = 50;
var square1, square2,square3;
var direction;
var questions;
var squareArray = [];
var newJSONArray=[];
var score = 0;
$(document).ready(function(){
    $("#gameOver").hide();
    $("#controls").hide();
    $("#completed").hide();
    $("#key").hide();

    setup();
    setupNewJSON();  
    $(this).keypress(function(event){
        getKey(event);
        if (score == "10"){
            $("#completed").show();
            $("#key").show();
         }

        
            });
});



function setup()
{
    canvas = document.getElementById("myCanvas");
    ctx = canvas.getContext("2d");

    square1 = new Square(100,100,50,50,"#0000FF");
    //square2 is collidible
    square2 = new Square(660,370,40,40,"#FFFF00");
    square3 = new Square(760,0,60,60,"#000000");
    $.getJSON("information.json", function(data) {
        for(var i = 0; i < data.squares.length; i++)
        {
            squareArray.push(new Square(data.squares[i].x,data.squares[i].y, data.squares[i].h, data.squares[i].w, data.squares[i].color));
        }
        drawSquare();
    });
    
}

function setupNewJSON()
{

    $.getJSON("information2.json", function(data) {
        for(var i = 0; i < data.newJObjects.length; i++)
        {
            
            newJSONArray.push(new Square(data.newJObjects[i].x,data.newJObjects[i].y, data.newJObjects[i].h, data.newJObjects[i].w, data.newJObjects[i].color));
        }

        drawSquare();
    });
    
}
function getKey(event)
{
    $("#controls").fadeOut();
    var char = event.which || event.keyCode;
    var actualLetter = String.fromCharCode(char);
    if(actualLetter == "w")
    {
        moveUp();
        direction = "up";
    }
    if(actualLetter == "s")
    {
        moveDown();
        direction = "down";
    }
    if(actualLetter == "a")
    {
        moveLeft();
        direction = "left";
    }
    if(actualLetter == "d")
    {
        moveRight();
        direction = "right";
    }
    var test = hasCollided(square1,square2);
  
    for(var i = 0; i < squareArray.length; i++)
    {

     var test2 = hasCollided(square1,squareArray[0]);
     var test3 = hasCollided(square1,squareArray[1]);
     var test4 = hasCollided(square1,squareArray[2]);
     var test5 = hasCollided(square1, squareArray[3]);
     var test6 = hasCollided(square1, squareArray[4]);
     var test7 = hasCollided(square1, squareArray[5]);
     var test8 = hasCollided(square1, squareArray[6]);
     var test9 = hasCollided(square1, squareArray[7]);
     var test10 = hasCollided(square1, squareArray[8]);
    }
    if(test)
    {
        score++;
   square2.x-=800;
    }
    drawSquare(); 
    if(test2)
    {
        score++;
   squareArray[0].x-=800;
    }
    drawSquare(); 
     if(test3)
    {
        score++;
   squareArray[1].x-=800; 
    }
    drawSquare(); 
    if(test4)
    {
        score++;
   squareArray[2].x-=800;
    }
    drawSquare(); 
    if(test5)
    {
        score++;
   squareArray[3].x-=800;
    }
    drawSquare();
    if(test6)
    {
        score++;
   squareArray[4].x-=800;
    }
    drawSquare();
    if(test7)
    {
        score++;
   squareArray[5].x-=800;
    }
    drawSquare();
    if(test8)
    {
        score++;
   squareArray[6].x-=800;
    }
    drawSquare();
    if(test9)
    {
        score++;
   squareArray[7].x-=800; 
    }
    drawSquare();
    if(test10)
    {
        score++;
   squareArray[8].x-=800; 
    }
    drawSquare();
}
 

function moveUp()
{
    square1.y-=10;
}
function moveDown()
{
    square1.y+=10;
}
function moveRight()
{
    square1.x+=10;
}
function moveLeft()
{
    square1.x-=10;
}

function drawSquare()
{
    ctx.clearRect(0,0,800,600);
    ctx.fillStyle = square1.mainColor;
    ctx.fillRect(square1.x, square1.y, square1.width, square1.height);
    ctx.fillStyle = square2.mainColor;
    ctx.fillRect(square2.x, square2.y, square2.width, square2.height);
    ctx.fillStyle = square3.mainColor;
    ctx.fillRect(square3.x, square3.y, square3.width, square3.height);
    for(var i = 0; i < squareArray.length; i++)
    {
        ctx.fillStyle = squareArray[i].mainColor;
        ctx.fillRect(squareArray[i].x, squareArray[i].y, squareArray[i].width, squareArray[i].height);
    }
    for(var i = 0; i < newJSONArray.length; i++)
    {
        ctx.fillStyle = newJSONArray[i].mainColor;
        ctx.fillRect(newJSONArray[i].x, newJSONArray[i].y, newJSONArray[i].width, newJSONArray[i].height);
    }



    ctx.font = "30px Arial";
    ctx.fillStyle = "#FFFFFF"; 
    ctx.fillText("Score: " + score, 10, 50); 
   

}




function hasCollided(object1, object2) {
    return !(
        ((object1.y + object1.height) < (object2.y)) ||
        (object1.y > (object2.y + object2.height)) ||
        ((object1.x + object1.width) < object2.x) ||
        (object1.x > (object2.x + object2.width))
    );
    }


