import React from 'react'
import axios from 'axios'
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

function Message (props)
{
    return (
        props.message ? 
            //key is used to replay our fade-in animation when form is resubmitted
            <div key={props.key} id="message-container">
                <p id="message-container-content" className="white">{props.message}</p>
            </div> 
            : null
    ) 
}


class OptionsOrPrompt extends React.Component {
    
    state = {
        form: false,
        email_value: "",
        password_value: "",
        message: "",
        updateKey: 0
    }

    toggleForm = () => this.setState ( prevState => {return { form: !prevState.form }})

    //handles POST request when we submit form 
    handleSubmit = event => {
        event.preventDefault();
        const data = { 
            "email": this.state.email_value,
            "password": this.state.password_value,
        }

        axios.post ('/log-in', data)
        .then(res => {
            if (res.data.redirect === '/account') 
                window.location = "/account"
         })
        .catch (error => { 
            console.error (error);
            this.setState ({email_value: "", password_value: "", message: "Email/Password is invalid, please try again"})
        })
        //we are updating our updateKey so that message rerenders and animation can replay 
        .finally (() => this.setState(prevState => {
            return {updateKey: prevState.updateKey + 1}
        }))
    }

    render() {
        return (
            <section style={{backgroundColor: "#2774AE", minheight: "100vh"}}>
                <Message key={this.state.updateKey} message={this.state.message} />
                <div id="login-main-content">
                    <div className="login-icon-circle">
                    <FontAwesomeIcon class="login-icon" icon ={faCalendar}/>
                </div>
                <h1 id="Login-title">BruinPlanner</h1>
                {this.state.form ? 
                    <React.Fragment>
                        {/*<form action="/log-in" method="POST" style={{width: "320px"}}>*/}
                        <form onSubmit={this.handleSubmit} style={{width: "320px"}}>
                            {/* Use ThemeProvider to provide desired color for your Materials-UI elements */}
                            <ThemeProvider theme={theme}>
                                <TextField 
                                    onChange={event => this.setState({email_value: event.target.value})} 
                                    value={this.state.email_value}
                                    name="email"
                                    type="email" 
                                    className="logSign-inputs" 
                                    label="Email" 
                                    inputProps={{ style: { fontFamily: 'Nunito', color: 'white'}}} 
                                    color="primary" 
                                    autoFocus />
                                <TextField 
                                    onChange={event => this.setState({password_value: event.target.value})} 
                                    value={this.state.password_value}
                                    name="password" 
                                    type="password" 
                                    className="logSign-inputs" 
                                    label="Password" 
                                    inputProps={{ style: { fontFamily: 'Nunito', color: 'white'}}} 
                                    margin="normal" 
                                    color="primary" />
                            </ThemeProvider>
                            <div id="login-prompt-buttons">
                                <span className="Login-back" onClick={this.toggleForm}>
                                    <FontAwesomeIcon className="Login-back-arrow" icon={faArrowAltCircleLeft}/>
                                    <p className="Login-back-phrase">Back</p>
                                </span>
                                <button type="submit" className="logSign-button lightblue-br white" style={{float: "right", verticalAlign: "center", width: "160px"}}>Log-In</button>
                            </div>
                        </form>
                    </React.Fragment> :
                    <React.Fragment>    
                        <div id="login-buttons-container">
                            <button className="logSign-button lightblue-br white" style={{float: "left"}} onClick={this.toggleForm}>Log-in with email</button>
                            <a href="/sign-up"><button className="logSign-button blue-br white" style={{float: "right", border: "#8BB8E8 2px solid"}}>Sign-up</button></a>
                        </div>
                        <p style={{marginTop:"30px", width: "400px", fontSize:"15px"}}>Still unsure about creating an account? <a href='/' className="white" style={{"textDecoration": "underline", fontWeight:"bold"}}>Learn more!</a>
                        </p>
                    </React.Fragment>
                }
            </div>
        </section>
        )
    }
}

export default class Login extends React.Component {
    render() {
        return (
            <OptionsOrPrompt />
        )
    }
}
