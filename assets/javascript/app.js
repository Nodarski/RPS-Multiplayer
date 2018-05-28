
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

$("#fist").on("click", function(){
    console.log("hello");
    $("#fist").animate({
        left: "10%",
        opacity:1  
    }).css("z-index", "1");
    $("#slap").animate({
        left: "10%",
        opacity:0
    })
    $("#snip").animate({
        left: "10%",
        opacity:0
    })
})

$("#snip").on("click", function(){
    console.log("hello");
    $("#fist").animate({
        left: "10%",
        opacity:0  
    }).css("z-index", "1");
    $("#slap").animate({
        left: "10%",
        opacity:0
    })
    $("#snip").animate({
        left: "10%",
        opacity:1
    }).css("z-index", "1");
})

$("#slap").on("click", function(){
    console.log("hello");
    $("#fist").animate({
        left: "10%",
        opacity:0  
    }).css("z-index", "1");
    $("#slap").animate({
        left: "10%",
        opacity:1
    }).css("z-index", "1");
    $("#snip").animate({
        left: "10%",
        opacity:0
    })
})

