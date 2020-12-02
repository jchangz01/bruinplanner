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
                        <h2 id="home-main-section-title">Lorem ipsum dolor sit amet, consetetur tempor meow meow meow
                            invidunt ut labore et dolore</h2>
                        <p id="home-main-section-description"> 
                            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
                            invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et 
                            accusam et justo duo dolores et ea rebum. et justo duo dolores et ea rebum. Et justo duo dolores et ea rebum. et justo duo dolores et ea rebum. 
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
                        <h2 id="home-sub-section-title">Lorem ipsum dolor sit amet, consetetur tempor meow</h2>
                        <div id="home-sub-section-claims">
                            <article className="claim" >
                                <div className="circle">
                                    <FontAwesomeIcon className="claim-icon" icon={faCalendar} />
                                </div>
                                <p className="claim-description">
                                    Lorem voluptua. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
                                    invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
                                </p>
                            </article>
                            <article className="claim">
                                <div className="circle">
                                    <FontAwesomeIcon className="claim-icon" icon={faAddressBook} />
                                </div>
                                <p className="claim-description">
                                    Lorem voluptua. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
                                    invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
                                </p>
                            </article>
                            <article className="claim">
                                <div className="circle">
                                    <FontAwesomeIcon className="claim-icon" icon={faAmbulance} />
                                </div>
                                <p className="claim-description">
                                    Lorem voluptua. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
                                    invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
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