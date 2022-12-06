const db = require("../models")
const fs = require("fs")
const { Op } = require("sequelize")
const Properties = db.Property
const Room = db.PropertyItem
const Images = db.Images

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
          model: db.PropertyItem,
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
  createRoom: async (req, res) => {
    try {
      // const foundPropertyById = await db.Property.findByPk(id)

      // if (!foundPropertyById) {
      //   throw new Error("Property id not found")
      // }
      const createNewRoom = await Room.create({
        item_name: req.body.item_name,
        description: req.body.description,
        capacity: req.body.capacity,
        price: req.body.price,
        // PropertyId: foundPropertyById.id,
        PropertyId: "1",
      })

      //================================Post Image
      const files = req.files
      let img_path = []

      img_path = files.map((item) => item.filename)

      const roomId = createNewRoom.id
      const newRoomImg = img_path.map((item) => {
        return {
          picture_url: item,
          PropertyItemId: roomId,
        }
      })

      await db.Images.bulkCreate(newRoomImg)
      // if (req.file == undefined) {
      //   return res.send(`You must select a file.`)
      // }

      // Images.create({
      //   type: req.file.mimetype,
      //   name: req.file.originalname,
      //   data: fs.readFileSync(__basedir + "/public" + req.file.filename),
      // }).then((image) => {
      //   fs.writeFileSync(__basedir + "/public" + image.name, image.data)

      //   return res.send(`File has been uploaded.`)
      // })

      //================================

      const foundRoomById = await Room.findByPk(createNewRoom.id, {
        include: [db.Property, db.Images],
      })

      return res.status(201).json({
        message: "Post new room",
        data: foundRoomById,
      })
    } catch (err) {
      console.log(err)
      return res.status(500).json({
        message: err.message,
      })
    }
  },
}
