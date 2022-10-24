const { Model } = require('sequelize');
const bcrypt = require('bcrypt');
const { SALT_ROUNDS } = require('../constants');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Offer, { 
        foreignKey: 'userId', 
        targetKey: 'id' 
      });

      User.hasMany(models.RefreshToken, {
        foreignKey: 'userId',
        targetKey: 'id',
      });

      User.hasMany(models.Contest, {
        foreignKey: 'userId',
        targetKey: 'id',
      });

      User.hasMany(models.Message, {
        foreignKey: 'sender',
        targetKey: 'id',
      });

      User.hasMany(models.Rating, {
        foreignKey: 'userId',
        targetKey: 'id',
      });

      User.belongsToMany(models.Conversation, { 
         through: models.Conversation_To_User, 
      });

      User.hasMany(models.Catalog, {
        foreignKey: 'userId',
        targetKey: 'id',
      });

      User.hasMany(models.Conversation_To_User, {
        foreignKey: 'UserId',
        targetKey: 'id',
      });

      User.belongsTo(models.Role, {
        foreignKey: 'role',
        sourceKey: 'name',
      });
    }
  }

  User.init(
    {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    displayName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    avatar: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'anon.png',
    },
    balance: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      defaultValue: 0,
      validate: {
        min: 0,
      },
    },
    rating: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },
    role: {
      allowNull: false,
        type: DataTypes.STRING,
        references: {
          model: 'Roles',
          key: 'name',
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    modelName: 'User',
    tableName: 'Users',
  });

  User.beforeCreate(async (user) => {
    const hashedPassword = await bcrypt.hash(user.password, SALT_ROUNDS);
    console.log(user.password, hashedPassword);
    user.password = hashedPassword;
  });

  User.beforeUpdate(async (user) => {
    if (user.password) {
      const hashedPassword = await bcrypt.hash(user.password, SALT_ROUNDS);
      user.password = hashedPassword;
    }
  });

  return User;
};
