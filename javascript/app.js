// CARD DISPLAY MECHANISM - log card hand values to an array
// var playCardArray = []
//
// for (var i = 0; i < playCardArray.length; i++) {
//   playCardArray[i]
// } look at Calculators to undrstand how to write mulitple items to a display

// Two player mechanism
var gameCount = 11;
var playerOneChips;
var playerTwoChips;
var whoPlays = "Player One";

function movePlayer(){
  if (gameCount % 2 === 1) {
    whoPlays = "Player One";
  }
  else {
    whoPlays = "Player Two";
  }
}

movePlayer();

// BETTING MECHANISM


// var chips is the money to played. var bet is the min buy in and unit to increment the bet up.
var chips = 1000;
var bet = 100;

var dealerHand;

// deck of cards is based on the combination of cardfaces with suits. the below variables create the arrays to make cards.

var cardfaces = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
var suits = ["Clubs", "Diamonds", "Hearts", "Spades"];

// create a card object with name, cardface, suit, and a card value

function card(name, cardface, suit, value) {
  this.name = name;
  this.cardface = cardface;
  this.suit = suit;
  this.value = value;
}

// the deck of cards is stored in this variable as an array
var deck = [];

// function for creating cards, added to the array deck

function deckShuffle() {
  deck = [];

for (var i = 0; i < cardfaces.length; i++) {
  for (var s =0; s < suits.length; s++) {
    var carditem;
    if (i > 9) {
      carditem = new card(cardfaces[i] + 'of ' + suits[s], cardfaces[i], suits[s], 10);
    } else {
      carditem = new card(cardfaces[i] + 'of ' + suits[s], cardfaces[i], suits[s], i+1);
    }
    deck.push(carditem);
    }
  }
}

deckShuffle();  //invoke the card creation and shuffling

// handCards   function creates a hand for the players and deale

function handCards() {
  this.player = 'not-assigned';
  this.cardsInHand = [];
  this.value = 0;
  console.log("function handCards  is playing");
}

function dealGame() {
  playerHand = new handCards();
  dealerHand = new handCards();
  console.log(dealerHand);
  playerHand.player = "player";
  dealerHand.player = "dealer";
  startingHand(); // starting hand creates the initial hand
  showValue();
  if (playerHand.value == 21) {
    winHand(); //win function is invoked because player has score of 21
    // clear board, switch to player 2
    // set the score for p1 vs p2
    if(deck.length < 10) {
      shuffleDeck();
    }
  }
}

// starting hand function will deal out cards.

function startingHand() {
  for (var i = 0; i<2; i++) { //deals out 2 cards
    hit(playerHand);
    console.log("starting hand for Player");
  }
  dealerHit();
}

function dealerHit(){
  console.log("dealerhit function");
    hit(dealerHand);
    showCompValue();
}

// display the card value to users in the UI

function showValue() {
    document.getElementById("playerHandValuesUi").innerText = "Player hand is " + playerHand.value.toString();
  // show playerHand.value.toString()
  console.log(playerHand.value);
  if (playerHand.value > 21) {
    console.log("Player loses!");
      document.getElementById("playerHandValuesUi").innerText = "Player busts";
    showCompValue();
    dealerTurn();
    // none player buttons
  }
}

// show dealer hand value to users in the ui
function showCompValue() {
  // show dealerHand.value on dealer side
    document.getElementById("dealerHandValuesUi").innerText = "Dealer hand is " + dealerHand.value.toString();
    console.log("showDealerValue in ShowCompValue is running");
  if(dealerHand.value > 21){
  document.getElementById("dealerHandValuesUi").innerText = "Dealer busts!";
    console.log("showDealerValue in ShowCompValue bust is running");
  }
}

// this function looks for Aces and sets the value to 1 or 11 depending on
function addCards(addHand) {

  // add cards variables for total and an array with the list of cards
  var total = 0;
  var list = [];
  // for var i that is cards array length count cards
  for (var i = 0; i < addHand.cardsInHand.length; i++){
    if (addHand.cardsInHand[i].cardface != "A") {
      list.unshift(addHand.cardsInHand[i]); //adds cards to a new array. the front
    }
    else {
      list.push(addHand.cardsInHand[i]);
    }
  }

  for( var i = 0; i < list.length; i++) {
    if (list[i].cardface !="A") {
      total += list[i].value;
  }
  else {
   if ( total < 11) {
      total +=11;
   }
   else {
     total +=1;
    }
   }
  }

  return total;
}

// this function creates a card, first assigning it to a player, then a color, then a face value, suit and a hand
function bldCard (buildPlayer, buildColor, buildFace, buildSuit, buildHand) {
  var stringBldCard = '<div class="single-left ';
  stringBldCard = stringBldCard.concat(buildColor);
  stringBldCard = stringBldCard.concat('"><div class="facevalue">');
  stringBldCard = stringBldCard.concat(buildFace);
  stringBldCard = stringBldCard.concat('</div><div class="facetype">');
  stringBldCard = stringBldCard.concat(buildSuit);
  stringBldCard = stringBldCard.concat('</div></div>');
  if(buildPlayer == 'player') {
    document.getElementById("playerCardUi").innerHTML = stringBldCard;
    if (buildHand.cardsInHand.length ==1) {
    console.log("player card update margin");
        // document.getElementById("playerCardUi").style.margin-left = "0px";
    }
  }
  else {
    document.getElementById("dealerCardUi").innerHTML = stringBldCard;
    if(buildHand.cardsInHand.length == 1) {
      console.log("update the margin");
        // document.getElementById("dealerCardUi").style.margin-left = "0px";
    }
  }
}

