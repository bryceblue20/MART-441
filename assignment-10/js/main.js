var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var x = 50;
var y = 50;
var x2 = 100;
var y2 = 100;
var x3= 700;
var y3= 350;
var square1;
var square2;
var square3;


createtheSquares();
placeNewSquares();
setInterval(movetheGreenSquare, 400);

function createtheSquares() {
    square1 = new Square(x, y, 20, 70, "blue");
    square2 = new Square(x2, y2, 80, 80, "green");
    square3 = new Square(x3, y3, 70, 70, "red");
}

function movetheGreenSquare() {
 square2.setX(Math.floor(Math.random() * canvas.width));
 square2.setY(Math.floor(Math.random() * canvas.height));
    placeNewSquares();
}

 //replaces and then draws new squares when movement based function is called
function placeNewSquares() {
    ctx.clearRect(0, 0, 750, 400);
    ctx.fillStyle = square1.theColor;
    ctx.fillRect(square1.theX, square1.theY, square1.theWidth, square1.theHeight);

    ctx.fillStyle = square2.theColor;
    ctx.fillRect(square2.theX, square2.theY, square2.theWidth, square2.theHeight);

    ctx.fillStyle = square3.theColor;
    ctx.fillRect(square3.theX, square3.theY, square3.theWidth, square3.theHeight);

}

$(document).ready(function () {
    $("#message").hide();
    $("#message2").hide();
    $("#restart").hide();
    $("#controls").hide();
});
    $(this).keypress(function (event) {
        getKey(event);
     
    });
$("#showInstructions").click(function(){
    $(this).fadeOut();
    $("#controls").fadeIn();
    
        });


function getKey(event) {
$("#title").fadeOut();
$("#controls").fadeOut();

    var didTouch = touchActive(square1, square2);
    var didTouch2 = touchActive2(square1, square3);
  
    if (didTouch) {
     
        canvas.style.backgroundImage = "url('https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/A_black_image.jpg/640px-A_black_image.jpg')";
        square2.setWidth(square2.theWidth + 110);
        square2.setHeight(square2.theHeight + 110);
        $("#message").fadeIn();
        $("#restart").fadeIn();
        square1 = new Square(x, y, 20, 70, "black");

    }

    if (didTouch2) {

        canvas.style.backgroundImage = "url('hangar.jpg')";
        $("#mainmessage").hide();
        $("#message2").fadeIn();
        $("#restart").fadeIn();
        square2.setWidth(square2.theWidth - 40);
        square2.setHeight(square2.theHeight - 40);
        square3.setWidth(square2.theWidth - 20);
        square3.setHeight(square2.theHeight - 20);
    }

    var char = event.which || event.keyCode;
    var actualLetter = String.fromCharCode(char);
    if (actualLetter == "w") {
        moveUp();
    } else if (actualLetter == "s") {
        moveDown();
    } else if (actualLetter == "d") {
        moveRight();
    } else if (actualLetter == "a") {
        moveLeft();
    }

    
}


function moveUp() {
    square1.setY(square1.theY - 10);
    //replaces and then draws new squares when movement based function is called
    placeNewSquares();
}

function moveDown() {
    square1.setY(square1.theY + 10);
    placeNewSquares();
}

function moveLeft() {
    square1.setX(square1.theX - 10);
    placeNewSquares();
}

function moveRight() {
    square1.setX(square1.theX + 10);
    placeNewSquares();
}

function moveUp2() {
    square3.setY(square3.theY - 10);
    placeNewSquares();
}

function moveDown2() {
    square3.setY(square3.theY + 10);
    placeNewSquares();
}

function moveLeft2() {
    square3.setX(square3.theX - 10);
    placeNewSquares();
}

function moveRight2() {
    square3.setX(square3.theX + 10);
    placeNewSquares();
}

function touchActive(object1, object2) {
    return !(
        ((object1.y + object1.height) < (object2.y)) ||
        (object1.y > (object2.y + object2.height)) ||
        ((object1.x + object1.width) < object2.x) ||
        (object1.x > (object2.x + object2.width))
    );
}
function touchActive2(object1, object3) {
    return !(
        ((object1.y + object1.height) < (object3.y)) ||
        (object1.y > (object3.y + object3.height)) ||
        ((object1.x + object1.width) < object3.x) ||
        (object1.x > (object3.x + object3.width))
    );
}


