/**
* Copyright 2013 Facebook, Inc.
*
* You are hereby granted a non-exclusive, worldwide, royalty-free license to
* use, copy, modify, and distribute this software in source code or binary
* form for use in connection with the web services and APIs provided by
* Facebook.
*
* As with any software that integrates with the Facebook platform, your use
* of this software is subject to the Facebook Developer Principles and
* Policies [http://developers.facebook.com/policy/]. This copyright notice
* shall be included in all copies or substantial portions of the software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
* THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
* FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
* DEALINGS IN THE SOFTWARE.
*/


var gPlayerFBID;
var gPlayerBombs = 0;
var gPlayerLives = 0;
var gPlayerCoins = 0;
var gTournamentCountdown;

kAchievements = {
    kACHIEVEMENT_SCORE50 : 0,
    kACHIEVEMENT_SCORE100 : 1,
    kACHIEVEMENT_SCORE150 : 2,
    kACHIEVEMENT_SCORE200 : 3,
    kACHIEVEMENT_SCOREx3 : 4
};

function createMenu() {
  var menuShim = document.createElement('div');
  menuShim.id = 'menu_shim';

  menuShim.style.width = gCanvasWidth + "px";
  menuShim.style.height = gCanvasHeight + "px";
  stage.appendChild(menuShim);

  var menuContainer = document.createElement('div');
  menuContainer.id = 'menu_container';
  stage.appendChild(menuContainer);
  menuContainer.style.width = stage.style.width;
  menuContainer.style.height = stage.style.height;


  /* Play Button */
  var playButton = document.createElement('div');
  playButton.className = 'menu_item';
  playButton.id = 'play_button';
  playButton.style.top = "188px";
  playButton.style.left = "0px";
  playButton.style.zIndex = "10";
  playButton.setAttribute('onclick', 'javascript:startGame(null, null)');
  playButton.style.backgroundImage = "url('images/button_play.png')";
  menuContainer.appendChild(playButton);

  var playButtonHover = document.createElement('div');
  playButtonHover.className = 'menu_item';
  playButtonHover.style.top = "188px";
  playButtonHover.style.left = "0px";
  playButtonHover.style.backgroundImage = "url('images/button_play_hot.png')";
  menuContainer.appendChild(playButtonHover);

  $("#play_button").hover (
    function() {
      $(this).stop().animate({"opacity": "0"}, "slow");
    },
    function() {
      $(this).stop().animate({"opacity": "1"}, "slow");
    }
  );

  if (g_useFacebook) {
    /* Brag Button */
    var bragButton = document.createElement('div');
    bragButton.className = 'menu_item';
    bragButton.id = 'brag_button';
    bragButton.style.top = "285px";
    bragButton.style.left = "0px";
    bragButton.style.zIndex = "10";
    bragButton.setAttribute('onclick', 'javascript:sendBrag()');
    bragButton.style.backgroundImage = "url('images/button_brag.png')";
    menuContainer.appendChild(bragButton);

    var bragButtonHover = document.createElement('div');
    bragButtonHover.className = 'menu_item';
    bragButtonHover.id = 'brag_button_hover';
    bragButtonHover.style.top = "285px";
    bragButtonHover.style.left = "0px";
    bragButtonHover.style.backgroundImage = "url('images/button_brag_hot.png')";
    menuContainer.appendChild(bragButtonHover);

    $("#brag_button").hover (
      function() {
        $(this).stop().animate({"opacity": "0"}, "slow");
      },
      function() {
        $(this).stop().animate({"opacity": "1"}, "slow");
      }
    );


    /* Challenge Button */
    var challengeButton = document.createElement('div');
    challengeButton.className = 'menu_item';
    challengeButton.id = 'challenge_button';
    challengeButton.style.top = "382px";
    challengeButton.style.left = "0px";
    challengeButton.style.zIndex = "10";
    challengeButton.setAttribute('onclick', 'javascript:sendChallenge()');
    challengeButton.style.backgroundImage = "url('images/button_challenge.png')";
    menuContainer.appendChild(challengeButton);

    var challengeButtonHover = document.createElement('div');
    challengeButtonHover.className = 'menu_item';
    challengeButtonHover.id = 'challenge_button_hover';
    challengeButtonHover.style.top = "382px";
    challengeButtonHover.style.left = "0px";
    challengeButtonHover.style.backgroundImage = "url('images/button_challenge_hot.png')";
    menuContainer.appendChild(challengeButtonHover);

    $("#challenge_button").hover (
      function() {
        $(this).stop().animate({"opacity": "0"}, "slow");
      },
      function() {
        $(this).stop().animate({"opacity": "1"}, "slow");
      }
    );
    
    /* Store Button */
    var storeButton = document.createElement('div');
    storeButton.className = 'menu_item';
    storeButton.id = 'store_button';
    storeButton.style.top = "479px";
    storeButton.style.left = "0px";
    storeButton.style.zIndex = "10";
    storeButton.setAttribute('onclick', 'javascript:showStore()');
    storeButton.style.backgroundImage = "url('images/button_store.png')";
    menuContainer.appendChild(storeButton);

    var storeButtonHover = document.createElement('div');
    storeButtonHover.className = 'menu_item';
    storeButtonHover.id = 'store_button_hover';
    storeButtonHover.style.top = "479px";
    storeButtonHover.style.left = "0px";
    storeButtonHover.style.backgroundImage = "url('images/button_store_hot.png')";
    menuContainer.appendChild(storeButtonHover);

    $("#store_button").hover (
      function() {
        $(this).stop().animate({"opacity": "0"}, "slow");
      },
      function() {
        $(this).stop().animate({"opacity": "1"}, "slow");
      }
    );
  

    FB.getLoginStatus(function(response) {
          if (response.status === 'connected') {
            gPlayerFBID = response.authResponse.userID;
            
            // Register this user with the server
            console.log("Registering player with server");
            
            if (!processIncomingURL()) {
                  
              welcomePlayer(gPlayerFBID);
              showScores();
            }
          }
    });

  } else {
    welcomePlayer(null);
  } 
}

