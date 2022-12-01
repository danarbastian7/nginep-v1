// https://nginep-f1ba2-default-rtdb.firebaseio.com/

require("dotenv/config")
const express = require("express")
const cors = require("cors")
const { join } = require("path")
const db = require("../models")
const authRoute = require("../routes/auth.route")
const propertiesRoute = require("../routes/properties.route")
const roomRoute = require("../routes/room.route")
const tenantRoute = require("../routes/tenant.route")
const fs = require("fs")

const PORT = process.env.PORT || 8000
const app = express()
app.use(
  cors({
    // origin: [
    //   process.env.WHITELISTED_DOMAIN &&
    //     process.env.WHITELISTED_DOMAIN.split(","),
    // ],
  })
)

app.use(express.json())

//#region API ROUTES

// ===========================
// NOTE : Add your routes here

app.get("/api", (req, res) => {
  res.send(`Hello, this is my API`)
})

app.get("/api/greetings", (req, res, next) => {
  res.status(200).json({
    message: "Hello, Student !",
  })
})

app.use("/auth", authRoute)
app.use("/public", express.static("public"))
app.use("/property", propertiesRoute)
app.use("/room", roomRoute)
app.use("/tenant", tenantRoute)

// const register = require("./routes/register")

// app.use("/signup", register)

// ===========================

// not found
app.use((req, res, next) => {
  if (req.path.includes("/api/")) {
    res.status(404).send("Not found !")
  } else {
    next()
  }
})

// error
app.use((err, req, res, next) => {
  if (req.path.includes("/api/")) {
    console.error("Error : ", err.stack)
    res.status(500).send("Error !")
  } else {
    next()
  }
})

//#endregion

//#region CLIENT
const clientPath = "../../client/build"
app.use(express.static(join(__dirname, clientPath)))

// Serve the HTML page
app.get("*", (req, res) => {
  res.sendFile(join(__dirname, clientPath, "index.html"))
})

//#endregion

app.listen(PORT, (err) => {
  if (err) {
    console.log(`ERROR: ${err}`)
  } else {
    db.sequelize.sync({ alter: true })

    if (!fs.existsSync("public")) {
      fs.mkdirSync("public")
    }
    console.log(`APP RUNNING at ${PORT} ✅`)
  }
})