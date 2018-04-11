var Promise = require('bluebird');

class RepoBase {
    constructor(db, model_name) {
        this.db = db;
        this.model_name = model_name;
        this.model_name_keys = `${model_name}-keys`;
        this.entities = this.db[this.model_name];
        //this._getCachedKey = (keys) => (`${this.model_name}-${(keys instanceof Array ? keys : [keys]).join('-')}`);
    }

    _getCachedKey(keys) {
        const key = `${this.model_name}-${(keys instanceof Array ? keys : [keys]).join('-')}`;
        this.db
            .cached
            .get(this.model_name_keys, (error, keys) => {
                if (!keys) {
                    keys = {};
                }
                if (!keys[key]) {
                    keys[key] = true;
                }
                this.db.cached.set(this.model_name_keys, keys);
            });
        return key;
    }

    insert(dto) {
        var promise = (resolve, reject) => {
            return this.entities
                .build(dto)
                .save()
                .then(entity => {
                    resolve(entity);
                });
        };
        return new Promise(promise.bind(this));
    }

    update(dto) {
        this.clearAllCache();
        var promise = (resolve, reject) => {
            return this.entities
                .findOne({
                    where: {
                        id: dto.id
                    }
                })
                .then(existed => {
                    if (existed) {
                        delete dto.id;
                        return existed.update(dto)
                            .then(lasted_entity => {
                                resolve(lasted_entity);
                            })
                            .catch(error => {
                                throw error;
                            });
                    }
                    else {
                        throw new Error(`${this.model_name} entity's id ${dto.id} was not existed`);
                    }

                });
        };

        return new Promise(promise.bind(this));
    }

    upsert(dto) {
        this.clearAllCache();
        return this.entities.upsert(dto);
    }

    updates(attributes, filter) {
        this.clearAllCache();
        return this.entities.update(attributes, filter);
    }

    getById(id) {
        return this.entities
            .findOne({
                where: {
                    id: id
                }
            });
    }

    getAll(filter) {
        return this.entities.findAll(filter);
    }

    query(sequlizeQuery) {
        return this.entities.findAll(sequlizeQuery);
    }

    paging(options) {
        return this.entities.findAndCount(options);
    }


    clearAllCache() {
        try {
            this.db
                .cached
                .get(this.model_name_keys, (error, cached_keys) => {
                    if (cached_keys) {
                        const keys = Object.keys(cached_keys);
                        keys.forEach(key => {
                            this._clearCache(key);
                        });
                    }
                });
        }
        catch (error) { }
    }

    _clearCache(key) {
        this.db.cached.del(key, (error) => { });
    }

}

module.exports = RepoBase;