function welcomePlayer(uid) {
    console.log("Welcoming player");
    var welcomeMsgContainer = document.createElement('div');
    welcomeMsgContainer.id = 'welcome_msg_container';
    stage.appendChild(welcomeMsgContainer);

    if (g_useFacebook) {
      FB.api('/me?fields=first_name', function(response) {
          var welcomeMsg = document.createElement('div');
          var welcomeMsgStr = 'Welcome, ' + response.first_name + '!';
          welcomeMsg.innerHTML = welcomeMsgStr;
          welcomeMsg.id = 'welcome_msg';
          welcomeMsgContainer.appendChild(welcomeMsg);

          var imageURL = 'https://graph.facebook.com/' + uid + '/picture?width=256&height=256';
          var profileImage = document.createElement('img');
          profileImage.setAttribute('src', imageURL);
          profileImage.id = 'welcome_img';
          profileImage.setAttribute('height', '148px');
          profileImage.setAttribute('width', '148px');
          welcomeMsgContainer.appendChild(profileImage);
      });

      gPlayerBombs = 5;
      gPlayerLives = 5;
      gPlayerCoins = 100;
          
      $('.player_bombs').html(gPlayerBombs);
      $('.player_lives').html(gPlayerLives);
      $('.player_coins').html(gPlayerCoins);

      var coinsDisplay = document.createElement('div');
      coinsDisplay.className  = 'stats_display';
      coinsDisplay.style.top  = '100px';
      coinsDisplay.style.left = '180px';
      welcomeMsgContainer.appendChild(coinsDisplay);
      
      var coinsIcon = document.createElement('img');
      coinsIcon.setAttribute('src', 'images/coin40.png');
      coinsDisplay.appendChild(coinsIcon);
      
      var coinsNumber = document.createElement('span');
      coinsNumber.className   = 'player_coins';
      coinsNumber.innerHTML   = gPlayerCoins;
      coinsDisplay.appendChild(coinsNumber);
      
      var bombsDisplay = document.createElement('div');
      bombsDisplay.className  = 'stats_display';
      bombsDisplay.style.top  = '100px';
      bombsDisplay.style.left = '270px';
      welcomeMsgContainer.appendChild(bombsDisplay);
      
      var bombsIcon = document.createElement('img');
      bombsIcon.setAttribute('src', 'images/bomb40.png');
      bombsDisplay.appendChild(bombsIcon);
      
      var bombsNumber = document.createElement('span');
      bombsNumber.className   = 'player_bombs';
      bombsNumber.innerHTML   = gPlayerBombs;
      bombsDisplay.appendChild(bombsNumber);
      
      var livesDisplay = document.createElement('div');
      livesDisplay.className  = 'stats_display';
      livesDisplay.style.top  = '100px';
      livesDisplay.style.left = '360px';
      welcomeMsgContainer.appendChild(livesDisplay);
      
      var livesIcon = document.createElement('img');
      livesIcon.setAttribute('src', 'images/heart40.png');
      livesDisplay.appendChild(livesIcon);
      
      var livesNumber = document.createElement('span');
      livesNumber.className   = 'player_lives';
      livesNumber.innerHTML   = gPlayerLives;
      livesDisplay.appendChild(livesNumber);
      
    } else {
          var welcomeMsg = document.createElement('div');
          var welcomeMsgStr = 'Welcome, Player!';
          welcomeMsg.innerHTML = welcomeMsgStr;
          welcomeMsg.id = 'welcome_msg';
          welcomeMsgContainer.appendChild(welcomeMsg);
    }
    

    var welcomeSubMsg = document.createElement('div');
    welcomeSubMsg.innerHTML = 'Let\'s smash some friends!';
    welcomeSubMsg.id = 'welcome_submsg';
    welcomeMsgContainer.appendChild(welcomeSubMsg);
  }

