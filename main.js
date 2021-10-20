const Discord = require('discord.js');
const client = new Discord.Client();

const CoinGecko = require('coingecko-api');
const CoinGeckoClient = new CoinGecko();

const COIN_ID = "hex"

function getBirdPrice(){
    return new Promise((resolve, reject) => {
        CoinGeckoClient.simple.price({
            ids: [COIN_ID],
            vs_currencies: ['usd'],
        }).then(res => resolve(res))
        .catch(err => reject(err));
    });
}

async function updateStatus(){
    const priceObj = await getBirdPrice()
    const price = priceObj.data[COIN_ID].usd;

    client.user.setActivity(`$${price}`, { type: 'WATCHING' })
    .then(presence => console.log(`Activity set to ${presence.activities[0].name}`))
    .catch(console.error);
}

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    updateStatus();
    setInterval(updateStatus, 5000);
});


client.login('ODk5NzUxNzk0NzI3NTg3ODcw.YW3VKA.JmRcUtkkeHFi0-KRQ8y6jV4KdYS');