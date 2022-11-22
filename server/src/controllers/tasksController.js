const db = require('../models');
const { QueryTypes, Op, literal } = require("sequelize");
const { sequelize } = require('../models');
const CONSTANTS = require('../constants');

module.exports.countRoles = async (req, res, next) => {
  try {
    const roles = await db.User.count({
      attributes: [
        "role"
      ],
      group: "role",
    });
    let result = [];
    roles.forEach(role => {
    const key = role.role;
    const value = role.count;
    let item = {[key]: value}
    result.push(item)
    })
    
    res.send(result);
  } catch (error) {
    next(error)
  }
}


module.exports.cashback = async (req, res, next) => {
  try {
    await sequelize.query(
      `UPDATE "Users"
      SET balance = balance + prize 
      FROM (
        SELECT "userId", sum(prize)*0.1 as prize
      FROM(
        SELECT "userId", prize
        FROM "Contests"
        WHERE "createdAt" between '2022-12-25' and '2022-01-14'
      ) as contests
      GROUP BY "userId"
      ) as prizes
      WHERE "Users".id = prizes."userId"`,
      {type: QueryTypes.SELECT}
    )
    res.send();
  } catch (error) {
    next(error)
  }
}

module.exports.addToBalance = async (req, res, next) => {
  try {
    await db.User.update(
      {balance: literal('balance + 10')},
     {
     where: {
      rating: {[Op.gt]: 0},
      role: CONSTANTS.CREATOR
     },
     limit: 3,
     order: [['rating', 'DESC']]
    });
    
    res.end();
  } catch (error) {
    next(error)
  }
}