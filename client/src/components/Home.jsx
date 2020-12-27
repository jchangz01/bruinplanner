import React from 'react'
import '../css/Home.css'
import roycehall from '../images/roycehall.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendar, faArrowsAlt, faUserGraduate, faBorderAll } from '@fortawesome/free-solid-svg-icons'

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
                        <h2 id="home-main-section-title">Plan, organize, and select the courses for your next four years at UCLA with BruinPlanner!</h2>
                        <p id="home-main-section-description"> 
                            Having trouble creating a plan to graduate in 4-years? Our website lets you dynamically construct 
                            a 4-year plan based on your major. We offer a beautiful grid UI for students to visualize their journey at UCLA with ease. 
                            Create an account now to get started!
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
                                    <FontAwesomeIcon className="claim-icon" icon={faBorderAll} />
                                </div>
                                <h3>Grid Style Layout</h3>
                                <p className="claim-description">
                                    See your classes displayed on a grid-formatted calendar instead of a plain HTML lists. Clearly visualize your potential schedules
                                    with minimal scrolls and clicks. 
                                </p>
                            </article>
                            <article className="claim">
                                <div className="circle">
                                    <FontAwesomeIcon className="claim-icon" icon={faArrowsAlt} style={{width: "120px"}}/>
                                </div>
                                <h3>Drag and Drop Capability</h3>
                                <p className="claim-description">
                                    Quickly and easily alter your plans with the drag and drop interface. Simply search for a course and
                                    drag it into the planner grid to add it to your 4-year plan!
                                </p>
                            </article>
                            <article className="claim">
                                <div className="circle">
                                    <FontAwesomeIcon className="claim-icon" icon={faUserGraduate} />
                                </div>
                                <h3>Personal Account</h3>
                                <p className="claim-description">
                                    Don't have access to your personal device? Don't worry! Create your personal account to store your planners
                                    under your credentials, so you can access them on any device.
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