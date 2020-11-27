//Use local strategy for authentication
const LocalStrategy = require ('passport-local').Strategy
const bcrypt = require ('bcrypt')

function init (passport, getUserByEmail, getUserbyId) {
    
    async function authenticateUser (email, password, done) {
        const user = await getUserByEmail(email)
        console.log(user)
        if (user == null) {
            return done(null, false, { message: "No user with that email"})
        }

        try {
            if (await bcrypt.compare(password, user.password)) {
                console.log("User [" + user.user + "] has successfully logged in");
                return done (null, user, { message: "Success"})
            } else {
                return done (null, false, { message: "Password incorrect, please try again" })
            }
        } catch (e) {
            return done(e)
        }
    } 

    passport.use(new LocalStrategy({ usernameField: 'email'}, authenticateUser)) //no need to pass in password field because defaults to password
    passport.serializeUser((user, done) => { return done(null, user._id) })
    passport.deserializeUser((id, done) => { return done(null, getUserbyId(id)) })
}

module.exports = {init : init}