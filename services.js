const dbFactory = require('./models');
const userService = require('./userService');
const common = require('./common');

class ServiceProvider {
  constructor(namespace) {
    this.db = dbFactory(namespace);
    this.uow = this.db.sequelize.transaction.bind(this.db.sequelize);
  }

  init() {
    var self = this;
    self['User'] = userService(self.db, self);
    if (!self.repo) {
        self.repo = self['User'].repo;
    }

    return self;
  }
}

var services = {};

module.exports = (namespace) => {
  var index = common.getRandomInt(0, 10);
  var key = `${namespace}_${index}`;
  return services[key] ? services[key] : (services[key] = new ServiceProvider(key).init());
};