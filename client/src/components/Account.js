import React from 'react'
import axios from  'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendar } from '@fortawesome/free-solid-svg-icons'
import '../css/Account.css'

export default class Account extends React.Component {
    state = ({
        username: "",
        plannerList: []
    })
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
                            <button className="account-header-userinfo-buttons blue">{this.state.username}</button>
                        </nav>
                    </div>
                </header>
                <section>
                    <div id="account-main-content">
                        <h2 id="account-main-heading">Welcome {this.state.username}!</h2>
                        <h3 id="account-main-subheading">Modify, create, and delete your UCLA Planners here</h3>
                        <div id="account-main-buttons">
                            <button className="account-main-button">Modify</button>
                            <button className="account-main-button">Create</button>
                            <button className="account-main-button">Delete</button>
                        </div>
                        <div id="account-main-planners">
                            <div className="account-main-planner">Meow</div>
                            <div className="account-main-planner">Meow</div>
                            <div className="account-main-planner">Meow</div>
                            <div className="account-main-planner">Meow</div>
                            <div className="account-main-planner">Meow</div>     
                            
                            <div className="account-main-planner">Meow</div>
                            <div className="account-main-planner">Meow</div>     
                                
                        </div>
                    </div>
                </section>
            </div>
        )
    }

    componentDidMount () {
        console.log('hi')
        axios.get('/getUserInfo')
        .then ( res => {
                this.setState ({ username: res.data.username})
            }
        )
        .catch ( err => {
            console.error (err)
            window.location = '/' //If error, occurs redirect user to homepage
        })
    }
}