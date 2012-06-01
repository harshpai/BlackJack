// A black jack game between dealer and the player

// arrays to help convert from a number value to a string representation of the card.
var suits = ["dummy","Spade","Hearts","Clubs","Diamonds"];
var numbers = ["dummy","Ace","2","3","4","5","6","7","8","9","10","Jack","Queen","King"];

// Card Constructor
function Card(s,n)
{
    var suit = s;
    var number = n;
    
    this.getNumber = function()
    {
        return number;
    };
    
    this.getSuit = function()
    {
        return suit;
    };
    
    this.getValue = function()
    {
        if(number === 1)    return 11;
        if(number === 11 || number === 12 || number === 13 )
            return 10;
        return number;
    };
}

// Class representing deck of cards
function Deck()
{
    // private array to hold the cards in the deck
    var array = [];

    // loop through and insert all 52 cards in the deck
    for (var i=1;i<suits.length;i++) {
        for (var j=1;j<numbers.length;j++) 
        {
            array.push(new Card(i,j));
        }
    }

    // sort the deck
    array.sort(function() {return 0.5 - Math.random()});
    
    // deal a card form the deck
    this.deal = function()
    {
        var card = array[0];
        array.splice(0,1);
        return card;
    };
}

// Class that represents a hand
function Hand(deck)
{
    // private variable to hold the hand of the player
    var array =[];

    this.deck = deck;
    array.push(this.deck.deal());
    array.push(this.deck.deal());
    
    this.getHand=function()
    {
        return array;
    };
    
    // Evaluate the score of the hand
    this.score = function()
    {
        var sum =0;
        var num1s = 0;
        for(var i = 0 ; i < array.length; i++)
        {
            sum+=array[i].getValue();
            if(array[i].getValue() ===11)   num1s++;
        }
	// Aces may be treated as 11 or 1 depending on what helps player 
	// get a good score and not go bust
        while(sum>21 && num1s>0)
        {
            sum-=10;num1s--;
        }
        return sum;
    };

    // returns a string representation of the deck
    this.printHand = function()
    {
        var hand = "";
	var i 
        for(i = 0 ; i < array.length-1; i++)
	{
        	hand+=numbers[array[i].getNumber()]+" of "+suits[array[i].getSuit()]+",";
	}	
	hand+=numbers[array[i].getNumber()]+" of "+suits[array[i].getSuit()];
        return hand;
    };

    // add the next card from the deck to the hand
    this.hitMe = function()
    {
        var card = this.deck.deal();
        array.push(card);
    };

}

var playAsDealer = function(deck)
{
    var hand = new Hand(deck); 
    // the dealer keeps taking a new card until he gets a score >= 17
    while(hand.score()<17)  
    {
	hand.hitMe();
    }
    return hand;
};

var playAsUser = function(deck)
{
    var hand = new Hand(deck); 
    while(hand.score()<=21 && confirm("******Black Jack******\nUser's hand:\n"+hand.printHand()+"\n Click OK to draw another card or click Cancel to end your turn."))
    {
        hand.hitMe();
    }
    return hand;
};

var declareWinner=function(userHand,dealerHand)
{
    var uScore = userHand.score();
    var dScore = dealerHand.score();

    if(uScore>21)
    {
	// both busted and hence tied
        if(dScore>21)   return "You tied!";

	// dealer not busted player is busted so player looses
        return "You lose!";
    }
    // dealer is busted but player is not so player wins
    if(dScore>21)   	  return "You win!";

    // both are not busted, get result by comparing scores
    if(uScore>dScore)     return "You win!";
    if(uScore===dScore)   return "You tied!";
    return "You lose!";
};

var playGame= function()
{
    var myDeck = new Deck();

    var userHand = playAsUser(myDeck);
    var dealerHand = playAsDealer(myDeck); 

    var result = declareWinner(userHand,dealerHand);
    alert("******Black Jack******\nUser's hand:"+userHand.printHand()+"\n"+"Dealer's hand:"+dealerHand.printHand()+"\n"+"Result:\n"+result);
};

// Infinite loop to play game
do
{
	playGame();
}while(confirm("******Black Jack******\nDo you want to play more?"))