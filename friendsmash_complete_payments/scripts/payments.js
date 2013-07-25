var gUserCurrency     = null;
var gUserPricePoints  = null;

var gSupportedCurrencies = {};

// Replace this with your own object id
var gCoinsObjectId = 470134983067927;

var gUserCountryPricePoints       = {};
gUserCountryPricePoints.count     = 0;
gUserCountryPricePoints.default   = "US";
gUserCountryPricePoints.countries = [];

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
  
  getUserCurrency();
  getCoinPrice();
  
  var store = $('#store')[0];
  
  var storeHeader = document.createElement('div');
  storeHeader.id           = 'store_title';
  store.appendChild(storeHeader);
  
  var storeImage = document.createElement('img');
  storeImage.setAttribute('src', 'images/store64.png');
  storeHeader.appendChild(storeImage);
  
  var storeTitle = document.createElement('h1');
  storeTitle.id         = 'store_title';
  storeTitle.innerHTML  = 'Store';
  storeHeader.appendChild(storeTitle);
  
  var coinsDisplay = document.createElement('div');
  coinsDisplay.className  = 'stats_display';
  coinsDisplay.style.top  = '20px';
  coinsDisplay.style.left = '170px';
  storeHeader.appendChild(coinsDisplay);
  
  var coinsIcon = document.createElement('img');
  coinsIcon.setAttribute('src', 'images/coin40.png');
  coinsDisplay.appendChild(coinsIcon);
  
  var coinsNumber = document.createElement('span');
  coinsNumber.className  = 'player_coins';
  coinsNumber.innerHTML = ''+gPlayerCoins;
  coinsDisplay.appendChild(coinsNumber);
  
  var bombsDisplay = document.createElement('div');
  bombsDisplay.className  = 'stats_display';
  bombsDisplay.style.top  = '20px';
  bombsDisplay.style.left = '260px';
  storeHeader.appendChild(bombsDisplay);
  
  var bombsIcon = document.createElement('img');
  bombsIcon.setAttribute('src', 'images/bomb40.png');
  bombsDisplay.appendChild(bombsIcon);
  
  var bombsNumber = document.createElement('span');
  bombsNumber.className  = 'player_bombs';
  bombsNumber.innerHTML = ''+gPlayerBombs;
  bombsDisplay.appendChild(bombsNumber);
  
  var livesDisplay = document.createElement('div');
  livesDisplay.className  = 'stats_display';
  livesDisplay.style.top  = '20px';
  livesDisplay.style.left = '350px';
  storeHeader.appendChild(livesDisplay);
  
  var livesIcon = document.createElement('img');
  livesIcon.setAttribute('src', 'images/heart40.png');
  livesDisplay.appendChild(livesIcon);
  
  var livesNumber = document.createElement('span');
  livesNumber.className  = 'player_lives';
  livesNumber.innerHTML = ''+gPlayerLives;
  livesDisplay.appendChild(livesNumber);
  
  var productsButton = document.createElement('div');
  productsButton.id         = 'products_button';
  productsButton.className  = 'store_button selected';
  productsButton.style.top  = '80px';
  productsButton.style.left = '75px';
  productsButton.setAttribute("onClick","javascript:showProducts()");
  storeHeader.appendChild(productsButton);
  
  var productsIcon = document.createElement('img');
  productsIcon.setAttribute('src', 'images/store64.png');
  productsButton.appendChild(productsIcon);
  
  var productsTag = document.createElement('p');
  productsTag.className   = 'button_tag';
  productsTag.innerHTML   = 'Products';
  productsButton.appendChild(productsTag);
  
  var coinsButton = document.createElement('div');
  coinsButton.id         = 'coins_button';
  coinsButton.className  = 'store_button';
  coinsButton.style.top  = '80px';
  coinsButton.style.left = '230px';
  coinsButton.setAttribute("onClick","javascript:showCoinPackages()");
  storeHeader.appendChild(coinsButton);
  
  var coinsIcon = document.createElement('img');
  coinsIcon.setAttribute('src', 'images/coin_bundle64.png');
  coinsButton.appendChild(coinsIcon);
  
  var coinsTag = document.createElement('p');
  coinsTag.className   = 'button_tag';
  coinsTag.innerHTML   = 'Coins';
  coinsButton.appendChild(coinsTag);
  
  showProducts();
  
}

