import React from 'react'
import axios from 'axios'
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

//Message renders a message that is provided by our backend 
function Message (props)
{
    return (
        props.message ? 
            //key is used to replay our fade-in animation when form is resubmitted
            <div key={props.key} className={props.color === "green" ? "success-green-br" : "error-red-br"} id="message-container">
                <p id="message-container-content" class="white">{props.message}</p>
            </div> 
            : null
    ) 
}

export default class Signup extends React.Component {
    //initial state
    state = ({
        user_value: "",
        email_value: "",
        password_value: "",
        passwordConfirm_value: "",
        message: "",
        messageColor: "",
        updateKey: 0 //used to update and rerender states that don't change
    })

    //handles POST request when we submit form 
    handleSubmit = event => {
        event.preventDefault();
        const data = { 
            "user": this.state.user_value,
            "email": this.state.email_value,
            "password": this.state.password_value,
            "passwordConfirm": this.state.passwordConfirm_value
        }
    
        axios.post ('/sign-up', data)
        .then(res => {
            if (res.data.redirect === '/log-in') {
                this.setState ({ messageColor: "green" })
                window.location = "/log-in"
            }
            else if (res.data.redirect === '/sign-up') {
                if (res.data.errorType === "username")
                    this.setState ({ user_value: "" })
                else if (res.data.errorType === "email")
                    this.setState ({ email_value: "" })
                else if (res.data.errorType === "password")
                    this.setState ({ password_value: "", passwordConfirm_value: "" })
                this.setState ({ messageColor: "red" })
            }
            this.setState ({message: res.data.message})

            console.log(res.data.redirect)
            console.log(res.data.message)
        })
        .catch (error => { 
            console.error (error);
            this.setState ({message: "ERROR! An error has occured please try again", messageColor: "red"})
        })
        //we are updating our updateKey so that message rerenders and animation can replay 
        .finally (() => this.setState(prevState => {
            return {updateKey: prevState.updateKey + 1}
        }))
    }

    render () {
        return (
            <div>
                <header id="signup-header">
                    <span id="signup-header-content"><a href="/">
                        <FontAwesomeIcon id="signup-header-logo" icon = { faCalendar } />
                        <h1 id="signup-header-title"><span class="gold" style={{"letter-spacing": 0}}>Bruin</span>Planner</h1>
                    </a></span>
                </header>
                <section>
                    <Message key={this.state.updateKey} color={this.state.messageColor} message={this.state.message}></Message>
                    <div id="signup-main-content">
                        <h2 id="signup-main-heading">Create your account</h2>
                        <h3 id="signup-main-subheading">Start planning your next 4 years at UCLA now!</h3>
                        {/*<form action="/sign-up" method="POST" style={{width: "500px"}}> */}
                        <form onSubmit={this.handleSubmit} style={{width: "500px"}}>  
                            {/* Use ThemeProvider to provide desired color for your Materials-UI elements */}
                            <ThemeProvider theme={theme}>
                                <TextField 
                                    onChange={event => this.setState({user_value: event.target.value})} 
                                    value={this.state.user_value}
                                    name="user" 
                                    type="text"
                                    className="logSign-inputs" label="Username"
                                    inputProps={{ style: { fontFamily: 'Nunito', color: 'black'}}}
                                    margin="normal"
                                    color="primary"
                                    required/>
                                <TextField 
                                    onChange={event => this.setState({email_value: event.target.value})} 
                                    value={this.state.email_value}
                                    name="email"
                                    type="email" 
                                    className="logSign-inputs" 
                                    label="Email" 
                                    inputProps={{ style: { fontFamily: 'Nunito', color: 'black'}}} 
                                    margin="normal"  
                                    color="primary" 
                                    required/>
                                <TextField 
                                    onChange={event => this.setState({password_value: event.target.value})} 
                                    value={this.state.password_value} 
                                    name="password" 
                                    type="password" 
                                    className="logSign-inputs" 
                                    label="Password" 
                                    inputProps={{ style: { fontFamily: 'Nunito', color: 'black'}}} 
                                    margin="normal"  
                                    color="primary" 
                                    required/>
                                <TextField 
                                    onChange={event => this.setState({passwordConfirm_value: event.target.value})} 
                                    value={this.state.passwordConfirm_value} 
                                    name="passwordConfirm" 
                                    type="password" 
                                    className="logSign-inputs" 
                                    label="Re-enter Password" 
                                    inputProps={{ style: { fontFamily: 'Nunito', color: 'black'}}} 
                                    margin="normal" 
                                    color="primary" 
                                    required/>
                            </ThemeProvider>
                            <button type="submit" className="logSign-button blue-br white" style={{float: "right", verticalAlign: "center", width: "250px", marginTop:"30px"}}>Create-account</button>
                        </form>
                    </div>
                </section>
            </div>
        )
    }
}