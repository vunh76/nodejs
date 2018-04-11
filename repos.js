const repoUser = require('./repoUser');

module.exports = function (db) {
  var repo = {};
  repo['User'] = repoUser(db);
  return repo;
};
