const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Conversation_To_User extends Model {
    
    static associate(models) {
      Conversation_To_User.belongsTo(models.User, {
        foreignKey: 'participant',
        sourceKey: 'id',
      });
      Conversation_To_User.belongsTo(models.Conversation, {
        foreignKey: 'conversationId',
        sourceKey: 'id',
      });
    }
  
  };
  Conversation_To_User.init({
    participant: {
      allowNull: false,
      type: DataTypes.INTEGER,
      field: 'user_id',
      primaryKey: true,
    },
    conversationId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      field: 'conversation_id',
      primaryKey: true,
    },
    blackList: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    favoriteList:  {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    }
  }, {
    sequelize,
    timestamps: false,
    modelName: 'Conversation_To_User',
    tableName: 'conversations_to_users',
  });
  return Conversation_To_User;
};