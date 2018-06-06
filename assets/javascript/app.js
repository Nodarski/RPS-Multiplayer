// Chatbox content div
var messList = $("#messList");
// Chatbox content div

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


// firebase.auth().signInAnonymously().catch(function(error) {
//     // Handle Errors here.
//     var errorCode = error.code;
//     var errorMessage = error.message;
//     // ...
//     consol.log(errorMessage);
//   });


// Global Vars
  var playerOneChoice = "";
  var playerTwoChoice = "";
  var userName = "yo"; //=$("#inputName").val();
  var handSelect = "";
  var wins = 0;
  var losses = 0;
  var player=0;
  var playerWaiting=0;
// Global Vars

// Removes player data when diconnect
// Removes player data when diconnect


//Start splash screen on game start
  $("#startGame").on('click', function (event){
    event.preventDefault();
    $('#startGame').remove();
   userName =$("#inputName").val();
    
    $("#userWelcome").fadeOut(1000); //Splash Screen Fade out
 addStore();
 updateScore();
  });


;
//Start splash screen on game start

  
storesRef.on('value', function(snapshot){

    // check if player 2 is here
    // check if player 2 is here
      playerNum = snapshot.child('2').val();
      if (playerNum){
        $('#waitingForP').css('display', 'none');
        
        }

    $("#p1is").text('Player 1: ' + snapshot.child('1').child('name').val() + " with " + snapshot.child('1').child('Wins').val() + "wins!");
    $("#p2is").text('Player 2: ' + snapshot.child('2').child('name').val() + " with " + snapshot.child('2').child('Wins').val() + "wins!");

    $("#plWaiting").text()

// If player 1
// If player 1
      if (player === 1){
        playerTwoChoice = snapshot.child('2').child("RPorS").val()
        p2Status = snapshot.child('2').val();

        //playerTwoChoice = snapshot.val();

        playerOneChoice = snapshot.child('1').child('RPorS').val()
        console.log("P1 playerOneChoice =  " +playerOneChoice);
        console.log("P1 playerTwoChoice=  "+playerTwoChoice);
        
        if((playerTwoChoice==="fist" && playerOneChoice==="slap") ||(playerTwoChoice==="slap"&&playerOneChoice==="snip") || (playerTwoChoice==="snip"&&playerOneChoice==="fist")){
            console.log('you WIN!!')
            wins ++;
            handSelect = "";
            dispP2Choice()
            selectionMade();
            winUpdate();
            winnScreen();
            updateScore();
        }
        if((playerTwoChoice==="fist" && playerOneChoice==="snip") || (playerTwoChoice === "slap" && playerOneChoice==="fist")|| (playerTwoChoice==="snip"&& playerOneChoice==="slap")){
            console.log('youlose!!')
            losses++;
            handSelect = "";
            dispP2Choice()
            selectionMade();
            lossUpdate();
            lossScreen();
            updateScore();
        }
        if((playerOneChoice === "fist" && playerTwoChoice === "fist") || (playerOneChoice==="slap" && playerTwoChoice==="slap") || (playerOneChoice==="snip" && playerTwoChoice ==="snip")){
            handSelect = "";
            dispP2Choice()
            selectionMade();
            console.log("tie game!!");
            tieScreen();
        }







        if(!p2Status){
            $('#waitingForP').css('display', '');
        }

        

    }
    if (player===2){
        p1Status = snapshot.child('1').val();

        playerTwoChoice = snapshot.child('1').child("RPorS").val()

           

        playerOneChoice = snapshot.child('2').child("RPorS").val()

        console.log("P2 playerOneChoice =  " +playerOneChoice);
        console.log("P2 playerTwoChoice=  "+playerTwoChoice);

        if((playerTwoChoice==="fist" && playerOneChoice==="slap") ||(playerTwoChoice==="slap"&&playerOneChoice==="snip") || (playerTwoChoice==="snip"&&playerOneChoice==="fist")){
            console.log('you WIN!!')
            wins++;
            handSelect = "";
            dispP2Choice()
            selectionMade();
            winUpdate();
            winnScreen();
            updateScore();
        }
        if((playerTwoChoice==="fist" && playerOneChoice==="snip") || (playerTwoChoice === "slap" && playerOneChoice==="fist")|| (playerTwoChoice==="snip"&& playerOneChoice==="slap")){
            console.log('youlose!!')
            losses++;
            handSelect = "";
            dispP2Choice()
            selectionMade();
            lossUpdate();
            lossScreen();
            updateScore();
        }
        if((playerOneChoice === "fist" && playerTwoChoice === "fist") || (playerOneChoice==="slap" && playerTwoChoice==="slap") || (playerOneChoice==="snip" && playerTwoChoice ==="snip")){
            handSelect = "";
            dispP2Choice()
            selectionMade();
            console.log("tie game!!");
            tieScreen();
        }
        
        if(!p1Status){
            $('#waitingForP').css('display', '');
        }
        


    
    }
    if (player > 2){
        p2Status = snapshot.child('2').val();
        p1Status = snapshot.child('1').val();
        if(!p2Status || !p1Status){
            

            
           
            player = 0;
            $("#waitList").css("display","none");

            addStore();
                
             
         };
    };
    storesRef.child(`${player}`).onDisconnect().remove();

   console.log("player1 "+ playerOneChoice+"   player2 "+playerTwoChoice);
  });


