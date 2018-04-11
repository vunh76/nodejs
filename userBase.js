const Promise = require('bluebird');
const RepoBase = require('./repoBase');
const consts = require('./consts').consts;

class RepoUser extends RepoBase {
    constructor(db) {
        super(db, 'user');
    }

    getByRealtimeId(in_realtime_id) {
        return this.entities
            .findOne({
                where: {
                    realtime_id: in_realtime_id
                }
            });
    }

    getByUserName(username) {
        return this.entities
            .findOne({
                where: {
                    user_name: username
                }
            });
    }

    getUserWithMembership(user_id) {
        return this.entities
            .findOne({
                where: {
                    id: user_id
                },
                include: [
                    { model: this.db.membership }
                ]
            });
    }

    getUserWithPermissions(username) {
        return this.entities
            .findOne({
                where: {
                    user_name: username
                },
                include: [
                    { model: this.db.membership },
                    { model: this.db.zone },
                    {
                        model: this.db.user_role,
                        include: [
                            {
                                model: this.db.role,
                                include: [
                                    {
                                        model: this.db.role_action,
                                        include: [{ model: this.db.action }]
                                    }
                                ]
                            }
                        ]
                    }
                ]
            });
    }

    listingUsers(username, zone_id, page, size) {
        var filter = {};
        if (username) {
            filter[username] = username;
        }
        else {
            if ((zone_id || 0) > 0) {
                filter['zone_id'] = zone_id;
            }
        }
        size = Math.max(size, 100);
        var from = (Math.max(page, 1) - 1) * size;

        var promise = (resolve, reject) => {
            this.entities
                .findAndCount({
                    where: filter,
                    distinct: true,
                    include: [
                        {
                            model: this.db.user_role,
                            required: true,
                            include: [
                                { model: this.db.role }
                            ]
                        },
                        { model: this.db.zone }
                    ],
                    offset: from,
                    limit: size
                }).then(pagination => {
                    var users = pagination.rows.reduce((map, u) => {
                        var user = u.get({ plain: true });
                        user.roles = user.user_roles.reduce((m, ur) => {
                            m.push(ur.role);
                            return m;
                        }, []);
                        delete user.user_roles;
                        map.push(user);
                        return map;
                    }, []);
                    resolve({
                        total: pagination.count,
                        list: users
                    });
                }).catch(err => {
                    reject(err);
                });
        };

        return new Promise(promise.bind(this));
    }

    editUserRoles(user_id, role_ids) {

        var promise = (resolve, reject) => {
            this.entities
                .findOne({
                    where: {
                        $and: {
                            id: user_id
                        }
                    },
                    include: [{ model: this.db.user_role }]
                })
                .then(user => {
                    if (!user) {
                        throw new Error('Không tìm thấy tài khoản!');
                    }

                    var results = [];
                    var old_roles = user.user_roles.map(ur => { return ur.get('role_id'); });
                    role_ids.forEach(ur_id => {
                        if (!old_roles.includes(ur_id)) {
                            results.push(user.createUser_role({
                                role_id: ur_id,
                                user_id: user_id
                            }));
                        }
                    });

                    results.push(this.db.user_role.destroy({
                        where: {
                            user_id: user_id,
                            role_id: { $notIn: role_ids }
                        }
                    }));

                    return Promise.all(results)
                        .then(ret => {
                            resolve(true);
                        }).catch(error => {
                            throw error;
                        });

                }).catch(error => {
                    reject(error);
                });

        };

        return new Promise(promise.bind(this));
    }

    createUser(dtoUser, type_mask, check_existed) {
        check_existed= check_existed || false;
        var promise = (resolve, reject) => {
            type_mask = type_mask || 0;
            dtoUser.type = type_mask;
            return this.getByUserName(dtoUser.user_name)
                .then(user => {
                    if (!user) {
                        return this.insert(dtoUser)
                            .then(new_user => {
                                var user_id = new_user.id;
                                var promises = [new_user];
                                promises.push(new_user.createMembership({
                                    is_blocked: true,
                                    password: dtoUser.password
                                }));

                                promises.push(new_user.createBalance({
                                    cash: 0,
                                    coin: 0,
                                    created_by: user_id,
                                    updated_by: user_id,
                                    updated_at: new Date(),
                                    created_at: new Date()
                                }));

                                return Promise.all(promises)
                                    .then(alls => {
                                        resolve(alls);
                                    })
                                    .catch(error => {
                                        throw error;
                                    });

                            })
                            .catch(error => {
                                throw error;
                            });
                    }
                    else if(check_existed) {
                        throw new ValidationError(`${dtoUser.user_name} đã tồn tại, bạn vui lòng chọn tên đăng nhập khác`);
                    }
                    else {
                        dtoUser.id = user.id;
                        if((user.verification & consts.USER_VALIDATIONS.CARD) > 0) {
                            delete dtoUser.fullname;
                            delete dtoUser.avatar_url;
                            delete dtoUser.email;
                        }

                        dtoUser.verification = ((user.verification || 0) | (dtoUser.verification || 0));

                        dtoUser.type = (type_mask | (user.type || 0));
                        var promises = [];
                        promises.push(this.update(dtoUser));
                        promises.push(user.getMembership());
                        promises.push(user.getBalance());

                        return Promise.all(promises)
                            .then(alls => {
                                resolve(alls);
                            })
                            .catch(error => {
                                throw error;
                            });
                    }
                })
                .catch(error => {
                    reject(error);
                });
        };

        return new Promise(promise.bind(this));
    }

