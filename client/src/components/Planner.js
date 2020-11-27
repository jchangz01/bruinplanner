import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendar } from '@fortawesome/free-solid-svg-icons'
import '../css/Planner.css'


export default class Account extends React.Component {

    render () {
        return (
            <div>
                <header id="account-header">
                    <div id="account-header-content">
                        <span><a href="/">
                            <FontAwesomeIcon id="account-header-logo" icon = { faCalendar } />
                            <h1 id="account-header-title" className="blue"><span class="gold" style={{"letter-spacing": 0}}>Bruin</span>Planner</h1>
                        </a></span>
                        <nav id="account-header-userinfo">
                            <button className="account-header-userinfo-buttons blue">You are here!</button>
                        </nav>
                    </div>
                </header>
            </div>
        )
    }
}