const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Message extends Model {

    static associate(models) {
      Message.belongsTo(models.User, {
        foreignKey: 'sender',
        sourceKey: 'id',
      });
      Message.belongsTo(models.Conversation, {
        foreignKey: 'conversation',
        sourceKey: 'id',
      });
    }
  };
  Message.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    sender: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id',
      },
    },
    body: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    conversation: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'conversations',
        key: 'id',
      },
    },
  }, 
  {
    sequelize,
    timestamps: true,
    modelName: 'Message',
    tableName: 'messages',
  });
  return Message;
};