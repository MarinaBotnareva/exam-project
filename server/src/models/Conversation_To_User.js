const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Conversation_To_User extends Model {
    static associate(models) {
      Conversation_To_User.belongsTo(models.User, {
        foreignKey: 'UserId',
        sourceKey: 'id',
      });
      Conversation_To_User.belongsTo(models.Conversation, {
        foreignKey: 'ConversationId',
        sourceKey: 'id',
      });
    }
  
  };
  Conversation_To_User.init({
    UserId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    ConversationId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'conversations',
        key: 'id'
      }
    },
    blackList: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    favoriteList:  {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    }
  }, {
    sequelize,
    timestamps: false,
    modelName: 'Conversation_To_User',
    tableName: 'conversations_to_users',
  });
  return Conversation_To_User;
};
    