const db = require("../models")
const Properties = db.Properties
const User = db.User

module.exports = {
  getTenant: async (req, res) => {
    try {
      const findTenant = await User.findByPk(req.params.id, {
        include: {
          model: db.Properties,
          include: [
            { model: db.Categories },
            { model: db.PropertyImages },
            { model: db.Cities },
          ],
          // include: {
          //   model: db.PropertyImages,
          // },
        },
      })
      res.status(200).json({
        message: "Find Room By Id",
        data: findTenant,
      })
    } catch (err) {
      console.log(err)
      return res.status(500).json({
        message: err.message,
      })
    }
  },
}