function processIncomingURL() {
  var startedGame = false;
  var urlParams = {};

  (function () {
      var match,
          pl     = /\+/g,  // Regex for replacing addition symbol with a space
          search = /([^&=]+)=?([^&]*)/g,
          decode = function (s) { return decodeURIComponent(s.replace(pl, " ")); },
          query  = window.location.search.substring(1);

      while (match = search.exec(query))
         urlParams[decode(match[1])] = decode(match[2]);
  })();

  var requestType = urlParams["app_request_type"];
  
  if (requestType == "user_to_user") {
    var requestID = urlParams["request_ids"]; 
    startedGame = true;

    FB.api(requestID, function(response) {
        console.log(response);
        var gChallengerID = response.from.id;
        var gChallengerName = response.from.name.split(" ")[0];
        startGame(gChallengerID, gChallengerName);
    });
  }

  var feedStorySender = urlParams["challenge_brag"];

  if (feedStorySender) {
    startedGame = true;
      FB.api(feedStorySender, function(response) {
        console.log(response);
        var gChallengerName = response.first_name;
        startGame(feedStorySender, gChallengerName);
    });
  }

  console.log("Parsed log with a result of: " + startedGame);

  return startedGame;
}

function showScores() {
  
  var scoreboardContainer = document.createElement('div');
  scoreboardContainer.id = 'scoreboard_container';
  stage.appendChild(scoreboardContainer);
        
  var scoreboardTournamentStub = document.createElement('div');
  scoreboardTournamentStub.className = 'scoreboard_tournament_stub';
  scoreboardContainer.appendChild(scoreboardTournamentStub);  

  if (g_use_server)
  {
    console.log("Fetching tournament info from server");

      $.getJSON(g_api_url + "/tournament",
      function(data) {
        
        
        var tournamentEndDate = data['end_date'];
        tournamentEndDate = tournamentEndDate.replace(/:| /g,"-");
        var YMDhms = tournamentEndDate.split("-");
        var tournamentEndDateSQL = new Date();
        tournamentEndDateSQL.setFullYear(parseInt(YMDhms[0]), parseInt(YMDhms[1])-1,
                                                 parseInt(YMDhms[2]));
        tournamentEndDateSQL.setHours(parseInt(YMDhms[3]), parseInt(YMDhms[4]), 
                                              parseInt(YMDhms[5]), 0/*msValue*/);


        var scoreboardTournamentStubTime = document.createElement('div');
        scoreboardTournamentStubTime.className = 'scoreboard_tournament_stub_time';
        scoreboardContainer.appendChild(scoreboardTournamentStubTime);

        this.gTournamentCountdown = setInterval(function(){

          function pad2(number) {
            return (number < 10 ? '0' : '') + number
          }

          var currentDate = new Date();
          var delta = Math.abs(currentDate-tournamentEndDateSQL);
          delta /= 1000;
          var daysRemaining = Math.floor(delta / 86400);
          var hoursRemaining = Math.floor((delta % 86400) / 3600);
          var minutesRemaining = Math.floor(((delta % 86400) % 3600) / 60);
          var secondsRemaining = Math.floor(((delta % 86400) % 3600) % 60);
          var timeRemaining = daysRemaining + " Days " + pad2(hoursRemaining) + " Hrs " + pad2(minutesRemaining) + " Mins " + pad2(secondsRemaining) + " Secs";

          scoreboardTournamentStubTime.innerHTML = timeRemaining

        }, 1000);
      });

      console.log("Fetching scores from server");

      $.get(g_api_url + "/scores", { fbid: gPlayerFBID, access_token: FB.getAuthResponse()['accessToken']},
      function(data) {
          
          console.log("Got scores data from server");
          console.log(data);

          for (var i=0; i<data.length; i++) 
          {
            var scoreboardStub = document.createElement('div');
            scoreboardStub.className = 'scoreboard_stub';
            scoreboardContainer.appendChild(scoreboardStub);

            var scoreboardStubRank = document.createElement('div');
            scoreboardStubRank.className = 'scoreboard_stub_rank';
            scoreboardStubRank.innerHTML = (i+1) + ".";
            scoreboardStub.appendChild(scoreboardStubRank);

            var scoreboardStubName = document.createElement('div');
            scoreboardStubName.className = 'scoreboard_stub_name';
            scoreboardStubName.innerHTML = data[i].first_name;
            scoreboardStub.appendChild(scoreboardStubName);

            var scoreboardStubScore = document.createElement('div');
            scoreboardStubScore.className = 'scoreboard_stub_score';
            scoreboardStubScore.innerHTML = "Score: " + data[i].highscore;
            scoreboardStub.appendChild(scoreboardStubScore);

            var scoreboardStubImage = document.createElement('img');
            scoreboardStubImage.setAttribute('src', "https://graph.facebook.com/" + data[i].fbid + "/picture?width=128&height=128");
            scoreboardStubImage.className = 'scoreboard_stub_image';
            scoreboardStub.appendChild(scoreboardStubImage);

            var scoreboardStubChallengeButton = document.createElement('img');
            scoreboardStubChallengeButton.setAttribute('src', "/images/button_scoreboardchallenge.png");
            scoreboardStubChallengeButton.className = 'scoreboard_stub_challengebutton';
            
            scoreboardStubChallengeButton.onclick = (function() {
              var fbid = data[i].fbid;
              var first_name = data[i].first_name;
              return function() {
                startGame(fbid, first_name);
              } 
            })();

            scoreboardStub.appendChild(scoreboardStubChallengeButton);
              
          }
      });
  }
}

