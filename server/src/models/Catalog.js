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
     Catalog.hasMany(models.Conversation_To_Catalog, {
          foreignKey: 'CatalogId',
          targetKey: 'id',
        });
    }
  };
  Catalog.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
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