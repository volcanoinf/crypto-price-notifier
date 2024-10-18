const notifyBtn = document.getElementById('notifyBtn');
const status = document.getElementById('status');

let priceThreshold;
let cryptoName;

notifyBtn.addEventListener('click', () => {
    cryptoName = document.getElementById('crypto').value.toLowerCase();
    priceThreshold = parseFloat(document.getElementById('price').value);
    status.textContent = `Monitoring ${cryptoName} for price changes...`;
    
    // Start monitoring price
    setInterval(checkPrice, 60000); // Check every minute
});

const checkPrice = async () => {
    try {
        const response = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${cryptoName}&vs_currencies=usd`);
        const data = await response.json();
        const currentPrice = data[cryptoName].usd;

        if (currentPrice > priceThreshold) {
            alert(`Price Alert: ${cryptoName.toUpperCase()} is now $${currentPrice}!`);
            status.textContent = `Current Price: $${currentPrice}`;
        }
    } catch (error) {
        console.error('Error fetching price:', error);
        status.textContent = 'Error fetching price. Please check the cryptocurrency name.';
    }
};
