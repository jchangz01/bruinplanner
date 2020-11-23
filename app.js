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

// initialize authentication passport
const users = [];
const passportConfig = require ('./js/passport-config')
passportConfig.init (
    passport, 
    email => users.find(user => user.email === email),
    id => users.find(user => user.id === id)
)

// configure express 
app.use (express.urlencoded({ extended: false })); //tells app to access 'name' input fields in req of HTTP calls
app.use(express.static(__dirname + '/client/build')); // using react static
app.use (flash())
app.use (session ({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())


/* settting up database mongoDb */
const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true, useUnifiedTopology: true})
const db = mongoose.connection
db.on('error', error => console.log(error))
db.once('open', () => console.log('Connected to Mongoose'))



app.get('/account', checkAuthenticated, (req, res) => res.sendFile(__dirname + '/client/build/index.html'));


/*Post Routes */

//Redirects to appropriate route based on passport authentication
app.post('/log-in', checkNotAuthenticated, passport.authenticate('local', {
    successRedirect: '/account',
    failureRedirect: '/log-in',
    failureFlash: true
}))

//Redirects to appropriate route based on signing-up credentials
app.post('/sign-up', checkNotAuthenticated, async (req, res) => { 
    try {
        // make sure that an account w/ the same username or email doesn't already exist
        const userLookup = await db.collection('authCredentials').findOne( {"user": req.body.user } );
        const emailLookup = await db.collection('authCredentials').findOne( {"email": req.body.email} );
        if (userLookup != null)
        {
            console.log("new user attempted to make account with an existing username");
            res.redirect('/sign-up'); // INTERACT w/ REACT FRONTEND
        }
        if (emailLookup != null)
        {
            console.log("new user attempted to make account with an existing email");
            res.redirect('/sign-up'); // INTERACT w/ REACT FRONTEND
        }
        else if (req.body.password !== req.body.passwordConfirm)
        {
            console.log("new user's password field and password confirm field don't match")
            res.redirect('/sign-up'); // INTERACT w/ REACT FRONTEND
        }
        else 
        {
            const hashedPassword = await bcrypt.hash(req.body.password, 10);
            var data = {
                user: req.body.user,
                email: req.body.email,
                password: hashedPassword
            }
            db.collection('authCredentials').insertOne(data,function(err, collection){ 
                if (err) throw err; 
                console.log("Record inserted Successfully");           
            }); 
            res.redirect('/log-in') // INTERACT w/ REACT FRONTEND
        }
    } catch {
        res.redirect('/sign-up')
    }
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