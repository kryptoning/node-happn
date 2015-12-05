# node-happn
---
Node package providing programmatic access to the Happn API

This package is under develop. For now, only authenticate an user.

## Getting Started
---

### Install the package

`npm install node-happn`

### Use it:

First you need a facebook token to create a Happn User-Object. You can get the one associated with your facebook account by clicking [here](https://www.facebook.com/dialog/oauth?client_id=464891386855067&redirect_uri=https://www.facebook.com/connect/login_success.html&scope=basic_info,email,public_profile,user_about_me,user_activities,user_birthday,user_education_history,user_friends,user_interests,user_likes,user_location,user_photos,user_relationship_details&response_type=token) and copying it from the address bar.

```js
  var HappnAPI = require('node-happn');

  var happnInstance = new HappnAPI();

  var fb_access_token = 'YOUR-FB-ACCESS-TOKEN';
  var assertion_type = 'facebook'; // only allows facebook.

  happnInstance.connect(
    fb_access_token,
    assertion_type,
    // callback
    function(err, resp){
      if (err) {
        console.log(err)
        return;
      }
      // user_id of the authenticated user.
      console.log(resp.user_id);
    }
  );
```

## TODO

- Can you see the list of features [here](https://github.com/kryptoning/node-happn/milestones).
