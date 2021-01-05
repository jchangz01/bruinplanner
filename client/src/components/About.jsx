import React from 'react'
import '../css/About.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { faCalendar, faEnvelope } from '@fortawesome/free-solid-svg-icons'

//image imports
import desk from '../images/desk.svg'
import profile from '../images/justin_kyle_chang_profile.png'
import nilayShah from '../images/contributors/nilay_shah.jpg'
import gauravKale from '../images/contributors/gaurav_kale.jpg'
import davidZhao from '../images/contributors/david_zhao.jpg'

function Contributors () {
    return (
        <React.Fragment>
            <h3 id="about-creators-title2">Contributors</h3>
            <div className="about-contributors-content">
                <div>
                    <img src={nilayShah} alt="Justin Kyle Chang" className="about-creators-image" />
                    <h3 style={{fontSize: "28px", margin: "8px 0 4px"}}>Nilay Shah</h3>
                </div>
                <div>
                    <img src={gauravKale} alt="Justin Kyle Chang" className="about-creators-image" />
                    <h3 style={{fontSize: "28px", margin: "8px 0 4px"}}>Gaurav Kale</h3>
                </div>
                <div>
                    <img src={davidZhao} alt="Justin Kyle Chang" className="about-creators-image" />
                    <h3 style={{fontSize: "28px", margin: "8px 0 4px"}}>David Zhao</h3>
                </div>
            </div>
        </React.Fragment>
    )
}

