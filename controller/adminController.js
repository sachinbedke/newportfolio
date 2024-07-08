const Email = require("../models/Email");
const Projects = require("../models/Projects");
const sendEmail = require("../utils/email");
const upload = require("../utils/upload");
const fs = require("fs/promises")
const path = require("path")


exports.contactEmail = async (req, res) => {
    try {
        const { subject, name, email, message } = req.body
        const x = await sendEmail({
            subject: `${subject}`,
            message: `User Name Is ${name}, and \n  \n User Email Is  ${email} \n 
            Message: ${message}`
        })

        const y = await sendEmail({
            to: email,
            subject: "Thanks for contacting",
            message: `Hello ${req.body.subject} \n \n  Thank Your for reaching out! Your message has been received. \n \n
                Mobile No:9529981039
                \n \n I'll get back to you soon!    \n Best Regards Sachin Bedke `
        })
        if (x && y) {
            await Email.create(req.body)
            res.status(200).json({ message: "email send success   thank you" })
        }

        else {
            res.status(400).json({ message: "unable to send email" })
        }
    }


    catch (error) {
        res.status(500).json({ message: error.message || "something went wrong" })
    }
}

exports.getAllEmails = async (req, res) => {
    const result = await Email.find()
    if (!result) {
        return res.status(400).json("Not Email Found")
    }
    res.status(200).json({ message: "Email Fetch Success", result })
}
exports.addProject = async (req, res) => {
    upload(req, res, async err => {
        if (err) {
            return res.json({ message: err.message || "unble to upload" })
        }
        const rese = await Projects.create({ ...req.body, hero: req.file.filename })
        res.status(200).json({ message: "Project Add Success", rese })
    })

}
exports.getAllProjects = async (req, res) => {

    const result = await Projects.find()
    res.status(200).json({ message: " Project get Success", result })
}

exports.deleteProject = async (req, res) => {
    const { id } = req.params
    const result = await Projects.findById(id)

    await fs.unlink(path.join(__dirname, "..", "uploads", result.hero))
    await Projects.findByIdAndDelete(id)
    res.status(200).json({ message: "Project Delete Success" })
}
exports.updateProject = async (req, res) => {
    upload(req, res, async err => {
        if (err) {
            console.log(err)
            return res.status(400).json({ message: err.message || "Unable to upload" })
        }
        const { id } = req.params
        const { title, desc, gitlink, renderlink, hero } = req.body
        const result = await Projects.findById(id)

        if (req.file) {
            await fs.unlink(path.join(__dirname, "..", "uploads", result.hero))


            await Projects.findByIdAndUpdate(id, { ...req.body, hero: req.file.filename })
        } else {
            await Projects.findByIdAndUpdate(id, req.body)
        }
        // await Projects.findByIdAndUpdate(id, { title, desc, gitlink, renderlink, hero })
        res.status(200).json({ message: " Project Update Success" })
    })

}