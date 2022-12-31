const { Op } = require("sequelize")
const db = require("../models")

const Transaction = db.Transaction
const User = db.User

const transactionController = {
  getTransaction: async (req, res) => {
    try {
      const user = await User.findByPk(req.params.id, {
        include: {
          model: db.Property,
        },
      })
      console.log(user)
      if (user.Properties.length === 0) {
        throw new error()
      }
      const arrProperties = user.Properties.map((val) => val.id)

      const transaction = await Transaction.findAll({
        where: {
          PropertyId: arrProperties,
        },
        include: [
          { model: db.Property },
          { model: db.PropertyItem },
          { model: db.User },
        ],
      })

      return res.status(200).json({
        message: "find transaction ",
        data: transaction,
      })
    } catch (err) {
      console.log(err)
      return res.status(500).json({
        message: err.message,
      })
    }
  },
  getUserTransaction: async (req, res) => {
    try {
      const user = await User.findByPk(req.params.id, {
        include: {
          model: Transaction,
        },
      })
      if (user.Transactions.length === 0) {
        throw new error()
      }
      const arrTransaction = user.Transactions.map((val) => val.id)
      const userTransaction = await Transaction.findAll({
        where: {
          id: arrTransaction,
        },
        include: [
          {
            model: db.Property,
            include: [{ model: db.PropertyImage }, { model: db.Cities }],
          },
          { model: db.PropertyItem, include: [{ model: db.Images }] },
        ],
      })

      return res.status(200).json({
        message: "find user transaction",
        data: userTransaction,
      })
    } catch (err) {
      console.log(err)
      return res.status(500).json({
        message: err.message,
      })
    }
  },
}

module.exports = transactionController
