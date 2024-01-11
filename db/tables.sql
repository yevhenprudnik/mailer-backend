CREATE TABLE "user" (
  "id" SERIAL PRIMARY KEY,
  "username" VARCHAR(255) UNIQUE,
  "email" VARCHAR(255) UNIQUE,
  "password" VARCHAR(255)
);
CREATE TABLE "topic" (
  "id" SERIAL PRIMARY KEY,
  "authorId" INT REFERENCES "user"("id"),
  "name" VARCHAR(255),
  "description" VARCHAR(255)
);
CREATE TABLE "subscription" (
  "id" SERIAL PRIMARY KEY,
  "userId" INT REFERENCES "user"("id"),
  "topicId" INT REFERENCES "topic"("id")
);
CREATE TABLE "mail" (
  "id" SERIAL PRIMARY KEY,
  "topicId" INT REFERENCES "topic"("id"),
  "content" VARCHAR(255),
  "published" BOOLEAN DEFAULT false
);