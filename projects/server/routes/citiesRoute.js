const express = require("express")
const citiesController = require("../controllers/citiesController")

const router = express.Router()

router.get("/", citiesController.getCityOfProperty)

module.exports = router
