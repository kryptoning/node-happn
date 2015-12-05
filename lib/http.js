var rp = require('request-promise');

module.exports = {
  post: function(url, data, headers) {
    var options = {
      uri: url,
      method: 'POST',
      form: data || {},
      headers: headers || {},
      json: true
    };
    return rp(options);
  }
}
