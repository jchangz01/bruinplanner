import React from 'react'
import '../css/Signup.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendar } from '@fortawesome/free-solid-svg-icons'
import {createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import TextField from "@material-ui/core/TextField";

const theme = createMuiTheme({
    palette: {
        primary: {
        main: "#000",
        },
    },
    });
    

export default class Signup extends React.Component {
    render () {
        return (
            <div>
                <header id="signup-header">
                    <a href="/"><div id="signup-header-content">
                        <FontAwesomeIcon id="signup-header-logo" icon = { faCalendar } />
                        <h1 id="signup-header-title"><span class="gold" style={{"letter-spacing": 0}}>Bruin</span>Planner</h1>
                    </div></a>
                </header>
                <section>
                    <div id="signup-main-content">
                        <h2 id="signup-main-heading">Create your account</h2>
                        <h3 id="signup-main-subheading">Start planning your next 4 years at UCLA now!</h3>
                        <form style={{width: "500px"}}>
                            {/* Use ThemeProvider to provide desired color for your Materials-UI elements */}
                            <ThemeProvider
                                theme={theme}
                            >
                                <TextField className="login-inputs" inputProps={{ style: { fontFamily: 'Nunito', color: 'black'}}} margin="normal" label="Username" color="primary"/>
                                <TextField className="login-inputs" inputProps={{ style: { fontFamily: 'Nunito', color: 'black'}}} margin="normal" label="Email" color="primary" />
                                <TextField className="login-inputs" inputProps={{ style: { fontFamily: 'Nunito', color: 'black'}}} margin="normal" label="Password" type="password" color="primary"/>
                                <TextField className="login-inputs" inputProps={{ style: { fontFamily: 'Nunito', color: 'black'}}} margin="normal" label="Re-enter Password" type="password" color="primary" />
                            </ThemeProvider>
                            <button className="login-button blue-br white" style={{float: "right", verticalAlign: "center", width: "250px", marginTop:"30px"}}>Create-account</button>
                        </form>
                    </div>
                </section>
            </div>
        )
    }
}