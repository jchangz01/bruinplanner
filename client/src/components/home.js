import React from 'react'
import '../css/home.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendar } from '@fortawesome/free-solid-svg-icons'

export default class Home extends React.Component {
    render() {
        return (
            <header id="home-header">
                <div id="home-header-content">
                    <FontAwesomeIcon id="home-header-logo" icon = { faCalendar } />
                    <h1 id="home-header-title"><span style={{color: "#FFD100", "letter-spacing": 0}}>Bruin</span>Planner</h1>
                    <nav id="home-header-navigation">
                        <a>ABOUT</a>
                        <a>CONTACT</a>
                        <button><a>SIGN UP</a></button>
                        <button><a>LOG IN</a></button>
                    </nav>
                </div>
            </header>
        )
    }
}