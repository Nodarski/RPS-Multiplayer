

// Initialize Firebase
  var config = {
    apiKey: "AIzaSyDUPVsnligdqsfy0-TxJv5JLYPpnxcMyAo",
    authDomain: "rockpaperscissorgame-3603b.firebaseapp.com",
    databaseURL: "https://rockpaperscissorgame-3603b.firebaseio.com",
    projectId: "rockpaperscissorgame-3603b",
    storageBucket: "rockpaperscissorgame-3603b.appspot.com",
    messagingSenderId: "683427928744"
  };

  firebase.initializeApp(config);

  var database = firebase.database();
  var rootRef = firebase.database().ref();
// Initialize Firebase

// Stores player data
  var storesRef = rootRef.child('Players');
// Stores player data



// Global Vars
  var playerOneChoice = "";//Local Player
  var playerTwoChoice = "";//Second player
  var userName = "yo"; //=$("#inputName").val();
  var handSelect = "";//Local Player's hand choice
  var wins = 0;//Local Player's number of wins
  var losses = 0;//Local player's number of losses
  var messList = $("#messList");//Chat box Div
  var player=0;//Local player's current player number
  var playerWaiting=0;//number of player total in lobby ***TO-DO
// Global Vars



//Start splash screen on game start
  $("#startGame").on('click', function (event){
    event.preventDefault();
    $('#startGame').remove();//Remove start game button, needed because P2 can become Player 3 as well if button is clicked fast enough
    userName =$("#inputName").val();//User name inputted here
    
    $("#userWelcome").fadeOut(1000); //Splash Screen Fade out
 
    addStore();//Determines players number
 
    updateScore();//pushes current score into HTML, should be 0/0 here..
  });
