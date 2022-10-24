const {  Model } = require('sequelize');
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
        foreignKey: 'ConversationId',
        targetKey: 'id',
      });
      Conversation.hasMany(models.Conversation_To_Catalog, {
        foreignKey: 'ConversationId',
        targetKey: 'id',
      });
    }
  };
  Conversation.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
  }, {
    sequelize,
    timestamps: true,
    modelName: 'Conversation',
    tableName: 'conversations',
  });
  return Conversation;
};