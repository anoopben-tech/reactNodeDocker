const express = require("express");
const app = express();
const router = express.Router();
const connectDb = require("./src/connection");
const User = require("./src/User.model")
const cors = require("cors")
const bodyParser = require("body-parser");
const PORT = 8080;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
router.get("/users", async(req, res) => {
    const users = await User.find()
    res.json(users);
})
router.post("/user-create", async(req, res) => {
    console.log('req ===>>> ', req.body);
    const {username} = req.body
    const user = new User({username});
    await user.save().then(() => console.log("Created user with username:"+ username ))
    res.send("Created user with username:"+ username )
})
app.use("/", router)
app.listen(PORT, function() {
    console.log(`Listening on ${PORT}`);
    connectDb().then(() => {
        console.log(' Connected to Mongoose DB ');
    })
})