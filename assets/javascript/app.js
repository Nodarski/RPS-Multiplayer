
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



database.ref().on("child_added", function(childSnapshot){
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
    var username =$("#username").val();
    var theMessage = $("#message").val();

    database.ref().push({
        username: username,
        message: theMessage
    })

    
    $("#message").val(""); 

});

$("button").click("#heeey", function(){
    console.log("hello");
    $("#fist").animate({ transform: "rotate(20deg)"});

    
});



// SELECT FIST
// SELECT FIST
// SELECT FIST
$("#gameArea").on("click", ".choseFist" , function(){
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
    console.log("hello");
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
    console.log("hello");
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
})
