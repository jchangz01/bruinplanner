import React from 'react'
import '../css/About.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendar } from '@fortawesome/free-solid-svg-icons'

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
            </div>
        )
    }

}
