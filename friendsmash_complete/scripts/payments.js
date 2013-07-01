var gUserCurrency     = null;
var gUserPricePoints  = null;

var gSupportedCurrencies = {};

// Replace this with your own object id
var gCoinsObjectId = 470134983067927;

gSupportedCurrencies["USD"] = {symbol: "&#36;",    pre: true};
gSupportedCurrencies["SGD"] = {symbol: "S&#36;",   pre: true};
gSupportedCurrencies["RON"] = {symbol: "LEU",      pre: false};
gSupportedCurrencies["EUR"] = {symbol: "&#8364;",  pre: true};
gSupportedCurrencies["TRY"] = {symbol: "&#8378;",  pre: true};
gSupportedCurrencies["SEK"] = {symbol: "kr",       pre: false};
gSupportedCurrencies["ZAR"] = {symbol: "R",        pre: true};
gSupportedCurrencies["BHD"] = {symbol: "BD",       pre: true};
gSupportedCurrencies["BHD"] = {symbol: "HK&#36;",  pre: true};
gSupportedCurrencies["CHF"] = {symbol: "Fr.",      pre: false};
gSupportedCurrencies["NIO"] = {symbol: "C&#36;",   pre: true};
gSupportedCurrencies["JPY"] = {symbol: "&#165;",   pre: true};
gSupportedCurrencies["ISK"] = {symbol: "kr;",      pre: false};
gSupportedCurrencies["TWD"] = {symbol: "NT&#36;",  pre: true};
gSupportedCurrencies["NZD"] = {symbol: "NZ&#36;",  pre: true};
gSupportedCurrencies["CZK"] = {symbol: "K&#269;",  pre: true};
gSupportedCurrencies["AUD"] = {symbol: "A&#36;",   pre: true};
gSupportedCurrencies["THB"] = {symbol: "&#3647;",  pre: true};
gSupportedCurrencies["BOB"] = {symbol: "Bs",       pre: true};
gSupportedCurrencies["BRL"] = {symbol: "B&#36;",   pre: true};
gSupportedCurrencies["MXN"] = {symbol: "Mex&#36;", pre: true};
gSupportedCurrencies["ILS"] = {symbol: "&#8362;",  pre: true};
gSupportedCurrencies["JOD"] = {symbol: "JD",       pre: false};
gSupportedCurrencies["HNL"] = {symbol: "L",        pre: true};
gSupportedCurrencies["MOP"] = {symbol: "MOP&#36;", pre: true};
gSupportedCurrencies["COP"] = {symbol: "&#36;",    pre: true};
gSupportedCurrencies["UYU"] = {symbol: "&#36;U",   pre: true};
gSupportedCurrencies["CRC"] = {symbol: "&#8353;",  pre: true};
gSupportedCurrencies["DKK"] = {symbol: "kr",       pre: false};
gSupportedCurrencies["QAR"] = {symbol: "QR",       pre: false};
gSupportedCurrencies["PYG"] = {symbol: "&#8370;",  pre: true};
gSupportedCurrencies["EGP"] = {symbol: "E&#163;",  pre: true};
gSupportedCurrencies["CAD"] = {symbol: "C&#36;",   pre: true};
gSupportedCurrencies["LVL"] = {symbol: "Ls",       pre: true};
gSupportedCurrencies["INR"] = {symbol: "&#8377;",  pre: true};
gSupportedCurrencies["LTL"] = {symbol: "Lt;",      pre: false};
gSupportedCurrencies["KRW"] = {symbol: "&#8361;",  pre: true};
gSupportedCurrencies["GTQ"] = {symbol: "Q",        pre: true};
gSupportedCurrencies["AED"] = {symbol: "AED",      pre: false};
gSupportedCurrencies["VEF"] = {symbol: "Bs.F.",    pre: true};
gSupportedCurrencies["SAR"] = {symbol: "SR",       pre: false};
gSupportedCurrencies["NOK"] = {symbol: "kr",       pre: false};
gSupportedCurrencies["UAH"] = {symbol: "&#8372;",  pre: true};
gSupportedCurrencies["DOP"] = {symbol: "RD&#36;",  pre: true};
gSupportedCurrencies["CNY"] = {symbol: "&#165;",   pre: true};
gSupportedCurrencies["BGN"] = {symbol: "lev",      pre: false};
gSupportedCurrencies["ARS"] = {symbol: "&#36;",    pre: true};
gSupportedCurrencies["PLN"] = {symbol: "z&#322;",  pre: false};
gSupportedCurrencies["GBP"] = {symbol: "&#163;",   pre: true};
gSupportedCurrencies["PEN"] = {symbol: "S/.",      pre: false};
gSupportedCurrencies["PHP"] = {symbol: "PhP",      pre: false};
gSupportedCurrencies["VND"] = {symbol: "&#8363;",  pre: false};
gSupportedCurrencies["RUB"] = {symbol: "py&#1073;",pre: false};
gSupportedCurrencies["RSD"] = {symbol: "RSD",      pre: false};
gSupportedCurrencies["HUF"] = {symbol: "Ft",       pre: false};
gSupportedCurrencies["MYR"] = {symbol: "RM",       pre: true};
gSupportedCurrencies["CLP"] = {symbol: "&#36;",    pre: true};
gSupportedCurrencies["HRK"] = {symbol: "kn",       pre: false};
gSupportedCurrencies["IDR"] = {symbol: "Rp",       pre: true};

function buildStore() {
}

function showProducts() {
}

function showCoinPackages() {
}

function showMobile() {
}

function getUserCurrency(callback) {
}

function getCoinPrice() {
}

function getUserPricePoints(callback) {
}

function buyBombs(quantity, price) {
}

function buyLives(quantity, price) {
}

function updatePlayer() {
  $('.player_bombs').html(gPlayerBombs);
  $('.player_lives').html(gPlayerLives);
  $('.player_coins').html(gPlayerCoins);
}

function buyCoins(quantity) {
}

function buyCoinsMobile(pricepointNumber) {
}

function verifyPayment(data) {
}



function hash(s){
  var n;
  if (typeof(s) == 'number' && s === parseInt(s, 10)){
    s = Array(s + 1).join('x');
  }
  return s.replace(/x/g, function(){
    var n = Math.round(Math.random() * 61) + 48;
    n = n > 57 ? (n + 7 > 90 ? n + 13 : n + 7) : n;
    return String.fromCharCode(n);
  });
} 
