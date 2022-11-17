const db = require('../models');
const { sequelize } = require('../models');
const { QueryTypes } = require('sequelize');

module.exports.conversationForMessage = async (userId, recipientId ) => {
  let conversationId =  await sequelize.query(
          `   SELECT "ConversationId" 
              FROM (SELECT "ConversationId", count("ConversationId") 
              FROM (
                SELECT "UserId", "ConversationId" 
                FROM conversations_to_users 
                WHERE "UserId" = ${userId} OR "UserId" = ${recipientId}
                ) as conversations 
                GROUP BY "ConversationId") as conv
                WHERE count = 2
          `,
          {type: QueryTypes.SELECT}
          );
  

  if(!conversationId[0]){
    const newDialog = await db.Conversation.create();
    await db.Conversation_To_User.bulkCreate([{
                  UserId: userId,
                  ConversationId: newDialog.dataValues.id,
                },{
                  UserId: recipientId,
                  ConversationId: newDialog.dataValues.id,
                },
              ]) 

    let conversationId =  await sequelize.query(
      `   SELECT "ConversationId" 
          FROM (SELECT "ConversationId", count("ConversationId") 
          FROM (
            SELECT "UserId", "ConversationId" 
            FROM conversations_to_users 
            WHERE "UserId" = ${userId} OR "UserId" = ${recipientId}
            ) as conversations 
            GROUP BY "ConversationId") as conv
            WHERE count = 2
      `,
      {type: QueryTypes.SELECT}
      );

    return conversationId;
  };

      return conversationId;
};

module.exports.chatForBlackFavoriteList = async (userId, participantId ) => {

    let chat1 = await sequelize.query(
      `SELECT *
      FROM conversations_to_users
      WHERE "ConversationId" =(
        SELECT "ConversationId" 
        FROM (
          SELECT "UserId", "ConversationId" 
          FROM conversations_to_users 
          WHERE "UserId" = ${userId} OR "UserId" = ${participantId}
          ) as conversations 
          GROUP BY "ConversationId" 
          ORDER BY count("ConversationId") DESC LIMIT 1)
          AND "UserId" = ${userId}`,
      {type: QueryTypes.SELECT}
      );

    let chat2 = await sequelize.query(
      `SELECT *
      FROM conversations_to_users
      WHERE "ConversationId" =(
        SELECT "ConversationId" 
        FROM (
          SELECT "UserId", "ConversationId" 
          FROM conversations_to_users 
          WHERE "UserId" = ${userId} OR "UserId" = ${participantId}
          ) as conversations 
          GROUP BY "ConversationId" 
          ORDER BY count("ConversationId") DESC LIMIT 1)
          AND "UserId" = ${participantId}`,
      {type: QueryTypes.SELECT}
      );

      let chat = {
        participants: chat2[0].UserId,
        id: chat1[0].ConversationId,
        blackList: chat1[0].blackList,
        blackList2: chat2[0].blackList,
        favoriteList: chat1[0].favoriteList,
      }

      return chat
}

module.exports.findCatalog = async (catalogId ) => {
  const findCatalog = await db.Catalog.findOne({
    where: {id: catalogId,
    }
  });
  const findChats = await db.Conversation_To_Catalog.findAll(
    {
      where: {CatalogId: catalogId}
    }
  );
       
  let catalog = {
    id: findCatalog.dataValues.id, 
    userId: findCatalog.dataValues.userId, 
    catalogName: findCatalog.dataValues.catalogName, 
    chats:[]
  };

  findChats.forEach(chat => {
      catalog.chats.push(chat.dataValues.ConversationId)
  });

  return catalog;
}

