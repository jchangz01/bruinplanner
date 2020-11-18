import React from 'react'
import '../css/Login.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendar, faArrowAltCircleLeft } from '@fortawesome/free-solid-svg-icons'
import TextField from '@material-ui/core/TextField';

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
                        <TextField className="login-inputs" label="Email" />
                        <TextField className="login-inputs" margin="normal" label="Password" />
                        <div id="login-prompt-buttons">
                            <span class="Login-back" onClick={onClick}>
                                <FontAwesomeIcon className="Login-back-arrow" icon={faArrowAltCircleLeft}/>
                                <p className="Login-back-phrase">Back</p>
                            </span>
                            <button className="login-button lightblue-br white" style={{float: "right", verticalAlign: "center", width: "160px"}}>Log-In</button>
                        </div>
                    </React.Fragment>:
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