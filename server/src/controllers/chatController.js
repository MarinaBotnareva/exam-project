const db = require('../models');
const { Op } = require("sequelize");
const userServices = require('../services/userServices');
const controller = require('../socketInit');
const _ = require('lodash');
const { sequelize } = require('../models');
const { QueryTypes } = require('sequelize');
const { chatForBlackFavoriteList, conversationForMessage, findCatalog } = require('../services/chatServices');

module.exports.addMessage = async (req, res, next) => {
  const participants = [req.tokenData.userId, req.body.recipient];
  participants.sort(
    (participant1, participant2) => participant1 - participant2);
    
  try {          
      let conversationId = await conversationForMessage(req.tokenData.userId, req.body.recipient);

      const newConversation = await db.Conversation_To_User.findAll({
        where: {
          UserId: {[Op.or]: [req.tokenData.userId, req.body.recipient]} ,
          ConversationId: conversationId[0].ConversationId  
        }
      });
           
    const message = await db.Message.create({
      sender: req.tokenData.userId,
      body: req.body.messageBody,
      conversation: newConversation[0].dataValues.ConversationId,
    },
    {include: [db.User, db.Conversation]});
   
    const interlocutorId = participants.filter(
      (participant) => participant !== req.tokenData.userId)[ 0 ];
    const preview = {
      id: newConversation[0].dataValues.ConversationId,
      sender: req.tokenData.userId,
      text: req.body.messageBody,
      createAt: message.createdAt,
      participants,
      blackList: newConversation[0].dataValues.blackList,
      blackList2: newConversation[1].dataValues.blackList,
      favoriteList: newConversation[0].dataValues.favoriteList,
    };
    controller.getChatController().emitNewMessage(interlocutorId, {
      message,
      preview: {
        id: newConversation[0].dataValues.ConversationId,
        sender: req.tokenData.userId,
        text: req.body.messageBody,
        createAt: message.createdAt,
        participants,
        blackList: newConversation[0].dataValues.blackList,
        blackList2: newConversation[1].dataValues.blackList,
        favoriteList: newConversation[0].dataValues.favoriteList,
        interlocutor: {
          id: req.tokenData.userId,
          firstName: req.tokenData.firstName,
          lastName: req.tokenData.lastName,
          displayName: req.tokenData.displayName,
          avatar: req.tokenData.avatar,
          email: req.tokenData.email,
        },
      },
    });
    res.send({
      message,
      preview: Object.assign(preview, { interlocutor: req.body.interlocutor }),
    });          
  } catch (err) {
    next(err);
  }
};

module.exports.getChat = async (req, res, next) => {
  
  try {
    
    const messages = await sequelize.query(
      `SELECT *
      FROM messages 
      WHERE conversation =(
        SELECT "ConversationId" 
        FROM (SELECT "ConversationId", count("ConversationId") 
        FROM (
          SELECT "UserId", "ConversationId" 
          FROM conversations_to_users 
          WHERE "UserId" = ${req.tokenData.userId} OR "UserId" = ${req.body.interlocutorId}
          ) as conversations 
          GROUP BY "ConversationId") as conv
          WHERE count = 2)`,
            {type: QueryTypes.SELECT}
            );
    
    const interlocutor = await userServices.findUser(
      { id: req.body.interlocutorId });
    res.send({
      messages,
      interlocutor: {
        firstName: interlocutor.firstName,
        lastName: interlocutor.lastName,
        displayName: interlocutor.displayName,
        id: interlocutor.id,
        avatar: interlocutor.avatar,
      },
    });
    
  } catch (err) {
    next(err);
  }
};

module.exports.getPreview = async (req, res, next) => {
  
  try {
    const conversations =  await sequelize.query(
      `SELECT
      *
    FROM (SELECT
      userinfo.*,
      conversations_to_users."UserId" AS participants,
      conversations_to_users."blackList" AS "blackList2"
    FROM (SELECT 
      messages.conversation AS id,
      messages.sender AS sender,
      messages.body AS text,
      messages."createdAt" AS "createAt",
      conversations_to_users."blackList" AS "blackList",
      conversations_to_users."favoriteList" AS "favoriteList"
     FROM messages
    JOIN
    (SELECT max(id) maxid from messages group by conversation) latest
    on messages.id=latest.maxid 
    JOIN conversations_to_users ON messages.conversation = conversations_to_users."ConversationId"
    WHERE conversations_to_users."UserId" = ${req.tokenData.userId}) as userinfo
    JOIN conversations_to_users ON userinfo.id = conversations_to_users."ConversationId"
    WHERE conversations_to_users."UserId" != ${req.tokenData.userId}) as tab
    ORDER BY "createAt" DESC`,
      {type: QueryTypes.SELECT}
    );

    let ids = []
    for (let i = 0; i < conversations.length; i++){
      ids.push(conversations[i].id);
    }

    const senders = await db.User.findAll({
      where: {
       id: {[Op.ne]:  req.tokenData.userId}
      },
       include: [{
        model: db.Conversation_To_User,
        where: {
          ConversationId: {[Op.or]:  ids}
          },
      }],
      attributes: ['id', 'firstName', 'lastName', 'displayName', 'avatar']
    });

    conversations.forEach((conversation) => {
      senders.forEach(sender => {
        if (conversation.participants === sender.dataValues.id) {
          conversation.interlocutor = {
            id: sender.dataValues.id,
            firstName: sender.dataValues.firstName,
            lastName: sender.dataValues.lastName,
            displayName: sender.dataValues.displayName,
            avatar: sender.dataValues.avatar,
          };
        }
      });
    });
    res.send(conversations);
  } catch (err) {
    next(err);
  }
};

