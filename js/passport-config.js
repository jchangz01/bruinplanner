//Use local strategy for authentication
const LocalStrategy = require ('passport-local').Strategy
const bcrypt = require ('bcrypt')

function init (passport, getUserByEmail, getUserbyId) {
    
    async function authenticateUser (req, email, password, done) {
        const user = await getUserByEmail(email)
        console.log(user)
        if (user == null) {
            req.authError = "No user with that email, please try again"
            req.authErrorType = "email"
            return done(null, false, { message: "No user with that email"})
        }

        try {
            if (await bcrypt.compare(password, user.password)) {
                console.log("User [" + user.user + "] has successfully logged in");
                return done (null, user, { message: "Success"})
            } else {
                req.authErrorType = "password"
                req.authError = "Password incorrect, please try again"
                return done (null, false, { message: "Password incorrect, please try again" })
            }
        } catch (e) {
            return done(e)
        }
    } 

    passport.use(new LocalStrategy({ usernameField: 'email', passReqToCallback: true}, authenticateUser)) //no need to pass in password field because defaults to password
    passport.serializeUser((user, done) => { return done(null, user._id) })
    passport.deserializeUser((id, done) => { return done(null, getUserbyId(id)) })
}

module.exports = {init : init}