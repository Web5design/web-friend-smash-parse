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

var g_useFacebook = true;
var g_api_url     = "https://immense-hamlet-8089.herokuapp.com";
var g_init        = false;
var gInitialBombs = 5;
var gInitialCoins = 100;
var stage;

var appId = '1393332784218683';

// Initialize the Facebook JS SDK
FB.init({
  appId: appId,
  frictionlessRequests: true,
  cookie: false,
  status: false
});

// Initialize the Parse SDK
Parse.initialize("ILQ3MtsLG2uv7ZHFMm7ZHoE8BIAKwA1SySejgYDj", "ylEv4PMhC45mXfgZXYuCM2VIPgqZg8RwlPBAjKhC");

window.onload = function () {

  setTimeout(function () {
    gCanvasWidth = parseInt(stage.style.width);
    gCanvasHeight = parseInt(stage.style.height);

    var gameboard = document.getElementById('gameboard');
    gameboard.style.width = gCanvasWidth + 'px';
    gameboard.style.height = gCanvasHeight + 'px';

  }, 10);
  
  setTimeout(function () {
    window.scrollTo(0, 1);
  }, 500);
  
  setTimeout(function () {
   init();
 }, 1000)
  
  stage = document.getElementById('stage');

  // Set the dimensions to the match the client
  // This throws off game balance, but it's just a demo ;)
stage.style.width = '940px';
stage.style.height = '570px';

}

function init() {
  FB.getLoginStatus(function(response) {
    if( response.authResponse ) {
      Parse.FacebookUtils.logIn(
        getLoginParamsFromAuthResponse(response.authResponse)
      ).then(loginSuccessCallback, loginErrorCallback);
    } else {
      FB.login(init, {scope:'publish_actions'});
    }
  });
}

function updatePlayer() {
  Parse.User.current().save({
    bombs: gPlayerBombs,
    coins: gPlayerCoins
  }).then( updatePlayerUI, parseErrorCallback );
}

function getLoginParamsFromAuthResponse(authResponse) {
  return {
    id: authResponse.userID,
    access_token: authResponse.accessToken,
    expiration_date: convertExpiryDate(authResponse.expiresIn)
  };
}

function convertExpiryDate(expiresIn) {
  var date = new Date();
  date.setSeconds(date.getSeconds() + expiresIn);
  return ''
    + date.getUTCFullYear() + '-'
    + ('0' + (date.getMonth()+1)).slice(-2) + '-'
    + ('0' + date.getDay()).slice(-2) + 'T'
    + ('0' + date.getHours()).slice(-2) + ':'
    + ('0' + date.getMinutes()).slice(-2) + ':'
    + ('0' + date.getSeconds()).slice(-2) + '.'
    + ('00' + date.getMilliseconds()).slice(-3) + 'Z';
}

function loginSuccessCallback(user) {
  console.log('Successful login', user);
  if( !user.existed() ) {
    setupNewParseUser();
  } else {
    createMenu();
  }
}

function loginErrorCallback(error) {
  console.error('Login error', error);
}

function parseSuccessCallback(object) {
  console.log('Parse Success:', object);
}

function parseErrorCallback(error) {
  console.error('Parse Error:', error);
}

function setupNewParseUser() {
  Parse.User.current().save({
    bombs: gInitialBombs,
    coins: gInitialCoins
  }).then( createMenu, parseErrorCallback );
}