function updateScore(){
    $("#winCount").text('wins: ' + wins);
    $("#lossCount").text('Losses: ' + losses);
}

function dispP2Choice(){
    console.log("#s"+playerTwoChoice);
    temp = "#s"+playerTwoChoice;
     $(temp).css('display','');
     setTimeout(function(){
        $(temp).css('display','none');
     },2000);
}



  
function winnScreen(){
    $("#winScreen").css('display','flex');

    setTimeout(function(){
        $("#winScreen").css('display','none');
        resetHands();
    },2000);
}

function lossScreen(){
    $("#lossScreen").css('display','flex');

    setTimeout(function(){
        $("#lossScreen").css('display','none');
        resetHands();
    },2000);
}

function tieScreen(){
    $("#tieScreen").css('display','flex');

    setTimeout(function(){
        $("#tieScreen").css('display','none');
        resetHands();
    },2000);
}


    

//Sets player number
  function addStore(){
    player++;
  storesRef.once('value', function(snapshot) {

    if (!snapshot.hasChild(`${player}`)){

        console.log('IM PLAYER' + player);
        storesRef.child(`${player}`).set({
            name: userName,
            "RPorS": handSelect,
            "Wins": wins,
            "losses": losses
          });
          if (player > 2){
              $("#waitList").css("display","flex");
              console.log('You have been put on the waiting list.. You are player# .. ' + player)
          }
        

        } else {
            
            addStore();
        };
        
   });

};
//Sets player number



 



   
  



// The Chat Function
// The Chat Function
// The Chat Function
// The Chat Function
database.ref().child('chat').on("child_added", function(childSnapshot){
console.log(this);
    var storeCurrVal = messList.val();
     if (storeCurrVal === undefined) {
         storeCurrVal = "";
     }
  
     var previousText = messList.text();

     messList.text(`${previousText}\n ${childSnapshot.val().username}: ${childSnapshot.val().message}`);

});



$("#submitMessage").on('click', function (event){
    event.preventDefault();
    var theMessage = $("#message").val();

    database.ref().child('chat').push({
        username: userName,
        message: theMessage
    })

    
    $("#message").val(""); 

});

///////////////////////////////////////////////////////////


function winUpdate(){
    storesRef.child(player).update({
        "Wins": wins
})
};

function lossUpdate(){
    storesRef.child(player).update({
        "losses":losses
})
};

function selectionMade(){
    storesRef.child(player).update({
    "RPorS": handSelect
})
};




// SELECT FIST
// SELECT FIST
// SELECT FIST
$("#gameArea").on("click", ".choseFist" , function(){
    handSelect = $(this).attr("id");
    selectionMade();
    console.log('I CHOSE =  ' + handSelect);
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
    console.log('I CHOSE =  ' + handSelect);
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
    console.log('I CHOSE =  ' + handSelect);
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
    handSelect = "";
    selectionMade()
    console.log('I CHOSE =  ' + handSelect);

    resetHands();
});

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