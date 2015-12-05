var _ = require('lodash');

module.exports = {
  clone: function(obj) {
    return _.cloneDeep(obj);
  },
  extend: function(obj, obj2) {
    return _.extend(obj, obj2);
  }
}
