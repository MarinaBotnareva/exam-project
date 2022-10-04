const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Conversation_To_Catalog extends Model {
 
  };
  Conversation_To_Catalog.init({
    catalogId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      field: 'catalog_id',
      primaryKey: true,
    },
    chat: {
      allowNull: false,
      type: DataTypes.INTEGER,
      field: 'conversation_id',
      primaryKey: true,
    },
  }, {
    sequelize,
    timestamps: false,
    modelName: 'Conversation_To_Catalog',
    tableName: 'conversations_to_catalogs',
  });
  return Conversation_To_Catalog;
};