export default class About extends React.Component {
    state = {
        message: "",
        updateKey: 0,
    }
    copyToClipboard = () => {
        var text = "jchangz01@g.ucla.edu"
        var textArea = document.createElement("textarea");
        textArea.value = text;
        
        // Avoid scrolling to bottom
        textArea.style.top = "0";
        textArea.style.left = "0";
        textArea.style.position = "fixed";

        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();

        try {
            var successful = document.execCommand('copy');
            var msg = successful ? 'successful' : 'unsuccessful';
            console.log('Fallback: Copying text command was ' + msg);
            this.setState({message: "Email copied to clipboard!", updateKey: this.state.updateKey + 1})
        } catch (err) {
            console.error('Fallback: Oops, unable to copy', err);
        }

        document.body.removeChild(textArea);
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
                    <div>
                        <h2 className="about-section-title blue">About BruinPlanner</h2>
                        <p className="about-section-description"> 
                            Originally created as a final project for a Computer Science course, 
                            BruinPlanner has since then been improved and revamped for a more 
                            eye-catching look and enhanced functionalities. Read more about our story 
                            and meet the creator below!
                        </p>
                    </div>
                    <div style={{position: "relative"}}>
                        <img id="about-section-mainimg" className="float" src={desk} alt="https://www.vecteezy.com/vector-art/203025-vector-designer-s-room-illustration"/>
                        <a target="_blank" rel="noreferrer" href="https://www.vecteezy.com/free-vector/office" style={{position: "absolute", bottom: "0", left: "50%", transform: "translate(-50%, 0)"}}>
                            Office Vectors by Vecteezy
                        </a>
                    </div>
                    <div className="full-width-box lightblue-br"/>
                </section>
                <section>
                    <div className="blue-br">
                        <h2 className="about-section-title white">Our Inspirations and Goals</h2>    
                        <p className="about-section-description white" style={{width: "800px", textAlign: "left"}}>
                            Committing to a four-year university may seem like a major accomplishment and
                            stress reliever as you no longer have to deal with high school; however, 
                            the reality is that the real pressure is only getting started. At a 
                            prestigious college such as the University of California, Los-Angeles, 
                            not only do students have to compete and strive for good grades, they have 
                            to worry about clubs, and more importantly, the classes they need to take 
                            to graduate. Almost all students will agree that coursework itself is taxing 
                            enough; they don’t want to have to constantly meet with counselors, 
                            maintain an updated Google doc, and surf through the UCLA coursework 
                            website to formulate a four-year plan that will inevitably change 
                            throughout their years at college.
                        </p>
                        <p className="about-section-description white" style={{width: "800px", textAlign: "left"}}>
                            BruinPlanner is an interactive application for UCLA students to help design a 
                            4-year plan. UCLA has always struggled with presenting course requirements and 
                            requisites due to them having too many websites with unnecessary information 
                            such as outdated 4-year plans. Instead, if students had an interactive 4-year 
                            planner where they could select their major and visually see their required 
                            classes with their respective prereqs, it would save them a lot of time and 
                            pain. This website allows students to create an account that would give them 
                            access to 4-year planners based on major(s) in which they could organize their 
                            classes based on requirements.
                        </p>
                        <p className="about-section-description white" style={{width: "800px", textAlign: "left", paddingBottom: "37.5px"}}>
                            Our goal with BruinPlanner is to alleviate 
                            these struggles by creating an application for students to 
                            easily identify, plan, and understand the courses/requirements they must 
                            fulfill to graduate promptly!
                        </p>
                    </div>                     
                </section>
                <section>
                    <div style={{width: "980px", margin: "40px auto 70px", position: 'relative'}}>
                        <h2 id="about-creators-title" className="blue">Meet the Creator</h2>
                        <div className="about-creators-content">
                            <div>
                                <img src={profile} alt="Justin Kyle Chang" className="about-creators-image" />
                                <h3 style={{fontSize: "28px", margin: "8px 0 4px"}}>Justin Kyle Chang</h3>
                                <h4 style={{fontSize: "16px", fontFamily: "Nunito",}}>Lead Programmer and Project Director</h4>
                            </div>
                            <div>
                                <p className="about-creators-paragraph">
                                    Hello! My name is Justin Kyle Chang. I am a 2nd-year student at UCLA pursuing a 
                                    B.E. degree in Computer Science and aspiring to be a future software engineer. I have a huge 
                                    passion for creating websites and web development as a whole. My specialty lies in front-end 
                                    development and design (HTML, CSS, JS/JSX); however, I am also interested and knowledgable
                                    in other fields of Computer Science!
                                </p>
                                <p className="about-creators-paragraph">
                                    BruinPlanner is my first ever full-stack web application (receiving minor 
                                    assistance from the contributors listed below). It was originally created 
                                    as my final project for my computer science class; however, I decided to 
                                    further develop this website after its submission. When building this application, 
                                    I wanted to create something that not only demonstrated my knowledge and growth 
                                    in full-stack development but also something that would be beneficial to UCLA students. 
                                    My main inspiration for this project idea derived from my personal uncertainty on what 
                                    classes to take to create an optimized 4-year plan. I was never the student to maintain 
                                    an updated 4-year plan document, so instead, I decided to create a website to alleviate 
                                    the pain for myself and other UCLA students. As mentioned above, this is my first ever 
                                    full-stack website, so if you have any questions, comments, or feedback, please let me 
                                    know by filling out the <a href="/contact" style={{color: "blue"}}>contact</a> form!
                                </p>
                                <p className="about-creators-paragraph">
                                    Also, feel free to check out my portfolio, or connect with me below!
                                </p>
                                <div className="about-creators-socials">
                                    <a target="_blank" rel="noreferrer" href="https://www.linkedin.com/in/justin-kyle-chang-31582419b/"><FontAwesomeIcon icon={faLinkedin} style={{color: "#007bb5"}}/></a>
                                    <a target="_blank" rel="noreferrer" href="https://www.facebook.com/justin.chang.54772/"><FontAwesomeIcon icon={faFacebook} style={{color: "#4267B2"}} /></a>
                                    <FontAwesomeIcon icon={faEnvelope} style={{color: "#0072C6"}} onClick={this.copyToClipboard}/>
                                    { this.state.message ? <span className="success-green" key={this.state.updateKey} style={{opacity: "1"}}>{this.state.message}</span> : null}
                                </div>
                            </div>
                        </div>
                        <Contributors />
                    </div>
                </section>
                <footer>
                    <div className="full-width-box darkblue-br" style={{height: "120px"}}>
                        <div id="footer">                        
                            <div id="footer-socials">
                                <a target="_blank" rel="noreferrer" href="https://github.com/jchangz01/bruinplanner"><FontAwesomeIcon icon={faGithub}/></a>
                            </div>
                            <div id="footer-content">
                                <div>
                                    <a target="_blank" rel="noreferrer" href="https://www.justinklchang.com/#/"><h2 id="copyright">&#169; justinklchang.com</h2></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        )
    }

}
