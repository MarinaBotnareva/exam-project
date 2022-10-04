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
  "partiсipant" INTEGER NOT NULL REFERENCES "Users"(id),
  "conversationId" INTEGER NOT NULL REFERENCES conversations(id),
  "blackList" BOOLEAN DEFAULT false,
  "favoriteList" BOOLEAN DEFAULT false, 
  UNIQUE(partiсipant, "conversationId")
);

DROP TABLE conversations_to_catalogs
CREATE TABLE conversations_to_catalogs (
  "catalogId" INTEGER NOT NULL REFERENCES catalogs(id),
  "chat" INTEGER NOT NULL REFERENCES conversations(id),
  UNIQUE("catalogId", chat)
);

