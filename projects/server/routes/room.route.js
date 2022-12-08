const express = require("express")
const roomController = require("../controllers/roomController")
const { upload } = require("../lib/uploader")

const router = express.Router()

router.get("/:id", roomController.getRoom)
router.post(
  "/createroom",
  upload({
    acceptedFileTypes: ["png", "jpeg", "jpg"],
    filePrefix: "picture_url",
  }).array("picture_url", 6),
  roomController.createRoom
)
router.delete("/delete/:id", roomController.deleteRoom)
router.patch("/editroom/:id", roomController.editRoomInfo)

module.exports = router
