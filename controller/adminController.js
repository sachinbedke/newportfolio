const Email = require("../models/Email");
const sendEmail = require("../utils/email");


exports.contactEmail = async (req, res) => {


    console.log(req.body);
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
                Mobile No:74981870
                \n \n I'll get back to you soon!    \n Best Regards SHUBHAM TUPE😎 `
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
