const { contactEmail, test } = require("../controller/adminController")


const router = require("express").Router()

router.post("/send-email", contactEmail)

module.exports = router