module.exports.blackList = async (req, res, next) => {
  try {
     await sequelize.query(
      `UPDATE conversations_to_users
      SET "blackList" = ${req.body.blackListFlag}
      WHERE "ConversationId" =(
        SELECT "ConversationId" 
        FROM (
          SELECT "UserId", "ConversationId" 
          FROM conversations_to_users 
          WHERE "UserId" = ${req.tokenData.userId} OR "UserId" = ${req.body.participants}
          ) as conversations 
          GROUP BY "ConversationId" 
          ORDER BY count("ConversationId") DESC LIMIT 1)
          AND "UserId" = ${req.tokenData.userId}`,
      {type: QueryTypes.SELECT}
      );

    const chat = await chatForBlackFavoriteList(req.tokenData.userId, req.body.participants);
    
    res.send(chat);
    const interlocutorId = req.body.participants;
    controller.getChatController().emitChangeBlockStatus(interlocutorId, chat);
  } catch (err) {
    res.send(err);
  }
};

module.exports.favoriteChat = async (req, res, next) => {
  
  try {

    await sequelize.query(
      `UPDATE conversations_to_users
      SET "favoriteList" = ${req.body.favoriteFlag}
      WHERE "ConversationId" =(
        SELECT "ConversationId" 
        FROM (
          SELECT "UserId", "ConversationId" 
          FROM conversations_to_users 
          WHERE "UserId" = ${req.tokenData.userId} OR "UserId" = ${req.body.participants}
          ) as conversations 
          GROUP BY "ConversationId" 
          ORDER BY count("ConversationId") DESC LIMIT 1)
          AND "UserId" = ${req.tokenData.userId}`,
      {type: QueryTypes.SELECT}
      );

      const chat = await chatForBlackFavoriteList(req.tokenData.userId, req.body.participants);

    res.send(chat);
  } catch (err) {
    res.send(err);
  }
};

module.exports.createCatalog = async (req, res, next) => {
  try {
    const newCatalog = await db.Catalog.create({
      userId: req.tokenData.userId,
      catalogName: req.body.catalogName,
    });
     await db.Conversation_To_Catalog.create({
        CatalogId: newCatalog.dataValues.id,
        ConversationId: req.body.chatId,
      });
      const findCatalog = await db.Catalog.findOne({
        where: {userId: req.tokenData.userId,
                catalogName: req.body.catalogName,
        }
      });
      const findChat = await db.Conversation_To_Catalog.findOne(
        {
          CatalogId: findCatalog.dataValues.id,
          ConversationId: req.body.chatId,
        }
      );
           
      let catalog = {
        id: findCatalog.dataValues.id, 
        userId: findCatalog.dataValues.userId, 
        catalogName: findCatalog.dataValues.catalogName, 
        chats:[findChat.dataValues.ConversationId]
      };
      
    res.send(catalog);
  } catch (err) {
    next(err);
  }
};

module.exports.updateNameCatalog = async (req, res, next) => {
  try {
    await db.Catalog.update(
      { catalogName: req.body.catalogName },
      {where: {
        id: req.body.catalogId,
        userId: req.tokenData.userId ,
      }
       });

    let catalog = await findCatalog(req.body.catalogId)

    res.send(catalog);
  } catch (err) {
    next(err);
  }
};

module.exports.addNewChatToCatalog = async (req, res, next) => {
  try {
    await db.Conversation_To_Catalog.create({
      CatalogId: req.body.catalogId,
      ConversationId: req.body.chatId,
    });
      
    res.end();
  } catch (err) {
    next(err);
  }
};

module.exports.removeChatFromCatalog = async (req, res, next) => {
  try {
    await db.Conversation_To_Catalog.destroy(
      {
        where: {
          [Op.and]: [
            { CatalogId: req.body.catalogId },
            { ConversationId: req.body.chatId }
           ],
        }
      }
    )
  
    let catalog = await findCatalog(req.body.catalogId)

    res.send(catalog);
  } catch (err) {
    next(err);
  }
};

module.exports.deleteCatalog = async (req, res, next) => {
  try {
    await db.Conversation_To_Catalog.destroy(
      {
        where: { CatalogId: req.body.catalogId }
        }
    );
    await db.Catalog.destroy({
      where: {
          id: req.body.catalogId,
          userId: req.tokenData.userId,
      }
    });
    res.end();
  } catch (err) {
    next(err);
  }
};

module.exports.getCatalogs = async (req, res, next) => {
  try {
    const allCatalogs = await db.Catalog.findAll({
      where: {userId: req.tokenData.userId}
    });
    const allChats = await db.Conversation_To_Catalog.findAll();
    let catalogs = [];
    allCatalogs.forEach((catalog)=>{
      catalogs.push({id: catalog.dataValues.id, userId: catalog.dataValues.userId, catalogName: catalog.dataValues.catalogName, chats:[]})
    })
    catalogs.forEach((catalog) => {
      allChats.forEach(chat => {
        if(chat.dataValues.CatalogId === catalog.id){
          catalog.chats.push(chat.dataValues.ConversationId)
        }
      })

    })

    
    res.send(catalogs);
  } catch (err) {
    next(err);
  }
};

