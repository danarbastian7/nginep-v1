const { Op } = require("sequelize")
const db = require("../models")

const Property = db.Property
const Calendar = db.Calendar

const calendarController = {
  getAvailCalendar: async (req, res) => {
    try {
      const property = await Property.findByPk(req.params.id, {
        include: {
          model: db.PropertyItem,

          //   include: {
          //     model: db.Calendar,
          //   },
        },
      })
      if (property.PropertyItems.length === 0) {
        throw new error()
      }
      const arrPropertyItem = property.PropertyItems.map((val) => val.id)
      const calendar = await Calendar.findAll({
        where: {
          PropertyItemId: arrPropertyItem,
        },
        include: {
          model: db.PropertyItem,
        },
      })
      // console.log(arrPropertyItem)
      // console.log(calendar)
      return res.status(200).json({
        message: "find available room",
        data: calendar,
      })
    } catch (err) {
      console.log(err)
      return res.status(500).json({
        message: err.message,
      })
    }
  },
  // getAvailCalendar: async (req, res) => {
  //   try {
  //     const { PropertyItemId } = req.body
  //     const findAvailRoom = await Calendar.findAll({
  //       where: {
  //         id: {
  //           [Op.in]: PropertyItemId,
  //         },
  //       },
  //     })
  //     return res.status(200).json({
  //       message: "find available room",
  //       data: findAvailRoom,
  //     })
  //   } catch (err) {
  //     console.log(err)
  //     return res.status(500).json({
  //       message: err.message,
  //     })
  //   }
  // },
}

module.exports = calendarController
