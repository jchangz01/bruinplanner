// load env vars for .env file
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

// external package imports
const express = require('express')
const app = express();
const request = require('request')
const bcrypt = require ('bcrypt')
const passport = require ('passport')
const flash = require ('express-flash')
const session = require ('express-session')
const methodOverride = require('method-override')

// configure express 
app.use (express.urlencoded({ extended: false })); //tells app to access 'name' input fields in req of HTTP calls
app.use(express.static(__dirname + '/client/build')); // using react static
app.use(express.json({limit:'1mb'})) //enables fetch post request on frontend
app.use (flash())
app.use (session ({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride('_method'))


/* Settting up database mongoDb */
const mongoose = require('mongoose')
var ObjectID=require('mongodb').ObjectID;
mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true, useUnifiedTopology: true})
const db = mongoose.connection
db.on('error', error => console.log(error))
db.once('open', () => console.log('Connected to Mongoose'))


/* initialize authentication passport */
const passportConfig = require ('./js/passport-config');
passportConfig.init (
    passport, 
    email => db.collection('authCredentials').findOne( {"email" : email}),
    id => db.collection('authCredentials').findOne({"_id" : ObjectID(id)})
)


/* TOP LEVEL ROUTES *//

/* GET ROUTES */
//Get routes must be in this order due to redirecting checking being from top to bottom!
app.get('/account', checkAuthenticated, (req, res) => res.sendFile(__dirname + '/client/build/index.html'));
app.get('/log-in', checkNotAuthenticated, (req, res) => res.sendFile(__dirname + '/client/build/index.html'));
app.get('/sign-up', checkNotAuthenticated, (req, res) => res.sendFile(__dirname + '/client/build/index.html'));

app.get('/getUserInfo', checkAuthenticated, async (req, res) => {
    const userInfo = await db.collection('authCredentials').findOne({"_id" : ObjectID(req.session.passport.user)})
    return res.json({ username: userInfo.user, planners: userInfo.data })
})

// MUST BE LAST!!
app.get('/*', (req, res) => res.sendFile(__dirname + '/client/build/index.html'));


/*Post and Delete Routes */
//create new planner 
app.post('/create-planner', checkAuthenticated, (req, res) => {
    const newPlanner = { name: req.body.name, major: req.body.major }
    db.collection('authCredentials').findOneAndUpdate({"_id": ObjectID(req.session.passport.user)},{ $addToSet: { data : newPlanner } } )
})

//modify existing planner 
app.post('/modify-planner', checkAuthenticated, (req, res) => {
    var index = req.body.plannerIndex;
    console.log(index)
    var editName = "data." + index + ".name"
    var editMajor = "data." + index + ".major"
    console.log(req.body.name)
    console.log(req.body.major)
    if (req.body.plannerIndex !== null)
    {
        db.collection('authCredentials').updateOne(
            {"_id": ObjectID(req.session.passport.user)},
            { $set: { [editName] : req.body.name, [editMajor] : req.body.major } }
        )
    }
    return res.json();
})

//delete existing planner 
app.post('/delete-planner', checkAuthenticated, (req, res) => {
    console.log(req.body.plannerIndex)
    var deletePlanner = 'data.' + req.body.plannerIndex;

    //deletes an array element entry of a document using index
    //https://www.tutorialspoint.com/how-do-you-remove-an-array-element-by-its-index-in-mongodb
    db.collection('authCredentials').updateOne(
        {"_id": ObjectID(req.session.passport.user)},
        {$unset:{ [deletePlanner] : 1}}
    );
    db.collection('authCredentials').updateOne(
        {"_id": ObjectID(req.session.passport.user)},
        {$pull:{ data : null}}
    );
    return res.json();
})

//Redirects to appropriate route based on passport authentication
app.post('/log-in', 
    passport.authenticate('local', { failWithError: true }),
    function(req, res, next) {
        // handle success
        console.log(req.user.user)
        console.log(req.user.data)
        return res.json ({ redirect: "/account", username: req.user.user, data: req.user.data })
    },
    function(err, req, res, next) {
        // handle error
        return res.json()
    }
);

//Redirects to appropriate route based on signing-up credentials
app.post('/sign-up', checkNotAuthenticated, async (req, res) => { 
    console.log(req.body)
    var info = {};
    try {
        // make sure that an account w/ the same username or email doesn't already exist
        const userLookup = await db.collection('authCredentials').findOne( {"user": req.body.user } );
        const emailLookup = await db.collection('authCredentials').findOne( {"email": req.body.email} );
        if (userLookup != null)
        {
            console.log("new user attempted to make account with an existing username");
            info = { redirect: "/sign-up", errorType: "username", message: "The username you entered already exist, please enter a new username"}   
        }
        else if (emailLookup != null)
        {
            console.log("new user attempted to make account with an existing email");
            info = { redirect: "/sign-up", errorType: "email", message: "The email you entered already exist, please enter a new email"}   
        }
        else if (req.body.password !== req.body.passwordConfirm)
        {
            console.log("new user's password field and password confirm field don't match")
            info = { redirect: "/sign-up", errorType: "password", message: "The password field and re-entered password field do not match, please try again"}   
        }
        else 
        {
            const hashedPassword = await bcrypt.hash(req.body.password, 10);
            var data = {
                user: req.body.user,
                email: req.body.email,
                password: hashedPassword,
                data: []
            }
            db.collection('authCredentials').insertOne(data,function(err, collection){ 
                if (err) throw err; 
                console.log("Record inserted Successfully");           
            }); 
            info = { redirect: "/log-in", message: "Successful"}   
        }
    } catch {
        info = { redirect: "/sign-up", message: "ERROR! An error has occured please try again"}   
    } finally {
        return res.json (info);
    }

})

app.delete('/log-out', (req, res) => {
    console.log('meow')
    req.logOut() //provided by passport.js library
    return res.json ({ redirect: '/log-in' })
})

/* MIDDLEWARE */ 
function checkAuthenticated(req, res, next)
{
    if (req.isAuthenticated()) { return next(); }
    res.redirect('/log-in'); // INTERACT w/ REACT FRONTEND
}

function checkNotAuthenticated(req, res, next)
{
    if (req.isAuthenticated()) { return res.redirect('/account'); } // INTERACT w/ REACT FRONTEND
    next(); 
}



















/* Extract course info from devX API */
const majorToCourse = new Map();
const courseToCourseNum = new Map();
//Retrieve and filter API data to courseNames, courseNumbers, and courseMajors
request("http://api.ucladevx.com/courses", function (error, response, body) {
    if (!error && response.statusCode == 200) {
        var parsedBody = JSON.parse(body);
        var removeDuplicates = new Set();

        for (var i = 0; i < parsedBody.length; i++)
        {
            if (!courseToCourseNum.get(parsedBody[i].courseTitle))
            {
                let generalCourseNum = parsedBody[i].courseNum.replace(/-.*/g, '')

                courseToCourseNum.set(parsedBody[i].courseTitle, generalCourseNum)

                if (majorToCourse.get(parsedBody[i].major))
                    majorToCourse.get(parsedBody[i].major).push(parsedBody[i].courseTitle)
                else    
                    majorToCourse.set(parsedBody[i].major, [parsedBody[i].courseTitle])
            }
        }
    }
})

app.get('/', (req, res) => {
    res.send(courseToCourseNum.get("Introduction to Computer Science I"))
    console.log("hi")
})

app.get('/course', (req, res) => {
    res.send(majorToCourse.get("COM SCI"))
})



// server port used to run our backend 
const port = 8080
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})