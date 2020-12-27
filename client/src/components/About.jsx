import React from 'react'
import '../css/About.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendar } from '@fortawesome/free-solid-svg-icons'
import desk from '../images/desk.svg'

export default class About extends React.Component {
    
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
                        <h2 id="about-main-section-title">What inspired BruinPlanner?</h2>
                        <p className="about-main-section-description"> 
                            Committing to a four year university may find seem like a major 
                            stress reliever as you no longer have to deal with high school; however, 
                            the reality is that the real pressure is only getting started. At a 
                            prestigious college such as the University of California, Los-Angeles, 
                            not only do students have to compete and strive for good grades, they have 
                            to worry about clubs, and more importantly, the classes they need to take 
                            to graduate. Almost all students will agree that coursework itself is taxing 
                            enough; they don’t want to have to constantly meet up with counselors, 
                            maintain an updated Google doc, and surf through the UCLA coursework 
                            website to formulate a four-year plan that will inevitably change 
                            throughout my years at college. Our goal with BruinPlanner is to alleviate 
                            these struggles by creating an application for students to 
                            easily identify, plan, and understand the courses/requirements they must 
                            fulfill in order to graduate in a timely manner!
                        </p>
                    </div>
                    <img id="about-main-section-mainimg" className="float fade-in" src={desk} alt="ERROR"/>
                    <div class="full-width-box lightblue-br"/>
                </section>
            </div>
        )
    }

}