function showProducts() {

  $('.store_button').removeClass('selected');
  $('#products_button').addClass('selected');
  
  var store = $('#store')[0];
  
  var storeContents = $('#store_contents')[0] || document.createElement('div');
  storeContents.id = 'store_contents';
  storeContents.innerHTML = "";
  if(store.children.length < 2) store.appendChild(storeContents);
  
  //Bombs
  var buy_bombs1 = document.createElement('div');
  buy_bombs1.className = "store_package";
  buy_bombs1.innerHTML = "<img src='images/bomb_icon.png'/>";
  buy_bombs1.innerHTML += "<h3 class='quantity'>10 bombs</h3>";
  buy_bombs1.innerHTML += "<span></span><img src='images/coin_bundle_icon.png'/>";
  buy_bombs1.innerHTML += "<h3>100 coins</h3>";
  buy_bombs1.innerHTML += "<div class='button_small'>Buy!</div>";
  buy_bombs1.setAttribute("onClick","javascript:buyBombs(10,100)");
  storeContents.appendChild(buy_bombs1);

  var buy_bombs2 = document.createElement('div');
  buy_bombs2.className = "store_package";
  buy_bombs2.innerHTML = "<img src='images/bomb_icon.png'/>";
  buy_bombs2.innerHTML += "<h3 class='quantity'>30 bombs</h3>";
  buy_bombs2.innerHTML += "<span></span><img src='images/coin_bundle_icon.png'/>";
  buy_bombs2.innerHTML += "<h3>270 coins</h3>";
  buy_bombs2.innerHTML += "<div class='button_small'>Buy!</div>";
  buy_bombs2.setAttribute("onClick","javascript:buyBombs(30, 270)");
  storeContents.appendChild(buy_bombs2);

  var buy_bombs3 = document.createElement('div');
  buy_bombs3.className = "store_package";
  buy_bombs3.innerHTML = "<img src='images/bomb_icon.png'/>";
  buy_bombs3.innerHTML += "<h3 class='quantity'>50 bombs</h3>";
  buy_bombs3.innerHTML += "<span></span><img src='images/coin_bundle_icon.png'/>";
  buy_bombs3.innerHTML += "<h3>400 coins</h3>";
  buy_bombs3.innerHTML += "<div class='button_small'>Buy!</div>";
  buy_bombs3.setAttribute("onClick","javascript:buyBombs(50, 400)");
  storeContents.appendChild(buy_bombs3);
  
  //Lives
  var buy_lives1 = document.createElement('div');
  buy_lives1.className = "store_package";
  buy_lives1.innerHTML = "<img src='images/heart_icon.png'/>";
  buy_lives1.innerHTML += "<h3 class='quantity'>5 lives</h3>";
  buy_lives1.innerHTML += "<span></span><img src='images/coin_bundle_icon.png'/>";
  buy_lives1.innerHTML += "<h3>100 coins</h3>";
  buy_lives1.innerHTML += "<div class='button_small'>Buy!</div>";
  buy_lives1.setAttribute("onClick","javascript:buyLives(5, 100)");
  storeContents.appendChild(buy_lives1);
  
  var buy_lives2 = document.createElement('div');
  buy_lives2.className = "store_package";
  buy_lives2.innerHTML = "<img src='images/heart_icon.png'/>";
  buy_lives2.innerHTML += "<h3 class='quantity'>15 lives</h3>";
  buy_lives2.innerHTML += "<span></span><img src='images/coin_bundle_icon.png'/>";
  buy_lives2.innerHTML += "<h3>270 coins</h3>";
  buy_lives2.innerHTML += "<div class='button_small'>Buy!</div>";
  buy_lives2.setAttribute("onClick","javascript:buyLives(15, 270)");
  storeContents.appendChild(buy_lives2);

  var buy_lives3 = document.createElement('div');
  buy_lives3.className = "store_package";
  buy_lives3.innerHTML = "<img src='images/heart_icon.png'/>";
  buy_lives3.innerHTML += "<h3 class='quantity'>30 lives</h3>";
  buy_lives3.innerHTML += "<span></span><img src='images/coin_bundle_icon.png'/>";
  buy_lives3.innerHTML += "<h3>400 coins</h3>";
  buy_lives3.innerHTML += "<div class='button_small'>Buy!</div>";
  buy_lives3.setAttribute("onClick","javascript:buyLives(30, 400)");
  storeContents.appendChild(buy_lives3);
  
}

