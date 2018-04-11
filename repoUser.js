const Promise = require('bluebird');
const BaseRepoUser = require('./userBase');

class RepoUser extends BaseRepoUser {
    constructor(db) {
        super(db, 'user');
    }

    getById(id) {
        var key = this._getCachedKey(id);
        return this.db
            .cached
            .wrap(key, (cb) => {
                return super.getById(id);
            });
    }

    getByRealtimeId(in_realtime_id) {
        var key = this._getCachedKey(['realtimeid', in_realtime_id]);
        return this.db
            .cached
            .wrap(key, (cb) => {
                return super.getByRealtimeId(in_realtime_id);
            });

    }

    getByUserName(username) {
        var key = this._getCachedKey(['username', username]);
        return this.db
            .cached
            .wrap(key, (cb) => {
                return super.getByUserName(username);
            });
    }
}

module.exports = (db) => { 
    return new RepoUser(db); 
};