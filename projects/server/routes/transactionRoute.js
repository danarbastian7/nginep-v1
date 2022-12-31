const express = require("express")
const transactionController = require("../controllers/transactionController")

const router = express.Router()

router.get("/:id", transactionController.getTransaction)
router.get("/user/:id", transactionController.getUserTransaction)

module.exports = router