//Start splash screen on game start

  
//Pulls player data from Firebase
//bulk of game mechanics here!!
storesRef.on('value', function(snapshot){

    // check if player 2 is here
      playerNum = snapshot.child('2').val();//checks if Player 2 exists in Firebase
        if (playerNum){
            $('#waitingForP').css('display', 'none');//removes watingForP2 Icon
        };
    // check if player 2 is here
    
    //Pushes Players 1 && 2 names and scores into HTML
    $("#p1is").text('Player 1: ' + snapshot.child('1').child('name').val() + " with " + snapshot.child('1').child('Wins').val() + " wins!");
    $("#p2is").text('Player 2: ' + snapshot.child('2').child('name').val() + " with " + snapshot.child('2').child('Wins').val() + " wins!");
    //Pushes Players 1 && 2 names and scores into HTML

    $("#plWaiting").text(); // How many players waiting to play

// If player 1
// If player 1
      if (player === 1){
        p2Status = snapshot.child('2').val();//check is second player is still here
            if(!p2Status){
                $('#waitingForP').css('display', '');// adds waitingForP2 icon
            }

        playerTwoChoice = snapshot.child('2').child("RPorS").val() //Listening for Players 2 choice
        
        //If Player 2 Made a choice, but Player did not
            if(playerTwoChoice==="fist" || playerTwoChoice==="snip" || playerTwoChoice==="slap"){
                $("#p2Chosen").css('display','');
                $('#chooseWep').css('display','');
            }
            if(playerTwoChoice===''){
                $("#p2Chosen").css('display','none');
                $('#chooseWep').css('display','none');
            }
        //If Player 2 Made a choice, but Player did not


        playerOneChoice = snapshot.child('1').child('RPorS').val()//Checks when Local Players choice eneters the DB
        
        //When Local Player's Choice beat second Player's Choice
        if((playerTwoChoice==="fist" && playerOneChoice==="slap") ||(playerTwoChoice==="slap"&&playerOneChoice==="snip") || (playerTwoChoice==="snip"&&playerOneChoice==="fist")){
            wins ++; // Wins + 1
            handSelect = ""; // Resets Local Player's Choice
            dispP2Choice() // Displays Player 2 Choice
            selectionMade(); //Updates DB with current player Choice (Currently === "")
            winUpdate(); // Updates DB with Score
            winnScreen(); // Displays win Splash Screen
            updateScore(); //Updates score on HTML
        }
        //When Second Player's Choice beats Local Player's choice
        if((playerTwoChoice==="fist" && playerOneChoice==="snip") || (playerTwoChoice === "slap" && playerOneChoice==="fist")|| (playerTwoChoice==="snip"&& playerOneChoice==="slap")){
            losses++;// Losses + 1
            handSelect = "";//Resets Local Player's Choice
            dispP2Choice()// Displays Player 2 Choice
            selectionMade();//Updates DB with current player Choice (Currently === "")
            lossUpdate();// Updates DB with Score
            lossScreen();// Displays loss Splash Screen
            updateScore();//Updates score on HTML
        }
        //When Local player and Player 2 have tied
        if((playerOneChoice === "fist" && playerTwoChoice === "fist") || (playerOneChoice==="slap" && playerTwoChoice==="slap") || (playerOneChoice==="snip" && playerTwoChoice ==="snip")){
            handSelect = "";//Resets Local Player's Choice
            dispP2Choice()//Displays players 2 Choice
            selectionMade();//Updates DB with current player Choice (Currently === "")
            tieScreen();//Displays Tie screen
        }
    }

//if player 2
    if (player===2){

        p1Status = snapshot.child('1').val();
            if(!p1Status){
                $('#waitingForP').css('display', '');
            }

        playerTwoChoice = snapshot.child('1').child("RPorS").val()
            if(playerTwoChoice==="fist" || playerTwoChoice==="snip" || playerTwoChoice==="slap"){
                $("#p2Chosen").css('display','');
                $('#chooseWep').css('display','');
            }
            if(playerTwoChoice===''){
                $("#p2Chosen").css('display','none');
                $('#chooseWep').css('display','none');
            }
           

        playerOneChoice = snapshot.child('2').child("RPorS").val()

        //if win
        if((playerTwoChoice==="fist" && playerOneChoice==="slap") ||(playerTwoChoice==="slap"&&playerOneChoice==="snip") || (playerTwoChoice==="snip"&&playerOneChoice==="fist")){
            wins++;
            handSelect = "";
            dispP2Choice()
            selectionMade();
            winUpdate();
            winnScreen();
            updateScore();
        }
        //if lose
        if((playerTwoChoice==="fist" && playerOneChoice==="snip") || (playerTwoChoice === "slap" && playerOneChoice==="fist")|| (playerTwoChoice==="snip"&& playerOneChoice==="slap")){
            losses++;
            handSelect = "";
            dispP2Choice()
            selectionMade();
            lossUpdate();
            lossScreen();
            updateScore();
        }
        //if tie
        if((playerOneChoice === "fist" && playerTwoChoice === "fist") || (playerOneChoice==="slap" && playerTwoChoice==="slap") || (playerOneChoice==="snip" && playerTwoChoice ==="snip")){
            handSelect = "";
            dispP2Choice()
            selectionMade();
            tieScreen();
        }
    
    }
//if there are already 2 Players
    if (player > 2){
        p2Status = snapshot.child('2').val();
        p1Status = snapshot.child('1').val();
        //if Player 1 or player 2 disconnect
        if(!p2Status || !p1Status){
            player = 0;
            $("#waitList").css("display","none");

            addStore();//goes to player selector
                
         };
    };

    // If any player disconnect, delete DB data
    // If any player disconnect, delete DB data
    storesRef.child(`${player}`).onDisconnect().remove();
  });

// Update HTML score Data
// Update HTML score Data
function updateScore(){
    $("#winCount").text('wins: ' + wins);
    $("#lossCount").text('Losses: ' + losses);
}


//Displays Other Player's Choice
//Displays Other Player's Choice
function dispP2Choice(){
    temp = "#s"+playerTwoChoice;
     $(temp).css('display','');
     setTimeout(function(){
        $(temp).css('display','none');
     },2000);
}
//Displays Other Player's Choice


//Displays Win Screen
//Displays Win Screen
function winnScreen(){
    $("#winScreen").css('display','flex');

    setTimeout(function(){
        $("#winScreen").css('display','none');
        resetHands();
    },2000);
}
//Displays Win Screen


//Displays Loss Screen
//Displays Loss Screen
function lossScreen(){
    $("#lossScreen").css('display','flex');

    setTimeout(function(){
        $("#lossScreen").css('display','none');
        resetHands();
    },2000);
}
//Displays Loss Screen


//Displays Tie Screen
//Displays Tie Screen
function tieScreen(){
    $("#tieScreen").css('display','flex');

    setTimeout(function(){
        $("#tieScreen").css('display','none');
        resetHands();
    },2000);
}
//Displays Tie Screen



