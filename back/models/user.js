
const DataTypes = require('sequelize');
const { Model } = DataTypes;

module.exports = class Post extends Model {
  static init(sequelize) {
    return super.init({
      // id가 기본적으로 들어있다.
      userName: {
        type: DataTypes.STRING(20), // 20글자 이하
        allowNull: false, // 필수
      },
      userId: {
        type: DataTypes.STRING(20),
        allowNull: false,
        unique: true, // 고유한 값
      },
      password: {
        type: DataTypes.STRING(100), // 100글자 이하
        allowNull: false,
      },
      tel: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      gender: {
        type: DataTypes.STRING(20),
        allowNull: false
      },
      email:{
        type: DataTypes.STRING(50),
        allowNull: false,
      }
    }, {
      modelName: 'User',
      tableName: 'users',
      charset: 'utf8',
      collate: 'utf8_general_ci', // 한글 저장
      sequelize,
    });
  }
  static associate(db) {
    // db.User.belongsToMany(db.Post, { through: 'Like', as: 'Liked' });
  }
};