function hit(hitHand) {
  var cardUniqueValue = Math.floor((Math.random() * (deck.length - 1)));
  var tempCardContainer = deck[cardUniqueValue];
  hitHand.cardsInHand.push(tempCardContainer);
  hitHand.value = addCards(hitHand);
  if ( deck[cardUniqueValue].suit == "Diamonds" ) {
    if ( hitHand.player == "player") {
      bldCard("player", "red", deck[cardUniqueValue].cardface, '&diams;', hitHand);
    }
    else {
      bldCard("dealer", "red", deck[cardUniqueValue].cardface, '&diams;', hitHand);
    }
  }
  if ( deck[cardUniqueValue].suit == "Clubs" ) {
    if ( hitHand.player == "player") {
      bldCard("player", "black", deck[cardUniqueValue].cardface, '&clubs;', hitHand);
    }
    else {
      bldCard("dealer", "black", deck[cardUniqueValue].cardface, '&clubs;', hitHand);
    }
  }
  if ( deck[cardUniqueValue].suit == "Hearts" ) {
    if ( hitHand.player == "player") {
      bldCard("player", "red", deck[cardUniqueValue].cardface, '&hearts;', hitHand);
    }
    else {
      bldCard("dealer", "red", deck[cardUniqueValue].cardface, '&hearts;', hitHand);
    }
  }
  if ( deck[cardUniqueValue].suit == "Spades" ) {
    if ( hitHand.player == "player") {
      bldCard("player", "black", deck[cardUniqueValue].cardface, '&spades;', hitHand);
    }
    else {
      bldCard("dealer", "black", deck[cardUniqueValue].cardface, '&spades;', hitHand);
    }
  }
  deck.splice(cardUniqueValue,1);
}

function dealerTurn(){
  console.log("dealerTurn");
  if(playerHand.value < 22) {
    if(dealerHand.value < 17) {
      dealerHit();
      dealerTurn();
    }
      else {
        checkScore();
      }
  }
  else {
    checkScore();
  }
}

// checkscore
function checkScore() {
  if(playerHand.value < 22) {
    if (playerHand.value > dealerHand.value) {
      winHand();
      gameCount-=1;
    }
    else {
      if(dealerHand.value < 22) {
        if (dealerHand.value == playerHand.value) {
          drawMatch();
          gameCount-=1;
        }
        else {
          loseMatch();
          gameCount-=1;
        }
      }
    }
    if (dealerHand.value > 21) {
      winHand();
      gameCount-=1;
    }
  }
  else {
    loseMatch();
    gameCount-=1;
  }
  if (chips > 0) {
    console.log("you lose");
  }
  else {
    console.log("game over");
  }
  if(deck.length < 10) {
    shuffleDeck();
  }
}

// winHand function declared the winner
function winHand(){
  document.getElementById("viewWinner").style.display = "block"; //set a winner statemement
  document.getElementById("viewWinner").innerText = "Player wins!";
  chips+= bet;// add bet value to chips
  updateCashBet();
  document.getElementById("betdown").style.display = "inline";
  document.getElementById("betup").style.display = "inline";
  document.getElementById("playscreen").style.display = "none";
  document.getElementById("cardhit").style.display = "none";
  document.getElementById("cardstand").style.display = "none";
  document.getElementById("cardTable").style.display = "none";

}


// drawmatch function to declare a drawHand
function drawMatch() {
  document.getElementById("viewWinner").style.display = "block"; //set a winner statemement
  document.getElementById("viewWinner").innerText = "Draw";
  document.getElementById("betdown").style.display = "inline";
  document.getElementById("betup").style.display = "inline";
  document.getElementById("playscreen").style.display = "none";
  document.getElementById("cardhit").style.display = "none";
  document.getElementById("cardstand").style.display = "none";
  document.getElementById("cardTable").style.display = "none";
}

// lose function to declare the player has lost
function loseMatch() {
  document.getElementById("viewWinner").style.display = "block"; //set a winner statemement
  document.getElementById("viewWinner").innerText = "House wins!";
  document.getElementById("betdown").style.display = "inline";
  document.getElementById("betup").style.display = "inline";
  document.getElementById("playscreen").style.display = "none";
  document.getElementById("cardhit").style.display = "none";
  document.getElementById("cardstand").style.display = "none";
  document.getElementById("cardTable").style.display = "none";


}



// event listener to decrease the bet by $100

document.getElementById("betdown").addEventListener("click", function(){
  console.log("bet down event listener holla");
  if(bet > 100) {
    bet = bet - 100;
    updateCashBet();
  }

});

// event listener to increase the bet by $100

document.getElementById("betup").addEventListener("click", function(){
  console.log("betup event listener register");
  if(bet < chips) {
    bet += 100;
    updateCashBet();
  }

});

// this function updates the bet value on the screen. it will also update the chips value.

function updateCashBet() {
  console.log("updateCashbet register");
  document.getElementById("bet").innerText = "Bet = " + "$ " + bet;
  document.getElementById("chips").innerText = "Chips = " + "$ " + chips;
}

// this function ends the bet phase and will start the blackjack hand
  document.getElementById("dealhand").addEventListener("click", function(){
  console.log("dealhand holla");
  // change the display of the betting buttons to off, effectively creating a new mode to play Blackjack
  document.getElementById("betdown").style.display = "none";
  document.getElementById("betup").style.display = "none";
  document.getElementById("playscreen").style.display = "inline";
  document.getElementById("cardhit").style.display = "inline";
  document.getElementById("cardstand").style.display = "inline";
  document.getElementById("cardTable").style.display = "inline";
  document.getElementById("viewWinner").style.display = "none";
  dealGame();
});

// start the game
document.getElementById("cardstand").addEventListener("click", function(){
  dealerHit();
  dealerTurn();

});

document.getElementById("cardhit").addEventListener("click", function(){
  hit(playerHand);
  showValue();
});