function showCoinPackages() {

  $('.store_button').removeClass('selected');
  $('#coins_button').addClass('selected');
  
  var store = $('#store')[0];
  
  var storeContents = $('#store_contents')[0] || document.createElement('div');
  storeContents.id = 'store_contents';
  storeContents.innerHTML = "";
  if(store.children.length < 2) store.appendChild(storeContents);
  
  if (!gUserCurrency) {
    getUserCurrency(showCoinPackages);
    storeContents.innerHTML = "<h1>Loading...</h1>";
    storeContents.innerHTML += "<img src='images/loading.gif'>";
  }
  else {
    var quantities = [10, 50, 100, 200, 500];
    
    for (var x=0; x<5; x++) {
      var unit;
      var price;
      
      if (gSupportedCurrencies[gUserCurrency.user_currency].price) {
         unit = gSupportedCurrencies[gUserCurrency.user_currency].price;
         price = parseInt(unit*quantities[x]*100)/100;
      }
      else {
        unit = gSupportedCurrencies["USD"].price;
        price = parseInt(unit*quantities[x]*gUserCurrency.usd_exchange_inverse*100)/100;
      }
      
      var buy_coins = document.createElement('div');
      buy_coins.className = "store_package";
      buy_coins.innerHTML = "<img src='images/coin_bundle_icon.png'/>";
      buy_coins.innerHTML += "<h3 class='quantity'>"+quantities[x]+" coins</h3>";
      buy_coins.innerHTML += "<span></span>";

      buy_coins.innerHTML += "<h3>" + accounting.formatMoney(price, 
        { symbol: gSupportedCurrencies[gUserCurrency.user_currency].symbol, 
          format: gSupportedCurrencies[gUserCurrency.user_currency].pre ? "%s %v" : "%v %s",
          precision: 2
        }) + "</h3>";     

      buy_coins.innerHTML += "<div class='button_small'>Buy!</div>";
      buy_coins.setAttribute("onClick","javascript:buyCoins("+quantities[x]+")");
      storeContents.appendChild(buy_coins);
    }
    
    // Adding the dedicated pay with mobile button
    var mobileButton = document.createElement('div');
    mobileButton.id           = 'mobile_button';
    mobileButton.className    = 'store_button';
    mobileButton.style.top    = '290px';
    mobileButton.style.left   = '120px';
    mobileButton.style.width  = '170px';
    mobileButton.setAttribute("onClick","javascript:showMobile()");
    storeContents.appendChild(mobileButton);

    var mobileIcon = document.createElement('img');
    mobileIcon.setAttribute('src', 'images/mobile64.png');
    mobileButton.appendChild(mobileIcon);

    var mobileTag = document.createElement('p');
    mobileTag.className   = 'button_tag';
    mobileTag.innerHTML   = 'Pay with Mobile';
    mobileButton.appendChild(mobileTag);
  }
}

function showMobile() {
  $('.store_button').removeClass('selected');
  $('#coins_button').addClass('selected');
  
  var store = $('#store')[0];
  
  var storeContents = $('#store_contents')[0] || document.createElement('div');
  storeContents.id = 'store_contents';
  storeContents.innerHTML = "";
  if(store.children.length < 2) store.appendChild(storeContents);
  
  if (!gUserPricePoints) { 
    getUserPricePoints(showMobile);
    storeContents.innerHTML = "<h1>Loading...</h1>";
    storeContents.innerHTML += "<img src='images/loading.gif'>";
  }
  else {
    
    var title = document.createElement('h2');
    title.innerHTML = 'Use your mobile phone to buy coins!';
    title.style.width = '100%';
    title.style.textAlign = 'center';
    title.style.font = '20pt "Arial Narrow", Arial, sans-serif';
    title.style.marginBottom = '10px';
    
    storeContents.appendChild(title);
    var x = 0;
    
    while ($('.store_package').length < 5 && x < gUserPricePoints.pricepoints.length) {
      
      var quantity  = Math.round(parseFloat(gUserPricePoints.pricepoints[x].payout_base_amount)*gUserCurrency.usd_exchange*10);
      if (quantity <= 0) {x++; continue;}
      
      var price     = gUserPricePoints.pricepoints[x].payer_amount;
      var currency  = gUserPricePoints.pricepoints[x].currency;
      
      var buy_coins = document.createElement('div');
      buy_coins.className = "store_package";
      buy_coins.innerHTML = "<img src='images/coin_bundle_icon.png'/>";
      buy_coins.innerHTML += "<h3 class='quantity'>"+quantity+" coins</h3>";
      buy_coins.innerHTML += "<span></span>";
      
      if (gSupportedCurrencies[currency].pre) {
        buy_coins.innerHTML += "<h3>" + gSupportedCurrencies[currency].symbol + price + "</h3>";
      }
      else buy_coins.innerHTML += "<h3>" + price + gSupportedCurrencies[currency].symbol + "</h3>";
      
      buy_coins.innerHTML += "<div class='button_small'>Buy!</div>";
      buy_coins.setAttribute("onClick","javascript:buyCoinsMobile("+x+")");
      storeContents.appendChild(buy_coins);
      
      x++;
    }
  }
}

