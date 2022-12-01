const { Op } = require("sequelize")
const db = require("../models")
const Properties = db.Properties
const Room = db.PropertyItems

module.exports = {
  getAllProperties: async (req, res) => {
    try {
      const findAllProperties = await Properties.findAll({
        include: { all: true },
      })
      res.status(200).json({
        message: "Find all properties",
        data: findAllProperties,
      })
    } catch (err) {
      console.log(err)
      return res.status(500).json({
        message: "Server error",
      })
    }
  },
  getPropertyById: async (req, res) => {
    try {
      const findPropertyById = await Properties.findByPk(req.params.id, {
        include: {
          model: db.User,
          include: {
            model: db.Properties,
            include: [{ model: db.Categories }, { model: db.PropertyImages }],
          },
        },
      })

      res.status(200).json({
        message: "Find property by ID",
        data: findPropertyById,
      })
    } catch (err) {
      console.log(err)
      return res.status(500).json({
        message: err.message,
      })
    }
  },
  getRoom: async (req, res) => {
    try {
      const findRoomById = await Properties.findAll({
        include: {
          model: db.PropertyItem,
          include: {
            model: db.Images,
          },
          // include: [
          //   {
          //     model: Images,
          //
          //
          //   },
          // ],
        },
      })
      res.status(200).json({
        message: "Find Room By Id",
        data: findRoomById,
      })
    } catch (err) {
      console.log(err)
      return res.status(500).json({
        message: "Server error",
      })
    }
  },
}