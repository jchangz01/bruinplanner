import React from 'react'
import '../css/Login.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendar, faArrowAltCircleLeft } from '@fortawesome/free-solid-svg-icons'
import {createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import TextField from "@material-ui/core/TextField";


const theme = createMuiTheme({
palette: {
    primary: {
    main: "#fff",
    },
},
});


function OptionsOrPrompt (props) {
    const [form, toggleForm] = React.useState(false);
    const onClick = () => toggleForm(!form);


    return (
        <section style={{backgroundColor: "#2774AE", minheight: "100vh"}}>
            <div id="login-main-content">
                <div class="login-icon-circle">
                    <FontAwesomeIcon class="login-icon" icon ={faCalendar}/>
                </div>
                <h1 id="Login-title">BruinPlanner</h1>
                {form ? 
                    <React.Fragment>
                        <form style={{width: "320px"}}>
                            {/* Use ThemeProvider to provide desired color for your Materials-UI elements */}
                            <ThemeProvider
                                theme={theme}
                            >
                                <TextField className="login-inputs" inputProps={{ style: { fontFamily: 'Nunito', color: 'white'}}} label="Email" color="primary"/>
                                <TextField className="login-inputs" inputProps={{ style: { fontFamily: 'Nunito', color: 'white'}}} margin="normal" label="Password" color="primary" />
                            </ThemeProvider>
                            <div id="login-prompt-buttons">
                                <span class="Login-back" onClick={onClick}>
                                    <FontAwesomeIcon className="Login-back-arrow" icon={faArrowAltCircleLeft}/>
                                    <p className="Login-back-phrase">Back</p>
                                </span>
                                <button className="login-button lightblue-br white" style={{float: "right", verticalAlign: "center", width: "160px"}}>Log-In</button>
                            </div>
                        </form>
                    </React.Fragment> :
                    <React.Fragment>    
                        <div id="login-buttons-container">
                            <a href="#"><button class="login-button lightblue-br white" style={{float: "left"}} onClick={onClick}>Log-in with email</button></a>
                            <button className="login-button blue-br white" style={{float: "right", border: "#8BB8E8 2px solid"}}>Sign-up</button>
                        </div>
                        <p style={{marginTop:"30px", width: "400px", fontSize:"15px"}}>Still unsure about creating an account? <a href='/' className="white" style={{"text-decoration": "underline", fontWeight:"bold"}}>Learn more!</a>
                        </p>
                    </React.Fragment>
                }
            </div>
        </section>
    )
}

export default class Login extends React.Component {
    render() {
        return (
            <OptionsOrPrompt />
        )
    }
}
