const express = require("express")
const roomController = require("../controllers/roomController")

const router = express.Router()

// router.get("/", roomController.getRoom)
router.get("/:id", roomController.getRoom)

module.exports = router
