// load env vars
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

const users = [];


const passportConfig = require ('./js/passport-config')
passportConfig.init (
    passport, 
    email => users.find(user => user.email === email),
    id => users.find(user => user.id === id)
)

// server port used to run our backend 
const port = 8080


app.use (express.urlencoded({ extended: false })); //tells app to access 'name' input fields in req of HTTP calls
app.use (flash())
app.use (session ({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())

app.post('/log-in', checkNotAuthenticated, passport.authenticate('local', {
    successRedirect: '/account', //+ users.user,
    failureRedirect: '/log-in',
    failureFlash: true
}))

app.post('/sign-up', checkNotAuthenticated, async (req, res) => { 
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        users.push ({
            id: Date.now().toString(), //auto generated with db
            user: req.body.user,
            email: req.body.email,
            password: hashedPassword
        })
        res.redirect('/log-in')
    } catch {
        res.redirect('/sign-up')
    }
})


function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login-in')
}

function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return res.redirect  ('/account/')// + users.user)
    }
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

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})