var Config = require('./config');
var Helper = require('./lib/utils');
var APIUrl = require('./lib/api-urls');
var Http = require('./lib/http');
var Logger = require('./lib/logger');

function HappnAPI() {
  this.provider_token = null;
  this.assertion_type = null;
  this.access_token = null;
  this.headers = {
    'http.useragent': 'Happn/1.0 AndroidSDK/0',
    'User-Agent': 'Dalvik/1.6.0 (Linux; U; Android 4.4.2; SCH-I535 Build/KOT49H)',
    'Host': 'api.happn.fr',
    'connection': 'Keep-Alive',
    // 'Accept-Encoding': 'gzip'
  }
}

HappnAPI.prototype._setProviderToken = function(token){
  this.provider_token = token;
}

HappnAPI.prototype._setAssertionType = function(assertion_type){
  switch ( assertion_type ) {
    case 'facebook':
      this.assertion_type = 'facebook_access_token';
      break;
    default:
      this.assertion_type = 'facebook_access_token';
      break;
  }
}

/*
* @param provider_token (Facebook Access Token, )
* @param assertion_type (Accepts only 'facebook', for now)
* @return request-promise with then() and catch() methods
* Gets the OAuth tokens using Happn's API
*/
HappnAPI.prototype._getOAuth = function(provider_token, assertion_type){

  this._setProviderToken(provider_token);

  this._setAssertionType(assertion_type);

  var headers = Helper.clone(this.headers);

  // Payload for the POST request.
  var payload = {
    "client_id"     : Config.CLIENT_ID,
    "client_secret" : Config.CLIENT_SECRET,
    "grant_type"    : Config.GRANT_TYPE,
    "scope"         : Config.SCOPE,
    "assertion_type": this.assertion_type,
    "assertion"     : this.provider_token,
  }

  Helper.extend(headers, {
    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
  });

  return Http.post(APIUrl.oAuthURL, payload, headers);
}

/*
* @param provider_token (Facebook Access Token, )
* @param assertion_type (Accepts only 'facebook', for now)
* @param cb called after the request.
  *       Pass the user_id of the currently authenticated user.
* Connects with HappnApi.
*/
HappnAPI.prototype.connect = function(provider_token, assertion_type, cb) {
  this._getOAuth(provider_token, assertion_type)
    .then(function(resp){
      Logger.info('Connected.');
      Helper.extend(this, resp);
      cb(null, {user_id: this.user_id});
    })
    .catch(function(err){
      Logger.error('Error.');
      cb(err);
    });
}

module.exports = HappnAPI;
