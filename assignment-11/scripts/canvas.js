var canvas;
var ctx;
var x = 50;
var y = 50;
var square1, square2, square3;

var objectsArray = [];
var holesArray=[];
var score = 0;
$(document).ready(function(){
    $("#gameOver").hide();
    $("#controls").hide();
    $("#completed").hide();
    $("#key").hide();
    $("#exitImage").hide();
    $("#outOfCave").hide();
    $("#restart").hide();

    createObjects();
    nonCollidableObjects();  

    $(this).keypress(function(event){
        getKey(event);
    
        if (score == "10"){
            $("#completed").fadeIn();
            $("#key").fadeIn();
            $("#title").fadeOut();
            $("#about").fadeOut();
         }

    });
    $("#showInstructions").click(function(){
        $(this).fadeOut();
        $("#controls").fadeIn();
        
            });
});



function createObjects()
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
            objectsArray.push(new Square(data.squares[i].x,data.squares[i].y, data.squares[i].h, data.squares[i].w, data.squares[i].color));
        }
        drawObjects();
    });
    
}

function nonCollidableObjects()
{

    $.getJSON("information2.json", function(data) {
        for(var i = 0; i < data.newJObjects.length; i++)
        {
            
            holesArray.push(new Square(data.newJObjects[i].x,data.newJObjects[i].y, data.newJObjects[i].h, data.newJObjects[i].w, data.newJObjects[i].color));
        }

        drawObjects();
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
    var collect = touchActive(square1,square2);
  
    for(var i = 0; i < objectsArray.length; i++)
    {

     var collect2 = touchActive(square1,objectsArray[0]);
     var collect3 = touchActive(square1,objectsArray[1]);
     var collect4 = touchActive(square1,objectsArray[2]);
     var collect5 = touchActive(square1, objectsArray[3]);
     var collect6 = touchActive(square1, objectsArray[4]);
     var collect7 = touchActive(square1, objectsArray[5]);
     var collect8 = touchActive(square1, objectsArray[6]);
     var collect9 = touchActive(square1, objectsArray[7]);
     var collect10 = touchActive(square1, objectsArray[8]);
     var game = touchActive(square1,square3);
    }
    if(collect)
    {
        score++;
   square2.x-=800;
    }
    drawObjects(); 
    if(collect2)
    {
        score++;
        objectsArray[0].x-=800;
    }
    drawObjects(); 
     if(collect3)
    {
        score++;
        objectsArray[1].x-=800; 
    }
    drawObjects(); 
    if(collect4)
    {
        score++;
        objectsArray[2].x-=800;
    }
    drawObjects(); 
    if(collect5)
    {
        score++;
        objectsArray[3].x-=800;
    }
    drawObjects();
    if(collect6)
    {
        score++;
        objectsArray[4].x-=800;
    }
    drawObjects();
    if(collect7)
    {
        score++;
        objectsArray[5].x-=800;
    }
    drawObjects();
    if(collect8)
    {
        score++;
        objectsArray[6].x-=800;
    }
    drawObjects();
    if(collect9)
    {
        score++;
        objectsArray[7].x-=800; 
    }
    drawObjects();
    if(collect10)
    {
        score++;
        objectsArray[8].x-=800; 
    }
    drawObjects();
    if(game)
    {
     $("#exitImage").fadeIn();
     $("#outOfCave").fadeIn();
     $("#gameOver").fadeOut();
     $("#controls").fadeOut();
     $("#completed").hide();
     $("#key").hide();
     $("#about").fadeOut();
     $("#title").fadeOut();
     $("#myCanvas").fadeOut();
     $("#restart").show();
     $("#showInstructions").hide();
    }
    drawObjects();
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

function drawObjects()
{
    ctx.clearRect(0,0,800,600);
    ctx.fillStyle = square1.mainColor;
    ctx.fillRect(square1.x, square1.y, square1.width, square1.height);
    ctx.fillStyle = square2.mainColor;
    ctx.fillRect(square2.x, square2.y, square2.width, square2.height);
    ctx.fillStyle = square3.mainColor;
    ctx.fillRect(square3.x, square3.y, square3.width, square3.height);
    for(var i = 0; i < objectsArray.length; i++)
    {
        ctx.fillStyle = objectsArray[i].mainColor;
        ctx.fillRect(objectsArray[i].x, objectsArray[i].y, objectsArray[i].width, objectsArray[i].height);
    }
    for(var i = 0; i < holesArray.length; i++)
    {
        ctx.fillStyle = holesArray[i].mainColor;
        ctx.fillRect(holesArray[i].x, holesArray[i].y, holesArray[i].width, holesArray[i].height);
    }



    ctx.font = "30px Arial";
    ctx.fillStyle = "#FFFFFF"; 
    ctx.fillText("Fragments Found: " + score, 10, 50); 
   

}




function touchActive(object1, object2) {
    return !(
        ((object1.y + object1.height) < (object2.y)) ||
        (object1.y > (object2.y + object2.height)) ||
        ((object1.x + object1.width) < object2.x) ||
        (object1.x > (object2.x + object2.width))
    );
    }
