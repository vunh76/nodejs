const Sequelize = require('sequelize');
const fs = require('fs');
const path = require('path');
const uuid = require('node-uuid');
const cls = require('continuation-local-storage');
const cacheManager = require('./cacheManager');

function db(namespace) {
    var dbinst = {
      vivuId: uuid.v4()
    };
  
    if (namespace) {
        dbinst.trans_namespace = cls.createNamespace(`trans-${namespace}`);
        Sequelize.useCLS(dbinst.trans_namespace);
    }
  
    const sequelize = new Sequelize('vivu', 'root', '123456', {
        host: 'localhost',
        dialect: 'mysql',
        operatorsAliases: false,
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    });
    
    const model = sequelize['import'](path.join(__dirname, 'userModel'));
    dbinst[model.name] = model;
  
    Object.keys(dbinst).forEach(function (modelName) {
      if (dbinst[modelName].associate) {
        dbinst[modelName].associate(dbinst);
      }
    });
  
    dbinst.sequelize = sequelize;
    dbinst.Sequelize = Sequelize;
    dbinst.cached = cacheManager(Promise, true);
  
    return dbinst;
}

module.exports = db;