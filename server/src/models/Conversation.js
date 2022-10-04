const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Conversation extends Model {
    
    static associate(models) {
      Conversation.hasMany(models.Message, {
        foreignKey: 'conversation',
        targetKey: 'id',
      });
      Conversation.belongsToMany(models.User, {
        through: models.Conversation_To_User,
     });
     Conversation.belongsToMany(models.Catalog, {
      through: models.Conversation_To_Catalog,
   });
   Conversation.hasMany(models.Conversation_To_User, {
    foreignKey: 'conversationId',
    targetKey: 'id',
  });
    }
  };
  Conversation.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    }
  }, {
    sequelize,
    timestamps: true,
    modelName: 'Conversation',
    tableName: 'conversations',
  });
  return Conversation;
};