function updatePricePointsCountry() {
  
  var pricepoints;
  
  if ($("#country_selector").length > 0) {
    pricepoints = gUserCountryPricePoints.countries[$("#country_selector")[0].value];
  }
  else pricepoints = gUserCountryPricePoints.countries[gUserCountryPricePoints.default];
  
  var storeContents = $('#store_contents')[0];
  
  $(".store_package").remove();
  
  for (var x in pricepoints) {
    if (typeof(pricepoints[x]) == "function") continue;
    
    var price     = pricepoints[x].payer_amount;
    var currency  = pricepoints[x].currency;
    var quantity;
    
    if (gSupportedCurrencies[currency].price) {
       unit = gSupportedCurrencies[currency].price;
       quantity = Math.round(pricepoints[x].payout_base_amount/unit);
    }
    else {
      unit = parseInt(gSupportedCurrencies["USD"].price*gUserCurrency.usd_exchange_inverse*100)/100;
      quantity = Math.round(pricepoints[x].payout_base_amount/unit);
    }
    if (quantity <= 0) quantity = 1;
    
    var buy_coins = document.createElement('div');
    buy_coins.className = "store_package";
    buy_coins.innerHTML = "<img src='images/coin_bundle_icon.png'/>";
    buy_coins.innerHTML += "<h3 class='quantity'>"+quantity+" coins</h3>";
    buy_coins.innerHTML += "<span></span>";
    
    if (gSupportedCurrencies[currency].pre) {
      buy_coins.innerHTML += "<h3>" + gSupportedCurrencies[currency].symbol + price + "</h3>";
    }
    else {
      buy_coins.innerHTML += "<h3>" + price + gSupportedCurrencies[currency].symbol + "</h3>";
    }
    
    buy_coins.innerHTML += "<div class='button_small'>Buy!</div>";
    buy_coins.setAttribute("onClick","javascript:buyCoinsMobile("+x+")");
    storeContents.appendChild(buy_coins);

  }
}

function getUserCurrency(callback) {
  FB.api('/me/?fields=currency', function(data) {
      if (!data || data.error) {
          // handle errors
          console.error("Error fetching user currency");
      } else {
          console.log("User currency data:");
          console.log(data);
          gUserCurrency = data.currency;

          //gUserCurrency.currency_exchange = 2.7450423;
          //gUserCurrency.currency_exchange_inverse = 0.3642931113;
          //gUserCurrency.currency_offset = 100;
          //gUserCurrency.usd_exchange = 0.27450423;
          //gUserCurrency.usd_exchange_inverse = 3.6429311126;
          //gUserCurrency.user_currency = "ILS";

          if (callback) callback();
      }
  });
}

function getCoinPrice() {
  FB.api(""+gCoinsObjectId+"", function(response){
    if (response && !response.error) {
      if (response.data && response.data.price) {
        for (var x in response.data.price) {
          var pricepoint = response.data.price[x];
          if ( typeof(pricepoint) != 'object' ) continue;
          gSupportedCurrencies[pricepoint.currency].price = pricepoint.amount;
        }
      }
    }
  });
}

