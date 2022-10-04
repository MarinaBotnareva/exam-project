const db = require('../models');
const { Op } = require("sequelize");
const {findUsersConversation, findAllConversations, findInterlocutors} = require('../services/findChat')
const userQueries = require('./queries/userQueries');
const controller = require('../socketInit');
const _ = require('lodash');

module.exports.addMessage = async (req, res, next) => {
  const participants = [req.tokenData.userId, req.body.recipient];
  participants.sort(
    (participant1, participant2) => participant1 - participant2);
    const newConversation = await findUsersConversation(req.tokenData.userId, req.body.recipient); 

  try {
    const message = await db.Message.create({
      sender: req.tokenData.userId,
      body: req.body.messageBody,
      conversation: newConversation.id,
    },
    {include: db.User},
    {include: db.Conversation});
   
    const interlocutorId = participants.filter(
      (participant) => participant !== req.tokenData.userId)[ 0 ];
    const preview = {
      id: newConversation.id,
      sender: req.tokenData.userId,
      text: req.body.messageBody,
      createAt: message.createdAt,
      participants,
      blackList: newConversation.blackList,
      favoriteList: newConversation.favoriteList,
    };
    controller.getChatController().emitNewMessage(interlocutorId, {
      message,
      preview: {
        id: newConversation.id,
        sender: req.tokenData.userId,
        text: req.body.messageBody,
        createAt: message.createdAt,
        participants,
        blackList: newConversation.blackList,
        favoriteList: newConversation.favoriteList,
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
  const chat = await findUsersConversation(req.tokenData.userId, req.body.recipient);
  try {
    const messages = await db.Message.findAll({
      where: {
        conversation: chat.id 
      },
      include: db.Conversation,
      });
    
    const interlocutor = await userQueries.findUser(
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

  const dialogs = await findAllConversations(req.tokenData.userId);
  const senders = await findInterlocutors(req.tokenData.userId);
  try {
    const conversations = await db.Conversation_To_User.findAll({
      where: {
        [Op.and]: [
          {conversationId: dialogs.forEach(dialog => {return dialog.id}) },
          {participant: senders.forEach(sender => {return sender.id} )}
        ]
      }
    });

    conversations.forEach((conversation) => {
      senders.forEach(sender => {
        if (conversation.participant === sender.id) {
          conversation.interlocutor = {
            id: sender.id,
            firstName: sender.firstName,
            lastName: sender.lastName,
            displayName: sender.displayName,
            avatar: sender.avatar,
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
  const chat = await findUsersConversation(req.tokenData.userId, req.body.recipient);
  try {

    const setBlackList = await db.Conversation_To_User.update({
      blackList: req.body.blackListFlag 
    },
     {
      where: {
        [Op.and]: [
          { participant: req.tokenData.userId },
          { conversationId: chat.id }
         ],
      }
     } 
    ) 

    res.send(setBlackList);
    const interlocutorId = req.body.participants.filter(
      (participant) => participant !== req.tokenData.userId)[ 0 ];
    controller.getChatController().emitChangeBlockStatus(interlocutorId, setBlackList);
  } catch (err) {
    res.send(err);
  }
};

module.exports.favoriteChat = async (req, res, next) => {
  const chat = await findUsersConversation(req.tokenData.userId, req.body.recipient);
  try {

    const setFavoriteList = await db.Conversation_To_User.update({
      favoriteList: req.body.favoriteFlag 
    },
     {
      where: {
        [Op.and]: [
          { participant: req.tokenData.userId },
          { conversationId: chat.id }
         ],
      }
     } 
    ) 

    res.send(setFavoriteList);
  } catch (err) {
    res.send(err);
  }
};

module.exports.createCatalog = async (req, res, next) => {
  try {
    const catalog = await db.Catalog.create({
      userId: req.tokenData.userId,
      catalogName: req.body.catalogName,
      chats: [{
        id: req.body.chatId
      }],
    },
    {
      include: db.Conversation
    });
    
    res.send(catalog);
  } catch (err) {
    next(err);
  }
};

module.exports.updateNameCatalog = async (req, res, next) => {
  try {
    const catalog = await db.Catalog.update(
      { catalogName: req.body.catalogName },
      {where: {
        [Op.and]: [
          { id: req.body.catalogId },
          { userId: req.tokenData.userId }
         ],
      }
       });
    res.send(catalog);
  } catch (err) {
    next(err);
  }
};

module.exports.addNewChatToCatalog = async (req, res, next) => {
  try {
    const catalog = await db.Conversation_To_Catalog.create({
      catalogId: req.body.catalogId,
      chat: req.body.chatId,
    });
    res.send(catalog);
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
            { catalogId: req.body.catalogId },
            { chat: req.body.chatId }
           ],
        }
      }
    )

    res.end();
  } catch (err) {
    next(err);
  }
};

module.exports.deleteCatalog = async (req, res, next) => {
  try {
    await db.Catalog.destroy({
      where: {
        [Op.and]: [
          { id: req.body.catalogId },
          { userId: req.tokenData.userId }
         ],
      }
    });
    res.end();
  } catch (err) {
    next(err);
  }
};

module.exports.getCatalogs = async (req, res, next) => {
  try {
    const catalogs = await db.Catalog.findAll(
      { where: { userId: req.tokenData.userId } },
    );
    res.send(catalogs);
  } catch (err) {
    next(err);
  }
};
