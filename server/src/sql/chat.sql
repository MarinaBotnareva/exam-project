CREATE TABLE catalogs (
  id serial PRIMARY KEY,
  "userId" INTEGER NOT NULL REFERENCES "Users"(id),
  "catalogName" VARCHAR NOT NULL
);

CREATE TABLE conversations (
  id serial PRIMARY KEY,
  "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE messages (
  id serial PRIMARY KEY,
  sender INTEGER NOT NULL REFERENCES "Users"(id),
  "body" VARCHAR NOT NULL, 
  "conversation" INTEGER NOT NULL REFERENCES conversations(id),
  "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE conversations_to_users (
  "UserId" INTEGER NOT NULL REFERENCES "Users"(id),
  "ConversationId" INTEGER NOT NULL REFERENCES conversations(id),
  "blackList" BOOLEAN DEFAULT false,
  "favoriteList" BOOLEAN DEFAULT false, 
  UNIQUE("UserId", "ConversationId")
);

CREATE TABLE conversations_to_catalogs (
  "CatalogId" INTEGER NOT NULL REFERENCES catalogs(id),
  "ConversationId" INTEGER NOT NULL REFERENCES conversations(id),
  UNIQUE("CatalogId", "ConversationId")
);

DROP TABLE catalogs
DROP TABLE conversations_to_catalogs

DELETE FROM conversations_to_catalogs
DELETE FROM catalogs

SELECT "ConversationId" AS id, "blackList", "favoriteList"
FROM conversations_to_users
WHERE "ConversationId" = (
  SELECT "ConversationId" 
  FROM (SELECT "ConversationId", count("ConversationId") 
  FROM (
    SELECT "UserId", "ConversationId" 
    FROM conversations_to_users 
    WHERE "UserId" = 20 OR "UserId" = 1
    ) as conversations 
    GROUP BY "ConversationId") as conv
    WHERE count = 2
) AND "UserId" = 20

SELECT *
FROM messages 
WHERE conversation =(
  SELECT "ConversationId" 
  FROM (SELECT "ConversationId", count("ConversationId") 
  FROM (
    SELECT "UserId", "ConversationId" 
    FROM conversations_to_users 
    WHERE "UserId" = 20 OR "UserId" = 1
    ) as conversations 
    GROUP BY "ConversationId") as conv
    WHERE count = 2)

    
    UPDATE conversations_to_users
SET "blackList" = true
WHERE "ConversationId" =(
  SELECT "ConversationId" 
  FROM (
    SELECT "UserId", "ConversationId" 
    FROM conversations_to_users 
    WHERE "UserId" = 20 OR "UserId" = 1
    ) as conversations 
    GROUP BY "ConversationId" 
    ORDER BY count("ConversationId") DESC LIMIT 1)
    AND "UserId" = 20



SELECT
  *
FROM (SELECT
  userinfo.*,
  conversations_to_users."UserId" AS participants
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
ORDER BY "createAt" DESC