function sendChallenge() {
  
  var challengeData = {"challenge_score" : gScore};

  if (gScore) {
    FB.ui({method: 'apprequests',
      title: 'Friend Smash Challenge!',
      message: 'I just smashed ' + gScore + ' friends! Can you beat it?',
      data: challengeData
    }, fbCallback);
  }
  else {
    FB.ui({method: 'apprequests',
      title: 'Play Friend Smash with me!',
      message: 'Been having a smashing time playing Friend Smash, come check it out.',
    }, fbCallback);
  }
}

function sendOG() {
  console.log("Sending custom OG story...");

  FB.api('/me/friendsmashsample:smash?profile=' + gFriendID, 'post', {}, function(response) {
    console.log(response);
  });
}

function sendBrag() {    
  if (gScore) {
    FB.ui({ method: 'feed',
      caption: 'I just smashed ' + gScore + ' friends! Can you beat it?',
      picture: 'http://www.friendsmash.com/images/logo_large.jpg',
      name: 'Checkout my Friend Smash greatness!',
      link: 'http://apps.facebook.com/friendsmashsample/?challenge_brag=' + gPlayerFBID
    }, fbCallback);
  }
}

function sendScore() {
  if (gScore) {
    console.log("Posting score to Facebook");
    FB.api('/me/scores/', 'post', { score: gScore }, function(response) {
      console.log("Score posted to Facebook");
    });

    if (g_use_server) {
      console.log("Posting score to server");

      $.post(g_api_url + "/scores", { fbid: gPlayerFBID, score: gScore },
      function(data) {
        console.log("Response from server:" + data);
      });
    } 
  }
}

function sendAchievement(kAchievement) {

  var achievementURLs = Array();
  achievementURLs[0] = "http://www.friendsmash.com/achievement_50.html";
  achievementURLs[1] = "http://www.friendsmash.com/achievement_100.html";
  achievementURLs[2] = "http://www.friendsmash.com/achievement_150.html";
  achievementURLs[3] = "http://www.friendsmash.com/achievement_200.html";
  achievementURLs[4] = "http://www.friendsmash.com/achievement_x3.html";

  FB.api('/me/scores/', 'post', { achievement: achievementURLs[kAchievement] }, function(response) {
    console.log("Achievement posted");
  });
}



