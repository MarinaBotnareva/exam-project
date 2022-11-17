SELECT role, count(role)
FROM "Users"
GROUP BY role


UPDATE "Users"
SET balance = prize 
FROM (
  SELECT "userId", sum(prize)*0.1 as prize
FROM(
  SELECT "userId", prize
  FROM "Contests"
  WHERE "createdAt" between '2022-09-01' and '2022-11-01'
) as contests
GROUP BY "userId"
) as prizes
WHERE "Users".id = prizes."userId"


UPDATE "Users"
SET balance = balance + 10
WHERE id in (
SELECT id
FROM "Users"
WHERE rating > 0
AND role = 'creator'
ORDER BY rating DESC LIMIT 3)
