import React from 'react'
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

export default class Contact extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          firstName: '',
          lastName:'',
          email: '',
          subject:'',
          message: ''
        }
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
                <section>
                    <div id="signup-main-content">
                        <h2 id="signup-main-heading">Contact Us</h2>
                        <h3 id="signup-main-subheading">Start planning your next 4 years at UCLA now!</h3>
                        {/*<form action="/sign-up" method="POST" style={{width: "500px"}}> */}
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
                                    onChange={event => this.setState({message: event.target.value})} 
                                    value={this.state.message} 
                                    name="message" 
                                    type="text" 
                                    className="contact-inputs" 
                                    label="Message" 
                                    rows={8}
                                    multiline
                                    inputProps={{ style: { fontFamily: 'Nunito', color: 'black'}}} 
                                    margin="normal" 
                                    color="primary" 
                                    variant="outlined"
                                    required/>
                            </ThemeProvider>
                            <button type="submit" className="logSign-button blue-br white" style={{float: "right", verticalAlign: "center", width: "250px", marginTop:"30px"}}>Create-account</button>
                        </form>
                    </div>
                </section>
            </div>
                
        )
    }
    onNameChange(event) {
        this.setState({name: event.target.value})
      }
    
      onEmailChange(event) {
        this.setState({email: event.target.value})
      }
    
      onMessageChange(event) {
        this.setState({message: event.target.value})
      }
    
      handleSubmit(event) {
      }

}


 
