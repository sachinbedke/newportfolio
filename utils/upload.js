const multer = require("multer")
const path = require("path")
const { v4 } = require("uuid")

const storage = multer.diskStorage({
    filename: (req, file, cb) => {
        cb(null, v4() + path.extname(file.originalname))
    },
    destination: (req, file, cb) => {
        cb(null, "uploads")
    },
})

module.exports = multer({ storage }).single("hero")