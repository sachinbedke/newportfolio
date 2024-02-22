const { contactEmail, getAllEmails, addProject, getAllProjects, deleteProject, updateProject } = require("../controller/adminController")


const router = require("express").Router()

router
    .post("/send-email", contactEmail)
    .get("/get-email", getAllEmails)
    .post("/add-project", addProject)
    .get("/get-project", getAllProjects)
    .delete("/delete-project/:id", deleteProject)
    .put("/update-project/:id", updateProject)

module.exports = router