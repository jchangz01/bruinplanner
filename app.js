// this is the main backend for BruinPlanner
console.log("Starting BruinPlanner Server");

// load env vars for .env file
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

// external package imports
const express = require('express')
const app = express();
const bcrypt = require ('bcrypt')
const passport = require ('passport')
const flash = require ('express-flash')
const session = require ('express-session')
const methodOverride = require('method-override')

// internal package imports 
const planner = require ('./js/planner-structure')
const classes = require ('./js/retrieve-courses')
const allCourses = require ('./api/master_courses.json') //retrieves an array of objects containing all course names and ids
const mail = require('./js/contactMail-config.js') 

// configure contact email
const contactEmail = mail.configureEmail(process.env.CONTACT_EMAIL_ADDRESS, process.env.CONTACT_EMAIL_PASS)
const contactEmailAddress = process.env.CONTACT_EMAIL_ADDRESS

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
app.get('/account/:username', checkAuthenticated, (req, res) => res.sendFile(__dirname + '/client/build/index.html'));
app.get('/account/:username/planner/:index', checkAuthenticated, (req, res) => res.sendFile(__dirname + '/client/build/index.html'));
app.get('/log-in', checkNotAuthenticated, (req, res) => res.sendFile(__dirname + '/client/build/index.html'));
app.get('/sign-up', checkNotAuthenticated, (req, res) => res.sendFile(__dirname + '/client/build/index.html'));

//get user's username and planners
app.get('/getUserInfo', checkAuthenticated, async (req, res) => {
    const userInfo = await db.collection('authCredentials').findOne({"_id" : ObjectID(req.session.passport.user)})
    console.log('Sending ' + userInfo.user + "'s planner data")
    return res.json({ username: userInfo.user, planners: userInfo.data })
})

//gets list of ALL courses
app.get('/getCourses', (req, res) => {
    console.log( "Master list of " + allCourses.length + " courses will be sent" )
    return res.json ({ allCourses : allCourses })
})

// MUST BE LAST!!
app.get('/*', (req, res) => res.sendFile(__dirname + '/client/build/index.html'));


/*Post and Delete Routes */
//receive feedback from contact form in the front end
app.post('/sendFeedback', async (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const content = req.body.content; 
    const mail = {
        from: email,
        to: contactEmailAddress,
        subject: "BruinPlanner Feedback",
        html: `<p>Name: ${name}</p><p>Email: ${email}</p><p>Message: ${content}</p>`,
    };
    contactEmail.sendMail(mail, (error) => {
        if (error) {
            console.log("Feedback failed to send")
            res.json({ status: "failed" });
        } else {
            console.log("Feedback sent successfully")
            res.json({ status: "sent" });
        }
    });
})

//gets specific planner by its index in the list of all planners
app.post('/getPlannerInfo', checkAuthenticated, async (req, res) => {
    const userInfo = await db.collection('authCredentials').findOne({"_id" : ObjectID(req.session.passport.user)})
    console.log(req.body.index)
    console.log( 'Retrieving planner with name "' + userInfo.data[req.body.index].name + '" and major "' + userInfo.data[req.body.index].major + '"')
    return res.json({ username: userInfo.user, plannerInfo: userInfo.data[req.body.index] })
})

//gets list of all courses with courses already in planner filtered out
app.post('/getFilteredCourses', checkAuthenticated, async (req, res) => {
    console.log( "Filtering master course list before sending to client" )
    const userInfo = await db.collection('authCredentials').findOne({"_id" : ObjectID(req.session.passport.user)})
    const activePlanner = userInfo.data[req.body.index]
    const filteredCourses = classes.filterAllCourseData (activePlanner)
    console.log( "Filtered course list down to " + filteredCourses.length + " courses")
    return res.json({ filteredCourses: filteredCourses})
})

//save work in progress planner
app.post('/savePlanner', checkAuthenticated, async (req, res) => {
    console.log ('Attempting to save planner')
    const userInfo = await db.collection('authCredentials').findOne({"_id": ObjectID(req.session.passport.user)})
    if (userInfo.data[req.body.plannerIndex].name === req.body.planner.name)
    {
        let editPlanner = "data." + req.body.plannerIndex
        db.collection('authCredentials').updateOne(
            {"_id": ObjectID(req.session.passport.user)},
            { $set: {  [editPlanner] : req.body.planner } }
        )
        console.log('Save Successful!')
        return res.json({ result: 'saved' })
    }
    else{
        console.log('Save Failure!')
        return res.json();
    }
})


//create new planner 
app.post('/create-planner', checkAuthenticated, async (req, res) => {
    console.log ( 'Creating new planner named ' + req.body.name + ' with major ' + req.body.major)
    const newPlanner = planner.getPlannerStructure();
    newPlanner.name = req.body.name;
    newPlanner.major = req.body.major;
    console.log(newPlanner) //display the contents of the new planner created
    await db.collection('authCredentials').findOneAndUpdate({"_id": ObjectID(req.session.passport.user)},{ $push: { data : newPlanner } } )

    const userInfo = await db.collection('authCredentials').findOne({"_id": ObjectID(req.session.passport.user)})
    return res.json( {index: [userInfo.data.length - 1]} )
})

//modify existing planner 
app.post('/modify-planner', checkAuthenticated, (req, res) => {
    console.log ( 'Modifying existing planner' )
    var index = req.body.plannerIndex;
    console.log('Current Planner Index: ' + index)
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
    console.log ( 'Deleting existing planner' )
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
        if ( req.body.user.includes('/') )
        {
            console.log("new user attempted to use a username with a '/' character")
            info = { redirect: "/sign-up", errorType: "username", message: "The username you entered has an invalid character '/'"}
        }
        else if (userLookup != null)
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
    req.logOut() //provided by passport.js library
    return res.json ({ redirect: '/log-in' })
})

/* MIDDLEWARE */ 
function checkAuthenticated(req, res, next)
{
    if (req.isAuthenticated()) { return next(); }
    res.redirect('/log-in'); // INTERACT w/ REACT FRONTEND
}

async function checkNotAuthenticated(req, res, next)
{
    if (req.isAuthenticated()) { 
        const userInfo = await db.collection('authCredentials').findOne({"_id": ObjectID(req.session.passport.user)})
        return res.redirect('/account/' + userInfo.user); 
    } // INTERACT w/ REACT FRONTEND
    next(); 
}


// server port used to run our backend 
const port = 8080
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})