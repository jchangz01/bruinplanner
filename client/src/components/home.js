import React from 'react'
import '../css/home.css'
import roycehall from '../roycehall.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendar } from '@fortawesome/free-solid-svg-icons'

export default class Home extends React.Component {
    render() {
        return (
            <div>
                <header id="home-header">
                    <div id="home-header-content">
                        <FontAwesomeIcon id="home-header-logo" icon = { faCalendar } />
                        <h1 id="home-header-title"><span style={{color: "#FFD100", "letter-spacing": 0}}>Bruin</span>Planner</h1>
                        <nav id="home-header-navigation">
                            <a>ABOUT</a>
                            <a>CONTACT</a>
                            <button className="home-header-buttons"><a style={{color: "#FFD100"}}>SIGN UP</a></button>
                            <button className="home-header-buttons"><a style={{color: "#2774AE"}}>LOG IN</a></button>
                        </nav>
                    </div>
                </header>
                <section style={{"textAlign":'center', display:"block"}}>
                    <div id="home-section-content"> 
                        <h2 id="home-section-title">Lorem ipsum dolor sit amet, consetetur tempor meow meow meow
                            invidunt ut labore et dolore</h2>
                        <p id="home-section-description"> 
                            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
                            invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et 
                            accusam et justo duo dolores et ea rebum. et justo duo dolores et ea rebum
                        </p>
                        <button className="home-section-button">
                            GET STARTED
                        </button>
                    </div>
                    <img id="home-section-mainimg" src={roycehall} alt="XXX"/>
                    <div></div>
                </section>
                <h1>hi</h1>
            </div>
        )
    }
}