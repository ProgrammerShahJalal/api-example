const loadQuotes = () => {
    fetch('https://api.kanye.rest/')
        .then(response => response.json())
        .then(data => displayQuotes(data))
}
const displayQuotes = quote => {
    const quoteElement = document.getElementById('quote');
    quoteElement.innerText = quote.quote;
}