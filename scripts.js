const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

//loading function
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

//hide loading 
function complete() {
    if(!loader.hidden) {
        quoteContainer.hidden = false;
        loader.hidden = true;
    }
}

//fetch quote
async function getQuote(){
    loading();
    try{
        response = await fetch("https://cors-anywhere.herokuapp.com/http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json", {
        "method": "GET",
    });
        data = await response.json();
        //if author is blak add Unknown
        if(data.quoteAuthor === '') {
            
        authorText.innerText = 'Unknown';
        } else {
            authorText.innerText = await data.quoteAuthor;
        }

        //if quote is long add 'long-quote' class
        if(data.quoteAuthor.length > 120){
            quoteText.classList.add('long-quote');
        } else {
            quoteText.classList.remove('long-quote');
        }
        quoteText.innerText = await data.quoteText;

        //Stop Loading
        complete();
}
    catch(err) {
        getQuote();
        console.log(err);
    }
}

function tweetQuote() {
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterUrl, '_blank');
}

//Event Listeners

newQuoteBtn.addEventListener('click', getQuote);
twitterBtn.addEventListener('click', tweetQuote);

//on Load
getQuote();

// loading();