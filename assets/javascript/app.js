
var messList = $("#messList");

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
  var storesRef = rootRef.child('Players');


  var playerOneChoice = "";
  var playerTwoChoice = "";
  var userName = "yo";
  var handSelect = "";
  var wins = 0;
  var losses = 0;
  var player = 1;

storesRef.child(`${player}`).onDisconnect().remove();



  $("#startGame").on('click', function (event){
    event.preventDefault();
   userName =$("#inputName").val();

    $("#userWelcome").fadeOut(1000); 
 addStore();
  });

if (playerTwoChoice) {
    $("#waitingForP").remove();
};

  
  storesRef.on('value', function(snapshot){
      if (player === 1){
        storesRef.child(`${player+1}`).child("RPorS").once('value', function(snapshot){

        playerTwoChoice = snapshot.val();
        })

        storesRef.child(`${player}`).child("RPorS").once('value', function(snapshot){

        playerOneChoice = snapshot.val()
        })

        

    }
    if (player===2){
        storesRef.child(`${player-1}`).child("RPorS").once('value', function(snapshot){

            playerTwoChoice = snapshot.val();
        })

        storesRef.child(`${player}`).child("RPorS").once('value', function(snapshot){

            playerOneChoice = snapshot.val()
        })


    
    }
   console.log("player1 "+ playerOneChoice+"player2 "+playerTwoChoice);
  });


  


    


  function addStore(){
  storesRef.once('value', function(snapshot) {

    if (!snapshot.hasChild(`${player}`)){

        console.log(player);
        storesRef.child(`${player}`).set({
            name: userName,
            "RPorS": handSelect,
            "Wins": wins,
            "losses": losses
          });
          if (player > 2){
              $("#waitList").css("display","flex");
              console.log('hello')
          }


        } else {
            player++;
            addStore();
        }
    
   });

};



 



   
  



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
    console.log(handSelect);
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
        console.log(handSelect);
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
     console.log(handSelect);
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
    console.log(handSelect);

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
});
