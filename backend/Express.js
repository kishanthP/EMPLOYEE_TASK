let express = require("express");
let mongoose = require("mongoose");
let bodyParser = require("body-parser");
let axios = require("axios");
let cors = require("cors");
let registeredUsers = require("./models/registeredUsers");
let modelEmployeeRegister = require("./models/modelEmployeeRegister");

let app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// mongo connection
mongoose.connect("mongodb://localhost:27017/EMPLOYEE_LIST");
mongoose.connection
    .once("open", () => { console.log("Connected to DB....."); })
    .on("error", () => { console.log("problem to connect to DB ..!!!!!"); });

// registration form data handle
app.post("/register", (req, res) => {
    registeredUsers.findOne({ email: req.body.email })
        .then((user) => {
            if (user !== null) {
                res.json("email already registered..");
            }
            else {
                let dataForDB = new registeredUsers(req.body);
                dataForDB.save()
                    .then((data) => { res.json("input stored in DB successfully..."); })
                    .catch((error) => (res.json("data can not be saved , problem at saving time....")));
            }
        })
        .catch(() => {
            res.json("registration problem...");
        });
});

// handling Login Action
app.post("/login", (req, res) => {
    registeredUsers.findOne({ email: req.body.email })
        .then((user) => {
            if (user.cnfPassword == req.body.password) {
                res.json({ "status": "success", "id": user._id });
            }
            else {
                res.json({ "status": "fail" });
            }
        })
        .catch(() => { res.json({ "status": "noUser" }); });
});

// respond data to the Dashboard component
app.get("/user/:ID", (req, res) => {
    let ID = req.params.ID;
    registeredUsers.findOne({ _id: ID })
        .then((e) => { res.json(e.name); })
        .catch(() => { console.log("problem at param get users Express.."); });
});

// storing create employee form data (no image handling)
app.post("/employees", (req, res) => {
    console.log(req.body); // Check the request body

    modelEmployeeRegister.findOne({ email: req.body.email })
        .then((user) => {
            if (user !== null) {
                res.json("email already registered..");
            }
            else {
                let dataForDB = new modelEmployeeRegister({
                    name: req.body.name,
                    email: req.body.email,
                    phone: req.body.phone,
                    designation: req.body.designation,
                    gender: req.body.gender,
                    course: req.body.course
                });

                dataForDB.save()
                    .then(() => { res.json("Employee data successfully stored in DB."); })
                    .catch((error) => { res.json("Error saving employee data."); });
            }
        })
        .catch(() => {
            res.json("Employee registration problem.");
        });
});

// responding employee-list
app.get("/employee-list", (req, res) => {
    modelEmployeeRegister.find()
        .then((e) => {
            res.send(e);
        });
});

// edit-employee send data
app.get("/employee-list/:ID", (req, res) => {
    let ID = req.params.ID;
    modelEmployeeRegister.findOne({ _id: ID })
        .then((e) => {
            res.send(e);
        })
        .catch(() => {
            res.send("Employee not found");
        });
});

// edit-employee update values
app.put("/employee-list/:ID", (req, res) => {
    let ID = req.params.ID;
    modelEmployeeRegister.updateOne({ _id: ID }, req.body)
        .then(() => { res.send("Successfully updated data"); })
        .catch(() => { res.send("Error updating data"); });
});

// delete employee
app.delete("/employee-list/:ID", (req, res) => {
    let ID = req.params.ID;
    modelEmployeeRegister.deleteOne({ _id: ID })
        .then(() => { res.send("User deleted successfully."); })
        .catch(() => { res.send("Error during deletion."); });
});

app.listen(4001, () => {
    console.log("Server listening on port 4001...");
});
