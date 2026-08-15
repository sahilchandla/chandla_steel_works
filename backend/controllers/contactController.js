import Contact from "../models/contactModel.js";


let contactUser = async (req, res) => {
    try {
        let data = await Contact.create(req.body);
        // console.log(data)
        if (data) {
            res.status(200).json({ message: "Message sent successfully", success: true, data })
        }
        else {
            res.status(400).json({ message: "Failed to send message" });
        }
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ message: "server error" });
    }
}

let getContact = async (req, res) => {
    try {
        let data = await Contact.find();
        if (data.length > 0) {
            res.status(200).json(data);
        }   
        else {
            res.status(404).json({ message: "Message not found" });
        }
    }
    catch (err) {
        res.status(500).json({ message: "server error" });
    }   

}
export { contactUser, getContact };