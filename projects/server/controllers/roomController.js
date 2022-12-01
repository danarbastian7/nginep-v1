const db = require("../models")
const Properties = db.Properties

module.exports = {
  getRoom: async (req, res) => {
    try {
      // const findRoomById = await Properties.findAll({
      //   include: {
      //     model: db.PropertyItems,
      //     include: {
      //       model: db.Images,
      //     },
      //     // include: [
      //     //   {
      //     //     model: Images,
      //     //
      //     //
      //     //   },
      //     // ],
      //   },
      const findRoomById = await Properties.findByPk(req.params.id, {
        include: {
          model: db.PropertyItems,
          include: {
            model: db.Images,
          },
        },
      })
      res.status(200).json({
        message: "Find Room By Id",
        data: findRoomById,
      })
    } catch (err) {
      console.log(err)
      return res.status(500).json({
        message: err.message,
      })
    }
  },
}
