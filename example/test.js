var HappnAPI = require('../index');

var happnInstance = new HappnAPI();

var fb_access_token = 'YOUR-FB-ACCESS-TOKEN';
var assertion_type = 'facebook'; // only allows facebook.

happnInstance.connect(fb_access_token, assertion_type, function(err, resp){
  if (err) {
    console.log(err)
    return;
  }
  // user_id of the authenticated user.
  console.log(resp.user_id);
});
