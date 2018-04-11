const consts = require('./consts').consts;

module.exports = function (sequelize, DataTypes) {
    var user = sequelize.define('user', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      user_name: {
        type: DataTypes.STRING,
        validate: {
          len: [0, 250]
        }
      },
      fullname: {
        type: DataTypes.STRING(50),
        charset: 'utf8',
        collate: 'utf8_unicode_ci'
      },
      zone_id: {
        type: DataTypes.INTEGER
      },
      created_at: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updated_at: {
        allowNull: true,
        type: DataTypes.DATE
      },
      realtime_id: DataTypes.STRING,
      birthday: DataTypes.DATE,
      type: DataTypes.BIGINT,
      avatar_url: DataTypes.TEXT,
      email: DataTypes.STRING(256),
      phone: DataTypes.STRING(15),
      new_version: DataTypes.TEXT,
      
      payment_id: DataTypes.STRING,
      payment_type: DataTypes.BIGINT,
      idcard_img_front: DataTypes.TEXT,
      idcard_img_back: DataTypes.TEXT,
      idcard_no: DataTypes.STRING(50),
      idcard_issue_date: DataTypes.DATE,
      idcard_issue_place: DataTypes.STRING(150),
      verification: DataTypes.BIGINT,
      approve_status: DataTypes.BIGINT,
      approve_desc: DataTypes.TEXT,
      approved_by: DataTypes.INTEGER,
      approved_at: DataTypes.DATE,
      updated_by: DataTypes.INTEGER,
      created_by: DataTypes.INTEGER
    }, {
        underscored: true
    });
    
    user.prototype.isDriver = function() { 
      return (this.type & consts.USER_TYPES.DRIVER) > 0;
    };
  
    user.prototype.isClient = function() { 
      return (this.type & consts.USER_TYPES.CLIENT) > 0;
    };
  
    return user;
  };