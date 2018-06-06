
Minified JS

var config={apiKey:"AIzaSyDUPVsnligdqsfy0-TxJv5JLYPpnxcMyAo",authDomain:"rockpaperscissorgame-3603b.firebaseapp.com",databaseURL:"https://rockpaperscissorgame-3603b.firebaseio.com",projectId:"rockpaperscissorgame-3603b",storageBucket:"rockpaperscissorgame-3603b.appspot.com",messagingSenderId:"683427928744"};firebase.initializeApp(config);var database=firebase.database();var rootRef=firebase.database().ref();var storesRef=rootRef.child('Players');var playerOneChoice="";var playerTwoChoice="";var userName="yo";var handSelect="";var wins=0;var losses=0;var messList=$("#messList");var player=0;var playerWaiting=0;$("#startGame").on('click',function(event){event.preventDefault();$('#startGame').remove();userName=$("#inputName").val();$("#userWelcome").fadeOut(1000);addStore();updateScore()});storesRef.on('value',function(snapshot){playerNum=snapshot.child('2').val();if(playerNum){$('#waitingForP').css('display','none')};$("#p1is").text('Player 1: '+snapshot.child('1').child('name').val()+" with "+snapshot.child('1').child('Wins').val()+" wins!");$("#p2is").text('Player 2: '+snapshot.child('2').child('name').val()+" with "+snapshot.child('2').child('Wins').val()+" wins!");$("#plWaiting").text();if(player===1){p2Status=snapshot.child('2').val();if(!p2Status){$('#waitingForP').css('display','')}
playerTwoChoice=snapshot.child('2').child("RPorS").val()
if(playerTwoChoice==="fist"||playerTwoChoice==="snip"||playerTwoChoice==="slap"){$("#p2Chosen").css('display','');$('#chooseWep').css('display','')}
if(playerTwoChoice===''){$("#p2Chosen").css('display','none');$('#chooseWep').css('display','none')}
playerOneChoice=snapshot.child('1').child('RPorS').val()
if((playerTwoChoice==="fist"&&playerOneChoice==="slap")||(playerTwoChoice==="slap"&&playerOneChoice==="snip")||(playerTwoChoice==="snip"&&playerOneChoice==="fist")){wins ++;handSelect="";dispP2Choice()
selectionMade();winUpdate();winnScreen();updateScore()}
if((playerTwoChoice==="fist"&&playerOneChoice==="snip")||(playerTwoChoice==="slap"&&playerOneChoice==="fist")||(playerTwoChoice==="snip"&&playerOneChoice==="slap")){losses++;handSelect="";dispP2Choice()
selectionMade();lossUpdate();lossScreen();updateScore()}
if((playerOneChoice==="fist"&&playerTwoChoice==="fist")||(playerOneChoice==="slap"&&playerTwoChoice==="slap")||(playerOneChoice==="snip"&&playerTwoChoice==="snip")){handSelect="";dispP2Choice()
selectionMade();tieScreen()}}
if(player===2){p1Status=snapshot.child('1').val();if(!p1Status){$('#waitingForP').css('display','')}
playerTwoChoice=snapshot.child('1').child("RPorS").val()
if(playerTwoChoice==="fist"||playerTwoChoice==="snip"||playerTwoChoice==="slap"){$("#p2Chosen").css('display','');$('#chooseWep').css('display','')}
if(playerTwoChoice===''){$("#p2Chosen").css('display','none');$('#chooseWep').css('display','none')}
playerOneChoice=snapshot.child('2').child("RPorS").val()
if((playerTwoChoice==="fist"&&playerOneChoice==="slap")||(playerTwoChoice==="slap"&&playerOneChoice==="snip")||(playerTwoChoice==="snip"&&playerOneChoice==="fist")){wins++;handSelect="";dispP2Choice()
selectionMade();winUpdate();winnScreen();updateScore()}
if((playerTwoChoice==="fist"&&playerOneChoice==="snip")||(playerTwoChoice==="slap"&&playerOneChoice==="fist")||(playerTwoChoice==="snip"&&playerOneChoice==="slap")){losses++;handSelect="";dispP2Choice()
selectionMade();lossUpdate();lossScreen();updateScore()}
if((playerOneChoice==="fist"&&playerTwoChoice==="fist")||(playerOneChoice==="slap"&&playerTwoChoice==="slap")||(playerOneChoice==="snip"&&playerTwoChoice==="snip")){handSelect="";dispP2Choice()
selectionMade();tieScreen()}}
if(player>2){p2Status=snapshot.child('2').val();p1Status=snapshot.child('1').val();if(!p2Status||!p1Status){player=0;$("#waitList").css("display","none");addStore()}};storesRef.child(`${player}`).onDisconnect().remove()});function updateScore(){$("#winCount").text('wins: '+wins);$("#lossCount").text('Losses: '+losses)}
function dispP2Choice(){temp="#s"+playerTwoChoice;$(temp).css('display','');setTimeout(function(){$(temp).css('display','none')},2000)}
function winnScreen(){$("#winScreen").css('display','flex');setTimeout(function(){$("#winScreen").css('display','none');resetHands()},2000)}
function lossScreen(){$("#lossScreen").css('display','flex');setTimeout(function(){$("#lossScreen").css('display','none');resetHands()},2000)}
function tieScreen(){$("#tieScreen").css('display','flex');setTimeout(function(){$("#tieScreen").css('display','none');resetHands()},2000)}
function addStore(){player++;storesRef.once('value',function(snapshot){if(!snapshot.hasChild(`${player}`)){storesRef.child(`${player}`).set({name:userName,"RPorS":handSelect,"Wins":wins,"losses":losses});if(player>2){$("#waitList").css("display","flex")}}else{addStore()}})};database.ref().child('chat').on("child_added",function(childSnapshot){var storeCurrVal=messList.val();if(storeCurrVal===undefined){storeCurrVal=""}
var previousText=messList.text();messList.text(`${previousText}\n ${childSnapshot.val().username}: ${childSnapshot.val().message}`)});$("#submitMessage").on('click',function(event){event.preventDefault();var theMessage=$("#message").val();database.ref().child('chat').push({username:userName,message:theMessage});$("#message").val("")});function winUpdate(){storesRef.child(player).update({"Wins":wins})};function lossUpdate(){storesRef.child(player).update({"losses":losses})};function selectionMade(){storesRef.child(player).update({"RPorS":handSelect})};$("#gameArea").on("click",".choseFist",function(){handSelect=$(this).attr("id");selectionMade();$("#fist").animate({left:"10%",opacity:1}).css("z-index","1").attr("class","selected")
$("#slap").animate({left:"10%",opacity:0}).css("z-index","0").attr("class","selected")
$("#snip").animate({left:"10%",opacity:0}).css("z-index","0").attr("class","selected")})
$("#gameArea").on("click",".choseSnip",function(){handSelect=$(this).attr("id");selectionMade()
$("#fist").animate({left:"10%",opacity:0}).css("z-index","0").attr("class","selected");$("#slap").animate({left:"10%",opacity:0}).css("z-index","0").attr("class","selected")
$("#snip").animate({left:"10%",opacity:1}).css("z-index","1").attr("class","selected")})
$("#gameArea").on("click",".choseSlap",function(){handSelect=$(this).attr("id");selectionMade()
$("#fist").animate({left:"10%",opacity:0}).css("z-index","0").attr("class","selected");$("#slap").animate({left:"10%",opacity:1}).css("z-index","1").attr("class","selected");$("#snip").animate({left:"10%",opacity:0}).css("z-index","0").attr("class","selected")})
$("#gameArea").on("click",".selected",function(){handSelect="";selectionMade()
resetHands()});function resetHands(){$("#fist").animate({left:"50%",opacity:1}).css("z-index","").attr("class","choseFist")
$("#slap").animate({left:"30%",opacity:1}).css("z-index","").attr("class","choseSlap")
$("#snip").animate({left:"10%",opacity:1}).css("z-index","").attr("class","choseSnip")}

