const BaseService = require('./baseService');

class UserService extends BaseService {
    constructor(db, serviceProvider) {
        super(db, serviceProvider);
    }

    getUserById(user_id) {
        return this.repo.User.getById(user_id);
    }
};

module.exports = (db, serviceProvider) => { 
    return new UserService(db, serviceProvider); 
};