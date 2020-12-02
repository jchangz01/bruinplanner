import React from 'react'
import '../css/Home.css'
import roycehall from '../images/roycehall.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendar, faAddressBook, faAmbulance } from '@fortawesome/free-solid-svg-icons'

export default class Home extends React.Component {
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
                        <h2 id="home-main-section-title">It's Finally Here: The UCLA 4 Year Planner
                            For the Henry Samueli School of Engineering</h2>
                        <p id="home-main-section-description"> 
                            For far too long, Engineering Students at UCLA have had to hunt 
                            through endless html webpages and outdated course requisite lists. Now, your pains
                            are lessened, with our app that lets you dynamically construct a 4 Year Plan. Create an account to get started,
                         	and we'll help with the rest!
                        </p>
                        <a href="/log-in">
                            <button className="home-main-section-button">GET STARTED</button>
                        </a>
                    </div>
                    <img id="home-main-section-mainimg" class="fade-in" src={roycehall} alt="XXX"/>
                    <div class="full-width-box lightblue-br" style={{"marginTop": "-130px"}}></div>
                </section>
                <section>
                    <div id="home-sub-section-content">
                        <h2 id="home-sub-section-title">Want to Learn More about our Application?</h2>
                        <div id="home-sub-section-claims">
                            <article className="claim" >
                                <div className="circle">
                                    <FontAwesomeIcon className="claim-icon" icon={faCalendar} />
                                </div>
                                <p className="claim-description">
                                    See your classes displayed on a dynamic calendar instead of on HTML lists. Visualize the schedules that
                                    you could have, with no fuss and an easy search system to boot.
                                </p>
                            </article>
                            <article className="claim">
                                <div className="circle">
                                    <FontAwesomeIcon className="claim-icon" icon={faAddressBook} />
                                </div>
                                <p className="claim-description">
                                    Quick and easy sign up through email. Don't worry, we're not selling your data (yet). It just 
                                    helps you manage your different plans from a centralized hub.
                                </p>
                            </article>
                            <article className="claim">
                                <div className="circle">
                                    <FontAwesomeIcon className="claim-icon" icon={faAmbulance} />
                                </div>
                                <p className="claim-description">
                                    Last minute emergencies? First pass was too late and now your entire plan is in shambles? Don't worry,
                                    we store your previous plans, so that you can edit whenever you need.
                                </p>
                            </article>
                        </div>
                    </div>
                </section>
                <section>
                    <div class="full-width-box white-br" style={{height: "245px"}}>
                        <h2 id="home-final-section-title" >Have any questions or concerns? Let us know!</h2>
                        <a href="/contact">
                            <button className="home-main-section-button">ASK A QUESTION</button>
                        </a>
                    </div>
                </section>
                <footer>
                    <div className="full-width-box darkblue-br" style={{height: "85px"}}></div>
                </footer>
            </div>
        )
    }
}