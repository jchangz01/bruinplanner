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
            <div key={props.key} className={props.color === "green" ? "success-green-br" : "error-red-br"} id="message-container" style={{position:"absolute"}}>
                <p id="message-container-content" className="white">{props.message}</p>
            </div> 
            : null
    ) 
}

function OptionsOrPrompt (props)
{
    return (
        <React.Fragment>
        {props.form ? 
            <React.Fragment>
                <form onSubmit={props.onSubmit} style={{width: "320px"}}>
                    {/* Use ThemeProvider to provide desired color for your Materials-UI elements */}
                    <ThemeProvider theme={theme}>
                        <TextField 
                            onChange={props.onChange}
                            value={props.email_value}
                            name="email"
                            type="email" 
                            className="logSign-inputs" 
                            label="Email" 
                            inputProps={{ style: { fontFamily: 'Nunito', color: 'white'}}} 
                            color="primary" 
                            autoFocus />
                        <TextField 
                            onChange={props.onChange} 
                            value={props.password_value}
                            name="password" 
                            type="password" 
                            className="logSign-inputs" 
                            label="Password" 
                            inputProps={{ style: { fontFamily: 'Nunito', color: 'white'}}} 
                            margin="normal" 
                            color="primary" />
                    </ThemeProvider>
                    <div id="login-prompt-buttons">
                        <span className="Login-back" onClick={props.onClick}>
                            <FontAwesomeIcon className="Login-back-arrow" icon={faArrowAltCircleLeft}/>
                            <p className="Login-back-phrase">Back</p>
                        </span>
                        <button type="submit" className="logSign-button lightblue-br white" style={{float: "right", verticalAlign: "center", width: "160px"}}>Log-In</button>
                    </div>
                </form>
            </React.Fragment> :
            <React.Fragment>    
                <div id="login-buttons-container">
                    <button className="logSign-button lightblue-br white" style={{float: "left"}} onClick={props.onClick}>Log-in with email</button>
                    <a href="/sign-up"><button className="logSign-button blue-br white" style={{float: "right", border: "#8BB8E8 2px solid"}}>Sign-up</button></a>
                </div>
                <p style={{marginTop:"30px", width: "400px", fontSize:"15px"}}>Still unsure about creating an account? <a href='/' className="white" style={{"textDecoration": "underline", fontWeight:"bold"}}>Learn more!</a>
                </p>
            </React.Fragment>
        }
        </React.Fragment>
    )
}

export default class Login extends React.Component {
    
    state = {
        form: false,
        email_value: "",
        password_value: "",
        message: "",
        messageColor: "",
        updateKey: 0
    }

    toggleForm = () => this.setState ( prevState => {return { form: !prevState.form, message: "" }})

    //handles input field changes
    handleChange = event => {
        var input = event.target.name + "_value"
        this.setState ({
            [input]: event.target.value
        })
    } 

    //handles POST request when we submit form 
    handleSubmit = event => {
        console.log(this.state.email_value)
        console.log(this.state.password_value)
        event.preventDefault();
        const data = { 
            "email": this.state.email_value,
            "password": this.state.password_value,
        }

        axios.post ('/log-in', data)
        .then(res => {
            if (res.data.redirect === '/account') {
                this.props.history.push ({ pathname: res.data.redirect }) //redirect to /account 
            }
         })
        .catch (error => { 
            console.error (error);
            this.setState ({email_value: "", password_value: "", message: "Email/Password is invalid, please try again", messageColor: "red"})
            this.setState(prevState => {
                return {updateKey: prevState.updateKey + 1} //we are updating our updateKey so that message rerenders and animation can replay 
            })
        })
    }

    render() {
        return (
            <section style={{backgroundColor: "#2774AE", minheight: "100vh"}}>
                <Message key={this.state.updateKey} message={this.state.message} color={this.state.messageColor} />
                <div id="login-main-content">
                    <div className="login-icon-circle">
                    <FontAwesomeIcon class="login-icon" icon ={faCalendar}/>
                </div>
                <h1 id="Login-title">BruinPlanner</h1>
                <OptionsOrPrompt
                form={this.state.form} 
                onSubmit={this.handleSubmit} 
                onChange={this.handleChange} 
                onClick={this.toggleForm} 
                email_value={this.state.email_value} 
                password_value={this.state.password_value} 
                />
            </div>
        </section>
        )
    }

    componentDidMount () {
        try {
            if (this.props.location.state.message) {
                this.setState ({ form: true, message: this.props.location.state.message, messageColor: "green" })
            }
            console.log("Account created")
        }
        catch {
            console.log("Normal navigation")
        }
    }
}
