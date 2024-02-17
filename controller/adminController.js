const Email = require("../models/Email");
const sendEmail = require("../utils/email");


exports.contactEmail = async (req, res) => {


    const { subject, name, email, message } = req.body
    console.log(req.body);
    try {
        const x = await sendEmail({
            subject: `${subject}`,
            message: `User Name Is ${name}, and \n  \n User Email Is  ${email} \n 
            Message: ${message}`
        })
        if (x) {
            await Email.create(req.body)
            res.status(200).json({ message: "email send success" })
        } else {
            res.status(400).json({ message: "unable to send email" })
        }
    }


    catch (error) {
        res.status(500).json({ message: error.message || "something went wrong" })
    }
}
