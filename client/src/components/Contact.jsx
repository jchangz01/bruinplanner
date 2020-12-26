import React from 'react'
import axios from 'axios'
import '../css/Contact.css'
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

export default class Contact extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          firstName: '',
          lastName:'',
          email: '',
          subject:'',
          content: '',
          message: '',
          updateKey: 0,
        }
      }
    
      handleSubmit = (event) => {
        event.preventDefault();
        console.log(this.state.firstName)
        const feedback = {
            "firstName": this.state.firstName, 
            "lastName": this.state.lastName,
            "email": this.state.email,
            "subject": this.state.subject,
            "content": this.state.content,
        }

        axios.post('/sendFeedback', feedback)
        .then (res => {
            this.setState ({
                firstName: '', 
                lastName: '',
                email: '',
                subject: '',
                content: '',
                message: "Feedback has been successfully sent!",
                messageColor: "green",
                updateKey: this.state.updateKey + 1
            })
        })
        .catch (err => {
            this.setState ({
                message: "An error has occured, please try again",
                messageColor: "red",
                updateKey: this.state.updateKey + 1
            })
        })
    }

    render() {
        return (
            <div>
                <header id="header">
                    <div id="header-content">
                        <FontAwesomeIcon id="header-logo" icon = { faCalendar } />
                        <a href="/"><h1 id="header-title"><span class="gold" style={{"letterSpacing": 0}}>Bruin</span>Planner</h1></a>
                        <nav id="header-navigation">
                            <a href="/about">ABOUT</a>
                            <a href="/contact">CONTACT</a>
                            <a href="/sign-up"><button className="header-buttons gold">SIGN UP</button></a>
                            <a href="/log-in"><button className="header-buttons blue">LOG IN</button></a>
                        </nav>
                    </div>
                </header>
                <Message message={this.state.message} color={this.state.messageColor} key={this.state.updateKey}/>
                <section>
                    <div id="contact-main-content">
                        <h2 id="contact-main-heading">Contact Us</h2>
                        <h3 id="contact-main-subheading">Let us know your questions, comments, or suggestions!</h3>
                        <form onSubmit={this.handleSubmit} style={{width: "500px"}}>  
                            {/* Use ThemeProvider to provide desired color for your Materials-UI elements */}
                            <ThemeProvider theme={theme}>
                                <TextField 
                                    onChange={event => this.setState({firstName: event.target.value})} 
                                    value={this.state.firstName}
                                    name="firstName" 
                                    type="text"
                                    className="contact-name-inputs" 
                                    label="FirstName"
                                    inputProps={{ style: { fontFamily: 'Nunito', color: 'black'}}}
                                    margin="normal"
                                    color="primary"
                                    variant="outlined"
                                    required/>
                                <TextField 
                                    onChange={event => this.setState({lastName: event.target.value})} 
                                    value={this.state.lastName}
                                    name="lastName" 
                                    type="text"
                                    className="contact-name-inputs" 
                                    label="LastName"
                                    inputProps={{ style: { fontFamily: 'Nunito', color: 'black'}}}
                                    margin="normal"
                                    color="primary"
                                    variant="outlined"
                                    required/>
                                <TextField 
                                    onChange={event => this.setState({email: event.target.value})} 
                                    value={this.state.email}
                                    name="email"
                                    type="email" 
                                    className="contact-inputs" 
                                    label="Email" 
                                    inputProps={{ style: { fontFamily: 'Nunito', color: 'black'}}} 
                                    margin="normal"  
                                    color="primary" 
                                    variant="outlined"
                                    required/>
                                <TextField 
                                    onChange={event => this.setState({subject: event.target.value})} 
                                    value={this.state.subject} 
                                    name="subject" 
                                    type="text" 
                                    className="contact-inputs" 
                                    label="Subject" 
                                    inputProps={{ style: { fontFamily: 'Nunito', color: 'black'}}} 
                                    margin="normal"  
                                    color="primary" 
                                    variant="outlined"
                                    required/>
                                <TextField 
                                    onChange={event => this.setState({content: event.target.value})} 
                                    value={this.state.content} 
                                    name="content" 
                                    type="text" 
                                    className="contact-inputs" 
                                    label="Message" 
                                    rows={10}
                                    multiline
                                    inputProps={{ style: { fontFamily: 'Nunito', color: 'black'}}} 
                                    margin="normal" 
                                    color="primary" 
                                    variant="outlined"
                                    required/>
                            </ThemeProvider>
                            <button type="submit" className="logSign-button blue-br white" style={{float: "center", verticalAlign: "center", width: "250px", marginTop:"30px"}}>Send</button>
                        </form>
                    </div>
                </section>
            </div>
                
        )
    }
}


 
