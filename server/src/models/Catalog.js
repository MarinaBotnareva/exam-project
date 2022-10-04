const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Catalog extends Model {
    
    static associate(models) {
      Catalog.belongsTo(models.User, {
        foreignKey: 'userId',
        sourceKey: 'id',
      });
      Catalog.belongsToMany(models.Conversation, {
        through: models.Conversation_To_Catalog,
     });
    }
  };
  Catalog.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id',
      },
    },
    catalogName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    sequelize,
    timestamps: false,
    modelName: 'Catalog',
    tableName: 'catalogs',
  });
  return Catalog;
};