//Sets player number
//Sets player number
  function addStore(){
    player++; //Player + 1
    storesRef.once('value', function(snapshot) {
    //Check if Player Number doesnt exists in DB
        if (!snapshot.hasChild(`${player}`)){
        //Set Player data
            storesRef.child(`${player}`).set({
                name: userName,
                "RPorS": handSelect,
                "Wins": wins,
                "losses": losses
          });
        //if there are more than 2 players
          if (player > 2){
              $("#waitList").css("display","flex");//Wait-list Splash Screen
          }
        } else {
              addStore();//Re-Loops functions
        };
   });
};
//Sets player number



// The Chat Function
// The Chat Function
database.ref().child('chat').on("child_added", function(childSnapshot){
    var storeCurrVal = messList.val();//messList = Chat box Div
        //if Null, dont
         if (storeCurrVal === undefined) {
            storeCurrVal = "";
            }
  //store current chats
     var previousText = messList.text();
// add new chats from DB, without overwriting the old
     messList.text(`${previousText}\n ${childSnapshot.val().username}: ${childSnapshot.val().message}`);
});

//On Click submit, message
$("#submitMessage").on('click', function (event){
    event.preventDefault();
    //text in chat text box
    var theMessage = $("#message").val();
    //push username/message to DB
    database.ref().child('chat').push({
        username: userName,
        message: theMessage
    });

    //clear chat text box
    $("#message").val(""); 
});


//Update win count in DB
function winUpdate(){
    storesRef.child(player).update({
        "Wins": wins
    });
};

//Update Loss count in DB
function lossUpdate(){
    storesRef.child(player).update({
        "losses":losses
    });
};

//Update Local player's choice to DB
function selectionMade(){
    storesRef.child(player).update({
    "RPorS": handSelect
    });
};




// SELECT FIST
// SELECT FIST
// SELECT FIST
$("#gameArea").on("click", ".choseFist" , function(){
    handSelect = $(this).attr("id"); //buttons have IDs corresponding to their symbols
    selectionMade(); //update DB with choice

    //CSS Animations/Move to left/ Fist on Top
    $("#fist").animate({
        left: "10%",
        opacity:1  
    }).css("z-index", "1").attr( "class","selected")
    $("#slap").animate({
        left: "10%",
        opacity:0
    }).css("z-index", "0").attr( "class","selected")
    $("#snip").animate({
        left: "10%",
        opacity:0
    }).css("z-index", "0").attr( "class","selected")
})


        
// SELECT SNIP
// SELECT SNIP
// SELECT SNIP
$("#gameArea").on("click",".choseSnip", function(){
    handSelect = $(this).attr("id");
    selectionMade()

    //animation / snip on top / to the left
    $("#fist").animate({
        left: "10%",
        opacity:0  
    }).css("z-index", "0").attr( "class","selected");
    $("#slap").animate({
        left: "10%",
        opacity:0
    }).css("z-index", "0").attr( "class","selected")
    $("#snip").animate({
        left: "10%",
        opacity:1
    }).css("z-index", "1").attr( "class","selected");
})


// SELECT SNAP
// SELECT SNAP
// SELECT SNAP
$("#gameArea").on("click",".choseSlap", function(){
    handSelect = $(this).attr("id");
    selectionMade() 
    //animations// snap on top / to the left
    $("#fist").animate({
        left: "10%",
        opacity:0  
    }).css("z-index", "0").attr( "class","selected");
    $("#slap").animate({
        left: "10%",
        opacity:1
    }).css("z-index", "1").attr( "class","selected");
    $("#snip").animate({
        left: "10%",
        opacity:0
    }).css("z-index", "0").attr( "class","selected")
})


// RESET CHOICE
// RESET CHOICE
// RESET CHOICE
$("#gameArea").on("click",".selected", function(){
    handSelect = ""; //resets variable
    selectionMade()
    resetHands(); // to reset animation
});


//Reset animation
function resetHands(){
$("#fist").animate({
    left: "50%",
    opacity:1  
}).css("z-index", "").attr( "class","choseFist")
$("#slap").animate({
    left: "30%",
    opacity:1
}).css("z-index", "").attr( "class","choseSlap")
$("#snip").animate({
    left: "10%",
    opacity:1
}).css("z-index", "").attr( "class","choseSnip")
};