import React from 'react'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendar, faSignOutAlt, faUser } from '@fortawesome/free-solid-svg-icons'
import '../css/Planner.css'

const terms = ["Year 1 Fall", "Year 1 Winter", "Year 1 Spring", "Year 2 Fall", "Year 2 Winter", "Year 2 Spring", "Year 3 Fall", "Year 3 Winter", "Year 3 Spring", "Year 4 Fall", "Year 4 Winter", "Year 4 Spring" ]

function Course (props) {
    return (
        <div className="planner-class-container"></div>
    )
}

class PlannerQuarters extends React.Component {
    render() {
        return (
            <div className="planner-quarter">
                <h4 className="planner-quarter-title">{this.props.term}</h4>
                <hr className="planner-quarter-line"></hr>
                <Course />
                <Course />
                <Course />
                <Course />
                <Course />
                <Course />
                <Course />
            </div>
        )
    }
}

export default class Account extends React.Component {
    state = {
        username: "Username",
        classSearch: "",
        planner: {
            name: "Planner name",
            major: "Planner major"
        },
        plannerIndex: null,
    }

    logOut = () => {
        axios.delete('/log-out')
        .then( res => {
            if (res.data.redirect === '/log-in')
                window.location='/log-in'
        })
        .catch( err => {
            
            console.error(err)
        })
    }

    render () {
        return (
            <div>
                <div id="planner-sidebar" >
                    <div style={{margin: "2vh 0 4vh 0"}}><a href="/">
                        <h1 id="planner-sidebar-title" className="white"><span className="gold" style={{"letterSpacing": 0}}>Bruin</span>Planner</h1>
                    </a></div>
                    <hr style={{margin: "1vh auto", width: "90%" }}></hr>
                    <a href={"/account/" + this.state.username}><div class="planner-sidebar-content">
                        <h2><FontAwesomeIcon icon={faCalendar}/> Planners</h2>
                    </div></a>
                    <div class="planner-sidebar-content" onClick={this.logOut}>
                        <h2><FontAwesomeIcon icon={faSignOutAlt}/> Log-out</h2>
                    </div>
                    <div id="planner-sidebar-user">
                        <h2><FontAwesomeIcon icon={faUser}/> {this.state.username}</h2>
                    </div>
                </div>
                <section>
                    <div id="planner">
                        <div id="planner-description">
                            <h1 id="planner-title">{this.state.planner.name}, </h1>           
                            <p id="planner-major">{this.state.planner.major}</p>            
                        </div>
                        <div id="planner-container">
                        { terms.map ( term => (
                            <PlannerQuarters term={term}/>
                        ))}
                        </div>
                    </div>
                </section>
                <section>
                    <div id="search-class">
                        <div id="search-class-description">
                            <h1 id="search-class-title">Search for Classes</h1>
                            <input id="search-class-input" placeholder="Search class by course name" value={this.state.classSearch} onChange={ (event) => this.setState({ classSearch: event.target.value })}></input>
                        </div>

                    </div>
                </section>
            </div>
        )
    }

    componentDidMount () {
        var path = window.location.pathname.split('/')
        var plannerIndex = path[path.length - 1]//get planner number from url
        var accountUsername = path[path.length - 3] //get account username from url
        console.log (plannerIndex)
        console.log (accountUsername)

        axios.get('/getCourses')
        .then ( res => {
            console.log(res.data.allCourses)
        })

        axios.post ('/getPlannerInfo', { "index" : plannerIndex })
        .then ( res => {
            if (res.data.username === accountUsername)
                this.setState ({ username: res.data.username, planner: res.data.plannerInfo, plannerIndex: plannerIndex })
            /*else 
                window.location = '/error'*/
        })
        .catch ( err => {
            window.location = '/'
            console.error(err)
        })
    }
}