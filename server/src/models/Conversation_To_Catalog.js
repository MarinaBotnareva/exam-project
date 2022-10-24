const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Conversation_To_Catalog extends Model {
    static associate(models) {
      Conversation_To_Catalog.belongsTo(models.Catalog, {
        foreignKey: 'CatalogId',
        sourceKey: 'id',
      });
      Conversation_To_Catalog.belongsTo(models.Conversation, {
        foreignKey: 'ConversationId',
        sourceKey: 'id',
      });
    }
  };
  Conversation_To_Catalog.init({
    CatalogId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'catalogs',
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
  }, {
    sequelize,
    timestamps: false,
    modelName: 'Conversation_To_Catalog',
    tableName: 'conversations_to_catalogs',
  });
  return Conversation_To_Catalog;
};