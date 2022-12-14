const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    
    static associate(models) {
      Role.hasMany(models.User, {
        foreignKey: 'role',
        targetKey: 'name',
      });
    }
  };
  Role.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    }
  }, {
    sequelize,
    modelName: 'Role',
    timestamps: false,
    tableName: 'Roles',
  });
  return Role;
};