    getByIds(ids, attributes) {
        var query = {
            where: {
                id: {
                    $in: (ids || [])
                }
            }
        };

        if (attributes) {
            query['attributes'] = attributes;
        }

        return this.entities
            .findAll(query);
    }

    listingPromotionOwners(filter) {
        var keyword = filter.keyword || '';
        var zones = filter.zones;
        var page = filter.page || 1;
        var size = filter.size || 40;

        var where = {
            zone_id: { $in: zones },
        };

        if ((keyword || '').length > 0) {
            where['$or'] = {
                fullname: { $like: `%${keyword}%` },
                user_name: { $like: `%${keyword}%` }
            };
        }

        return this.paging({
            where,
            include: [
                { model: this.db.balance, required: true },
                {
                    model: this.db.user_role,
                    where: this.db.Sequelize.where(
                        this.db.Sequelize.literal('role_id'),
                        ' IN ',
                        this.db.Sequelize.literal('(SELECT id from roles where code IN (\'bank\', \'fee_income\'))')
                    )
                }
            ],
            offset: (page - 1) * size,
            limit: size
        });
    }

    getUserWithBalances(filter) {
        var keyword = filter.keyword;
        var zone_id = filter.zone_id;
        var roles = filter.roles || [];
        var page = filter.page || 1;
        var size = filter.size || 40;

        var where = {};
        var inclueRole = {
            model: this.db.user_role,
            required: true,
            include: [
                { model: this.db.role }
            ]
        };
        if (keyword.length > 0) {
            where['user_name'] = { $like: keyword };
        }

        if ((zone_id || 0) > 0) {
            where['zone_id'] = zone_id;
        }

        if (roles.length > 0) {
            inclueRole.where = { role_id: { $in: roles } };
        }

        size = Math.max(size, 100);
        var from = (Math.max(page, 1) - 1) * size;

        var promise = (resolve, reject) => {
            this.entities
                .findAndCount({
                    where,
                    distinct: true,
                    include: [
                        inclueRole,
                        { model: this.db.balance, required: false },
                        { model: this.db.zone }
                    ],
                    offset: from,
                    limit: size
                }).then(pagination => {
                    var users = pagination.rows.reduce((map, u) => {
                        var user = u.get({ plain: true });
                        user.roles = user.user_roles.reduce((m, ur) => {
                            m.push(ur.role);
                            return m;
                        }, []);
                        delete user.user_roles;
                        map.push(user);
                        return map;
                    }, []);
                    resolve({
                        total: pagination.count,
                        list: users
                    });
                }).catch(err => {
                    reject(err);
                });
        };

        return new Promise(promise.bind(this));
    }

    getUserWithRoles(user_id) {
        return this.entities
            .findOne({
                distinct: true,
                where: {
                    id: user_id
                },
                include: [
                    {
                        model: this.db.user_role,
                        include: [
                            {
                                model: this.db.role,
                                include: [
                                    {
                                        model: this.db.role_action,
                                        include: [{ model: this.db.action }]
                                    }
                                ]
                            }
                        ]
                    }
                ]
            });
    }

    getUsersWaitForApproval(filter) {
        const keyword = filter.keyword || '';
        const page = filter.page || 1;
        const size = filter.size || 40;
        const zones = filter.zones || [];

        const statuses = filter.statuses || [consts.APPROVE_STATUSES.WAIT_FOR_APPROVAL];

        var where = {
            zone_id: { $in: zones },
            approve_status: { $in: statuses }
        };

        if ((keyword || '').length > 0) {
            where['$or'] = {
                id: { $like: `%${keyword}%` },
                fullname: { $like: `%${keyword}%` },
                user_name: { $like: `%${keyword}%` }
            };
        }

        var promise = (resolve, reject) => {
            return this
                .paging({
                    where,
                    distinct: true,
                    include: [
                        { attributes: ['id', 'name', 'parent_id'], model: this.db.zone }
                    ],
                    order: [['created_at', 'ASC']],
                    offset: (page - 1) * size,
                    limit: size
                })
                .then(pagination => {
                    var users = pagination.rows;
                    resolve({
                        total: pagination.count,
                        list: users
                    });
                })
                .catch(error => {
                    reject(error);
                });
        };

        return new Promise(promise.bind(this));
    }

    getCashoutAccount(cashout_type) {

        var where = {
            type: cashout_type
        };

        return this.entities.findOne({
            where,
            include: [
                { model: this.db.balance, required: true },
                { model: this.db.membership, required: true }
            ]
        });
    }

    getUserInfo(user_id) {
        return this.entities
            .findOne({
                where: {
                    id: user_id
                },
                include: [
                    { model: this.db.balance, required: true }
                ]
            });
    }

}

module.exports = RepoUser;