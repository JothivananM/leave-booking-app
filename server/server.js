const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const { ObjectId } = require('mongodb');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

mongoose.connect("mongodb+srv://admin-joe:Jothi%40123@cluster0.htv13wx.mongodb.net/sample?retryWrites=true&w=majority", { useNewUrlParser: true }, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("Connection Successful");
    }
});

const leaveSchema = mongoose.Schema({
    name: String,
    username: String,
    email: String,
    phone: String
});

const LeaveModel = mongoose.model("leave", leaveSchema);

// Get all data
app.get("/", (req, res) => {
    LeaveModel.find((err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    }).sort({ _id: -1 })
});

// Create new data
app.post("/", async (req, res) => {
    if (!req) {
        console.log("err");
    }
    else {
        const newData = new LeaveModel({
            name: req.body.name,
            username: req.body.username,
            email: req.body.email,
            phone: req.body.phone
        });
        try {
            newData.save().then(() => console.log(newData));
            res.status(200).send(newData);
        } catch (error) {
            console.log(error);
        }
    }
})

// Update existing data
app.patch("/:id", async (req, res) => {
    const id = req.params.id;
    const body = req.body;

    try {
        LeaveModel.findByIdAndUpdate(id, req.body, { new: true }, (error, result) => {
            if (error) {
                return res.status(500).send({ error: error });
            }
            console.log(result);
            return res.send({ result });
        });
    }
    catch (error) {
        console.log(error);
    }
});

// Delete existing data
app.delete("/:id", async (req, res) => {
    const id = req.params.id;
    try {
        LeaveModel.findByIdAndDelete(id, (error, result) => {
            if (error) {
                return res.status(500).send({ 'Error': error });
            }
            else {
                return res.status(200).send({ "Deleted": result });
            }
        })
    } catch (error) {
        console.log(error);
    }
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});


// const newRequest = new LeaveModel ({
//     from : new Date('2023-02-01'),
//     to : new Date('2023-02-03'),
//     reason : "Sick Leave",
//     attachement : null
// });

// newRequest.save((err, result) => {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log(result);
//     }
// });