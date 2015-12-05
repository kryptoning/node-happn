var Config = require('../config');

module.exports = {
  log: function(){
    if ( Config.debug ) {
      console.log(arguments[0]);
    }
  },
  info: function(){
    if ( Config.debug ) {
      console.info(arguments[0]);
    }
  },
  error: function(){
    if ( Config.debug ) {
      console.error(arguments[0]);
    }
  },
}