function displayMenu(display) {
  if (display == true) {

    if (!document.getElementById('welcome_msg_container')) {
      welcomePlayer(gPlayerFBID);
    }
    else {
      document.getElementById('welcome_msg_container').style.display = 'block';
    }

    document.getElementById('menu_container').style.display = 'block';
    
    document.getElementById('menu_shim').style.display = 'block';
    
    if (document.getElementById('ingame_scoreText')) {
      document.getElementById('ingame_scoreText').style.display = 'none';
    }
    if (document.getElementById('ingame_smashText')) {
      document.getElementById('ingame_smashText').style.display = 'none';
    }

    for (var j=0; j<gLifeImages.length; j++) {
          gLifeImages[j].style.display = 'none';
    }

    for (var j=0; j<gBombImages.length; j++) {
          gBombImages[j].style.display = 'none';
    }    

    if (g_useFacebook) {
      showScores();
    }
  }
  else {
    
    if (document.getElementById('menu_container')) {
      document.getElementById('menu_container').style.display = 'none';
    }

    if (document.getElementById('welcome_msg_container')) {
      document.getElementById('welcome_msg_container').style.display = 'none';  
    }


    document.getElementById('menu_shim').style.display = 'none';

    $("#scoreboard_container").detach();

    if (document.getElementById('ingame_scoreText')) {
      document.getElementById('ingame_scoreText').style.display = 'block';
    }
    if (document.getElementById('ingame_smashText')) {
      document.getElementById('ingame_smashText').style.display = 'block';
    }
  }
}

function startGame(fbid, name) {
    initGame(fbid, name, Math.min(3, gPlayerBombs));
    displayMenu(false, true);
}

function fbCallback(response) {
  console.log(response);
}

function showStore() {
   var background = document.createElement('div');
   background.id         = 'modal_background';
   stage.appendChild(background);

   var storeContainer = document.createElement('div');
   storeContainer.id      = 'store';
   stage.appendChild(storeContainer);
   
   var closeStoreButton = document.createElement('div');
   closeStoreButton.id    = 'close_button';
   closeStoreButton.setAttribute('onclick', 'javascript:closeStore()');
   stage.appendChild(closeStoreButton);
   
   buildStore();

   $(background).animate({'opacity': 1}, 'fast');
   $(storeContainer).animate({'opacity': 1}, 'normal');
   $(closeStoreButton).animate({'opacity': 1}, 'normal');
}

function closeStore() {
  $('#store').animate({'opacity': 0}, 'fast', function(){this.remove()});
  $('#close_button').animate({'opacity': 0}, 'fast', function(){this.remove()});
  $('#modal_background').animate({'opacity': 0, }, 'normal', function(){this.remove()});
}

function showPopUp(options) {
  options       = options || {};
  var img_src   = options.img || false;
  var titleMsg  = options.title || "";
  var callback  = options.callback || null; 
  
  var background = document.createElement('div');
  background.id         = 'modal_background';
  stage.appendChild(background);
  
  var container = document.createElement('div');
  container.id      = 'pop_up';
  stage.appendChild(container);
  
  var closeButton = document.createElement('div');
  closeButton.id    = 'close_button';
  closeButton.setAttribute('onclick', 'javascript:closePopUp('+callback+')');
  stage.appendChild(closeButton);
  
  var header = document.createElement('div');
  container.appendChild(header);
  
  if(img_src) {
    var image = document.createElement('img');
    image.setAttribute('src', 'images/'+img_src);
    header.appendChild(image);
  }
  
  var title = document.createElement('h1');
  title.innerHTML  = titleMsg;
  header.appendChild(title);
  
  var content = document.createElement('div');
  content.style.position  = 'absolute';
  content.style.top       = '75px';
  content.style.width     = '100%';
  container.appendChild(content);
  
  $(background).animate({'opacity': 1}, 'fast');
  $(container).animate({'opacity': 1}, 'normal');
  $(closeButton).animate({'opacity': 1}, 'normal');
  
  return content;
}

function closePopUp(callback) {
  $('#modal_background').animate({'opacity': 0}, 'normal', function(){this.remove(); if(callback) callback();});
  $('#pop_up').animate({'opacity': 0}, 'fast', function(){this.remove()});
  $('#close_button').animate({'opacity': 0}, 'fast', function(){this.remove()});
}
