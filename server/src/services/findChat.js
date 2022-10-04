const db = require('../models');
const { Op } = require("sequelize");

const findUsersConversation = async (userId, recipientId) => {
  return await db.Conversation.findOrCreate({
      include: [{
        model: db.User,
        where: {
          [Op.and]: [
            { id: userId },
            { id: recipientId }
           ],
        }
      }]
    });
}

module.exports.findUsersConversation = findUsersConversation;

const findAllConversations = async (userId) => {
  return await db.Conversation.findAll({
      include: [{
        model: db.User,
        where: {           
            id: userId 
        }
      }]
    });
}

module.exports.findAllConversations = findAllConversations;

const findInterlocutors = async (userId) => {
const conversations = await findAllConversations(userId);
 const interlocutors = conversations.map(async conversation => {
  return await db.User.findAll({
    where: {
      id: {[Op.ne]: userId}
    },
  include: [
    {
      model: db.Conversation,
      where: {           
          id: conversation.id 
      }
    }
  ]
  }) 
}
);
return interlocutors;
}
module.exports.findInterlocutors = findInterlocutors;