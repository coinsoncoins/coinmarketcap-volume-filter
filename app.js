
// const axios = require('axios');
// var fs = require('fs');
 
// axios.get('https://api.coinmarketcap.com/v1/ticker/')
//   .then(response => {
//     coinDB = response.data;
//     coins = coinDB.map(function(x) { return x.symbol; });
//     fs.writeFileSync(__dirname + '/data/whitelisted-symbols.list', coins.join("\n"));
//   })
//   .catch(error => {
//     console.log(error);
//   });


var fs = require("fs");
var _ = require("lodash");
var marketCaps = JSON.parse(fs.readFileSync("market-caps.json"));
var coinMktCapUnder = 5000000; 
var coin24hVolumeOver = 500000;

marketCaps.forEach(function(coin) {
  if(!coin.market_cap_usd) {
    //console.log("no market cap for " + coin.symbol);
    coin.market_cap_usd = 0;
  }
  coin.market_cap_usd = parseFloat(coin.market_cap_usd);

  if (coin.market_cap_usd < 5000000) {
    //console.log(coin.symbol + " has market cap less than 5 million");
  }

  if (!coin['24h_volume_usd']) {
    //console.log(`no 24h_volume_usd for ${coin.symbol}`);
    coin['24h_volume_usd'] = 0;
  }
  coin['24h_volume_usd'] = parseFloat(coin['24h_volume_usd']);
  if (coin['24h_volume_usd'] > 500000) {
    //console.log(`${coin.symbol} has a 24 hour volume over $500,000`);
  }

  if (coin.market_cap_usd < coinMktCapUnder && coin['24h_volume_usd'] > coin24hVolumeOver) {
    console.log(`${coin.symbol}: marketcap: ${coin.market_cap_usd}, 24hVolume: ${coin['24h_volume_usd']}`);
  }
})
