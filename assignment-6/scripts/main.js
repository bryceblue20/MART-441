var imageNames = ["image1", "image2", "image3", "image4","image5","image6","image7","image8", "image9", "image10"];
var blankPath = "images/spacequestionmark.jpeg";
var firstNumber = -1;
var secondNumber = -1;
var attempts = 0;
var allFound = 0;
// JSON declaration
var player = {"firstname":"", "lastname":"", "age":0, "score":0};

// create a variable with the blank image name
// create a empty array for the actual images
var spaceImages = new Array();

// add to the JSON from the textboxes
function addToEnd()
{
    var firstName = document.getElementById("txtFirstName").value;
    var lastName = document.getElementById("txtLastName").value;
    var age = document.getElementById("txtAge").value;
   
    player.firstname = firstName;
    player.lastname = lastName;
    player.age = age;
    localStorage.setItem("endInfo", JSON.stringify(player));
    window.location = "Main.html";

}    
function printQuestionMark()
{
   // call our random image creation function
    createRandomImageArray();
    // create a for loop
    for(var i = 0; i < imageNames.length; i++)
    {
    // iterate through the image tag ids and sets the source 
        document.getElementById(imageNames[i]).src= blankPath;
    }
         
}

function createRandomImageArray()
{
  
    var spaceImageArray = ["images/bestplanet.jpeg","images/carinae.jpeg","images/blackhole.jpeg","images/pillars.jpeg","images/galaxy.jpeg"]
    
    var count = [0,0,0,0,0];
   
    while(spaceImages.length < 10)
    {
       
        var randomNumber = Math.floor(Math.random() * spaceImageArray.length)
          // create an if statement that says if the total number added is less than 2, then
        // add the image to the actual image array
        if(count[randomNumber] < 5)
        {
            spaceImages.push(spaceImageArray[randomNumber]);
            // then add one to the array that makes sure only two images can be added
            count[randomNumber] = count[randomNumber] + 4;
        }
    }   
}

function changeImage(number)
{
    

    if(firstNumber >= 0)
    {
        secondNumber = number;
        document.getElementById(imageNames[number]).src = spaceImages[secondNumber];
        
    }
    else if(firstNumber < 0) 
    {
        firstNumber = number;
        document.getElementById(imageNames[firstNumber]).src= spaceImages[firstNumber];
    
    }


    if(spaceImages[secondNumber] != spaceImages[firstNumber] && firstNumber >= 0 && secondNumber >= 0)
    {
        score++;
        setTimeout(imagesDisappear, 200); 
    }
   
    else if(spaceImages[secondNumber] == spaceImages[firstNumber] && firstNumber >= 0 && secondNumber >= 0)
    {
        attempts++;
        allFound++;
        
        firstNumber = -1;
        secondNumber = -1;
        if(allFound == imageNames.length/2)
        {  
            player.score = attempts;
            localStorage.setItem("endInfo", JSON.stringify(player));
            window.location = "End.html";
        }
    }
}

function imagesDisappear()
{

    console.log(firstNumber);
    document.getElementById(imageNames[firstNumber]).src = blankPath;
    document.getElementById(imageNames[secondNumber]).src = blankPath;
    firstNumber = -1;
    secondNumber = -1;
}


function endInfo()
{
    var playerInformation = localStorage.getItem("endInfo");
    player = JSON.parse(playerInformation);
    var str = "Name: " + player.firstname + " " + player.lastname + "<br>" +
    "Age: " + player.age + "<br>" +
    "Attempts: " + player.score;
    if(document.getElementById("endResult") != null)
    {
        document.getElementById("endResult").innerHTML = str;
    }
    
   
}