function getUserPricePoints(callback) {
  FB.api('/me/?fields=payment_mobile_pricepoints', function(data) {
      if (!data || data.error) {
          // handle errors
          console.error("ERROR GETTING USER PRICEPOINTS");
          console.log(data);
      } else {
          console.log(data);
          gUserPricePoints = data.payment_mobile_pricepoints;
          
          //GET DIFFERENT COUNTRIES PRICEPOINTS
          for (var i in gUserPricePoints.pricepoints) {
            var pricepoint = gUserPricePoints.pricepoints[i];
            if (typeof(pricepoint) == "function") continue;
            
            if (!gUserCountryPricePoints.countries[pricepoint.country]) {
              gUserCountryPricePoints.countries[pricepoint.country] = [];
              gUserCountryPricePoints.count++;
            }
            
            gUserCountryPricePoints.countries[pricepoint.country].push(pricepoint);
          }
          
          if (gUserPricePoints.predicted_mobile_country) 
            gUserCountryPricePoints.default = gUserPricePoints.predicted_mobile_country
          else gUserCountryPricePoints.default = gUserPricePoints.pricepoints[0].country;
          
          console.log(gUserCountryPricePoints);
          
          if (callback) callback();
      }
  });
}

function buyBombs(quantity, price) {
  if (price <= gPlayerCoins) {
    gPlayerBombs += parseInt(quantity);
    gPlayerCoins -= parseInt(price);
    updatePlayer();
    closeStore();
    var success = showPopUp({img:'bomb64.png', title:'Bombs!'});
    success.innerHTML = "You bought "+quantity+" bombs!<br>Let's smash some friends!";
  }
  else alert("Not enough coins!");
}

function buyLives(quantity, price) {
  if (price <= gPlayerCoins) {
    gPlayerLives += parseInt(quantity);
    gPlayerCoins -= parseInt(price);
    updatePlayer();
    closeStore();
    var success = showPopUp({img:'heart64.png', title:'Lives!'});
    success.innerHTML = "You bought "+quantity+" lives!<br>Let's smash some friends!";
  }
  else alert("Not enough coins!");
}

function buyCoins(quantity) {
  var requestID = hash(64);
  console.log("Constructing Request ID: " + requestID);
  
  FB.ui({
      method: 'pay',
      action: 'purchaseitem',
      product: g_api_url+'/opengraph/coin.html',
      request_id: requestID,
      quantity: quantity
    },
    verifyPayment
  );
}

function buyCoinsMobile(pricepointNumber) {
  var pricepoints;
  
  if ($("#country_selector").length > 0) {
    pricepoints = gUserCountryPricePoints.countries[$("#country_selector")[0].value];
  }
  else pricepoints = gUserCountryPricePoints.countries[gUserCountryPricePoints.default];
  
  var current_pricepoint = pricepoints[pricepointNumber];
  var requestID = hash(64);
  
  console.log("Constructing Request ID: " + requestID);
  
  var quantity  = Math.round(parseFloat(current_pricepoint.payout_base_amount)*gUserCurrency.usd_exchange*10);  
  
  FB.ui({
      method: 'pay',
      action: 'purchaseitem',
      product: g_api_url+'/opengraph/coin.html',
      request_id: requestID,
      pricepoint_id: current_pricepoint.pricepoint_id,
      quantity: quantity,
      quantity_min: 1,
      quantity_max: 500
    },
    verifyPayment
  );
}

function verifyPayment(data) {
  if(!data) {
    alert("There was an error processing your payment. Please try again!");
    return;
  }
  
  console.log("Payment verification complete");
  console.log(data);
  
  if(data.error_code) {
    if(data.error_code != 1383010) {
      alert("There was an error processing your payment."+data.error_message+" Error code:"+data.error_code);
    }
    return;
  }

  closeStore();
  gPlayerCoins = parseInt(gPlayerCoins) + parseInt(data.quantity);
        
  var success = showPopUp({img:'coin_bundle64.png', title:'Coins!'});
  success.innerHTML = "You bought " + data.quantity + " coins!<br>Let's smash some friends!";

  $('.player_coins').html(gPlayerCoins);
}

function updatePlayer() {
  $('.player_bombs').html(gPlayerBombs);
  $('.player_lives').html(gPlayerLives);
  $('.player_coins').html(gPlayerCoins);
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
