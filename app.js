const express = require('express')
const app = express()
const path = require('path')


app.set("view engine", "ejs")
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, "public")))

require('dotenv').config();

// DB connection 
const userModel = require("./models/user")
const userDetailModel = require("./models/userDetail")
const connectionModel = require("./models/connection")
const alumuniDB = require("./models/alumuni/AlumuniDB")
const alumuniDetail = require("./models/alumuni/alumuniDetail")


const cookieParser = require("cookie-parser")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const req = require('express/lib/request')

app.use(cookieParser())


// route decleration
app.get("/", (req, res) => {
    res.render("Home")
})

app.get("/feature", (req, res) => {
    res.render("feature")
})

app.get("/contact", (req, res) => {
    res.render("contactUs")
})

app.get("/login", (req, res) => {
    res.render("login")
})

app.post("/createUser", async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if the user already exists
        let user = await userModel.findOne({ email });
        if (user) {
            // Compare passwords
            const match = await bcrypt.compare(password, user.password);
            if (match) {
                let token = jwt.sign({ userId: user._id, email: email }, process.env.SECRET_KEY);
                res.cookie("token", token);
                return res.redirect("/alumuni");
            } else {
                return res.status(401).send("Invalid Email or Password");
            }
        }

        // Create a new user
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        let createdUser = await userModel.create({
            email: email,
            password: hash,
        });

        let token = jwt.sign({ userId: createdUser._id, email: email }, process.env.SECRET_KEY);
        res.cookie("token", token);
        res.redirect("/registrationDetails");
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});


app.get("/login/newUser", (req, res) => {
    res.render("newUser")
})

app.get("/registrationDetails", (req, res) => {
    res.render("registrationDetail")
})

app.post("/userDetail", async (req, res) => {
    try {
        const token = req.cookies.token;
        const { userId } = jwt.verify(token, process.env.SECRET_KEY);

        const { name, phone, dob, gender, educationLevel, interests } = req.body;

        let createdDetail = await userDetailModel.create({
            userId,
            name,
            phone,
            dob,
            gender,
            educationLevel,
            interests: Array.isArray(interests) ? interests : [interests],
        });

        res.redirect("/congrats");
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});

app.get("/congrats", (req, res) => {
    res.render("congrats")
})

app.get("/alumuni", isLoggedin, async (req, res) => {
    try {
        const tech = req.query.tech;
        let alumni;

        if (tech) {
            alumni = await alumuniDetail.find({ tech: tech })
        } else {
            alumni = await alumuniDetail.find()
        }
        res.render("Alumunis", { alumni, selectedTech: tech })
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }

})

app.get("/loginPage", (req, res) => {
    res.render("loginPage")
})

function isLoggedin(req, res, next) {
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.redirect("loginPage");
        }

        const data = jwt.verify(token, process.env.SECRET_KEY);
        req.user = data;
        next();
    } catch (error) {
        return res.status(401).send("Invalid or expired token. Please log in again.");
    }
}



app.get("/chatPage",  isLoggedin,async (req, res) => {
    try{
        const currentUserId = req.user.userId

        // fetching all the connections of the current user
        const userConnections=await connectionModel.find({userId:currentUserId})
        // console.log(userConnections)
        const alumId=userConnections.map(connection=>connection.alumId)
        // console.log(alumId)
        
        // fetchind data of alumuni from alumuniDB
        const alumuniDetails=await alumuniDetail.find({_id:{$in:alumId}})
        console.log(alumuniDetails)
        res.render("chatPage", { contacts:alumuniDetails })

    }catch(error){
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
})

app.post("/connect", isLoggedin, async (req, res) => {
    try {
        const userId = req.user.userId;
        const alumId = req.body.alumId;
        console.log(userId, alumId)
        const existingConnection = await connectionModel.findOne({ userId, alumId });
        if (existingConnection) {
            return res.status(400).send("you are already connected with this alumuni")
        }

        const newConnection = new connectionModel({ userId, alumId });
        await newConnection.save();
        res.redirect("/alumuni")
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
})


// app.get("/dbcreate", async (req, res) => {
//     res.render("tempDBcreation")
// })

// app.post("/dbcreation", async (req, res) => {
//     const { name, tech, company } = req.body;
//     try {
//         let alumuni = await alumuniDB.create({ name, tech, company });
//         res.send(alumuni)
//     } catch (error) {
//         console.error(error);
//         res.status(500).send("Internal Server Error");
//     }
// })

app.post("/dbcreation",async(req,res)=>{
    const { email, password } = req.body;

    try {
        // Check if the user already exists
        let user = await alumuniDB.findOne({ email });
        if (user) {
            // Compare passwords
            const match = await bcrypt.compare(password, user.password);
            if (match) {
                let token = jwt.sign({ userId: user._id, email: email }, process.env.SECRET_KEY);
                res.cookie("token", token);
                return res.redirect("/alumuni");
            } else {
                return res.status(401).send("Invalid Email or Password");
            }
        }

        // Create a new user
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        let createdUser = await alumuniDB.create({
            email: email,
            password: hash,
        });

        let token = jwt.sign({ userId: createdUser._id, email: email }, process.env.SECRET_KEY);
        res.cookie("token", token);
        res.redirect("/alumuniDetails");
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
}

)

app.get("/alumuniDetails", (req, res) => {
    res.render("alumuniDetails")
})

app.get("/login/alumuni", (req, res) => {
    res.render("loginAlumuni")
})

app.post("/alumuniDetail", async (req, res) => {
    try {
        const token = req.cookies.token;
        const { userId } = jwt.verify(token, process.env.SECRET_KEY);

        const {name,phone,dob,gender,tech,company}=req.body

        let createdDetailalumuni = await alumuniDetail.create({
            userId: userId,
            name: name,
            phone: phone,
            dob: dob,
            gender: gender,
            tech: tech,
            company: company,
        });
        res.redirect("/alumuni")

    } catch (error) {
        res.status(400).send({ error: error.message });
    }
})

app.listen(3000)