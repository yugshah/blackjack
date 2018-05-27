let newgameButton = document.getElementById('new-game-button');
let hitButton = document.getElementById('hit-button');
let stayButton = document.getElementById('stay-button');
let textarea = document.getElementById('text-area');

let deck=[],
suits=['Hearts','Clubs', 'Spades','Diamonds'],
values=['Ace', 'Two', 'Three', 'Four','Five','Six','Seven','Eight','Nine','King','Queen','Jack'],
playerCards=[],
dealerCards=[],
playerScore=0,
dealerScore=0,
gameStarted=false,
gameOver=false,
playerWon=false;


hitButton.style.display='none';
stayButton.style.display='none';
showStatus();


newgameButton.addEventListener('click', function() {
	// body...
	gameStarted=true;
	
	deck=createDeck();
	shuffleDeck(deck);
dealerCards=[getnewCard(), getnewCard()];
	playerCards=[getnewCard(), getnewCard()];


	newgameButton.style.display='none';
	hitButton.style.display='inline';
	stayButton.style.display='inline';

	showStatus();
});

hitButton.addEventListener('click', function(){
	playerCards.push(getnewCard());
	checkForEndOfGame();
	showStatus();
});

stayButton.addEventListener('click', function(){
gameOver=true;
checkForEndOfGame();
showStatus();
});


function showStatus(){
	if(!gameStarted){
		textarea.innerText='Welcome to Bluejack!';
		return;
	}

	let dealerCardString='';
	for(let i=0;i<dealerCards.length;i++){
		dealerCardString+=getCardstring(dealerCards[i])+'\n';
	}

let playerCardString='';
	for(let i=0;i<playerCards.length;i++){
		playerCardString+=getCardstring(playerCards[i])+'\n';
	}

	updateScores();
		textarea.innerText='DEALER CARDS'+'\n'+dealerCardString+'Score: '+dealerScore+'\n\nPLAYER CARDS'+'\n'+playerCardString+'Score: '+playerScore+'\n';

	if(gameOver){
		if(playerWon){
			textarea.innerText+="\nYOU WON";
		}
		else
			textarea.innerText+='\nDEALER WON';
		newgameButton.style.display='none';
	hitButton.style.display='none';
	stayButton.style.display='none';
	}

	
	
}


function createDeck(){
	for(let i=0; i<suits.length; i++){
		for(let j=0; j<values.length; j++){
			let card={
				suit:suits[i],
				value:values[j]
			};
			deck.push(card);
		}
	}
	return deck;
}

function shuffleDeck(deck){
	for(let i=0; i<deck.length;i++){
		let j=Math.trunc(Math.random()*deck.length);
		let temp=deck[j];
		deck[j]=deck[i];
		deck[i]=temp;
	}
}

function getCardstring(card){

	return card.value + ' of ' + card.suit;
}

function getnewCard(){
	return deck.shift();
}

function updateScores(){
	dealerScore=getScore(dealerCards);
	playerScore=getScore(playerCards);
}

function getScore(cardArray){
	let score=0;
	let hasAce=false;
	for(let i=0; i<cardArray.length;i++){
		let card=cardArray[i];
		score+=getCardNumber(card);
		if(card.value==='Ace'){
			hasAce=true;
		}
	}
	if(hasAce && (score+10)<=21){
		return score+10;
	}
	return score;
}

function getCardNumber(card){
	switch(card.value){
		case "Ace": 
		return 1;
		case 'Two': return 2;
		case 'Three': return 3;
		case 'Four': return 4;
		case 'Five': return 5;
		case 'Six': return 6;
		case 'Seven': return 7;
		case 'Eight': return 8;
		case 'Nine': return 9;
	 	default: return 10;

	}
}

function checkForEndOfGame(){
	updateScores();
	if(gameOver){
		while(dealerScore<playerScore && playerScore<=21 && dealerScore<=21){
			dealerCards.push(getnewCard());
			updateScores();
		}

	}

	if(playerScore>21){
		playerWon=false;
		gameOver=true;
	}
	else if(dealerScore>21){
		playerWon=true;
		gameOver=true;
	}
	else if(gameOver){
		if(playerScore>dealerScore){
			playerWon=true;
		}
		else{
			playerWon=false;
		}
	}
}