minified cs 

textarea{resize:none}#userWelcome{z-index:2;background-color:rgb(141,61,130);width:100%;height:100vh;display:flex;position:absolute;align-items:center;justify-content:center;flex-direction:column}#waitList{z-index:3;width:100%;height:65vh;display:none;position:absolute;background-color:antiquewhite;opacity:.8;align-items:center;justify-content:center;flex-direction:column}#winScreen{z-index:3;width:100%;height:65vh;display:none;position:absolute;background-color:lightseagreen;opacity:.8;align-items:center;justify-content:center;flex-direction:column}#lossScreen{z-index:3;width:100%;height:65vh;display:none;position:absolute;background-color:red;opacity:.8;align-items:center;justify-content:center;flex-direction:column}#tieScreen{z-index:3;width:100%;height:65vh;display:none;position:absolute;background-color:gold;opacity:.8;align-items:center;justify-content:center;flex-direction:column}.waiting,.winn,.lose,.tie{font-size:80px}#gameBox{z-index:0;display:flex;height:100vh;align-items:flex-end;flex-direction:column}#gameArea{height:65vh;display:flex;align-items:center;flex-wrap:wrap;width:100%;justify-content:center;flex-direction:column}#chatBox{height:35vh;display:flex;align-items:center;flex-wrap:wrap;width:100%;justify-content:center;flex-direction:column}#leChat{flex:1;width:70%}#winLoss{flex:1;width:15%}#waitingList{flex:1;width:15%}#fist{height:35%;flex:1;position:absolute;left:50%;z-index:0}#slap{flex:1;height:35%;position:absolute;left:30%;z-index:0}#snip{flex:1;height:35%;position:absolute;left:10%;z-index:0}#pSnip,#pFist,#pSlap{flex:1;position:absolute;left:75%;transform:scaleX(-1);height:200px}#ssnip,#sfist,#sslap{flex:1;position:absolute;left:75%;transform:scaleX(-1);height:200px;z-index:1}#p2Chosen,#chooseWep,#waitingForP{flex:1;position:absolute;left:75%;height:200px;z-index:1}#p2Chosen{animation:pick1 3s infinite}#chooseWep{animation:pick2 3s infinite}@keyframes pick1{0%{opacity:1}50%{opacity:1}51%{opacity:0}100%{opacity:1}}@keyframes pick2{0%{opacity:0}50%{opacity:0}51%{opacity:1}100%{opacity:1}}#pSnip{animation:flash1 0.31s infinite}#pSlap{animation:flash2 0.31s infinite}#pFist{animation:flash3 0.31s infinite}@keyframes flash1{0%{opacity:1}33%{opacity:1}34%{opacity:0}100%{opacity:0}}@keyframes flash2{0%{opacity:0}33%{opacity:0}34%{opacity:1}66%{opacity:1}67%{opacity:0}100%{opacity:0}}@keyframes flash3{0%{opacity:0}66%{opacity:0}67%{opacity:1}100%{opacity:1}}#snip:hover,#slap:hover,#fist:hover{z-index:2;animation:rotate 1s infinite}@keyframes rotate{0%{transform:rotate(0deg)}50%{transform:rotate(20deg)}100%{transform:rotate(0deg)}}/* mirror flip image