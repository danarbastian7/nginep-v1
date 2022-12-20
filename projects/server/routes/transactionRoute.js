const express = require("express")
const transactionController = require("../controllers/transactionController")

const router = express.Router()

router.get("/:id", transactionController.getTransaction)

module.exports = router
