const repoFactory = require('./repos');

class BaseService {
    constructor(db, serviceProvider) {
        this.repo = repoFactory(db);
        this.services = serviceProvider;
    }
}

module.exports = BaseService;