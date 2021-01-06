import React from 'react'
import axios from  'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendar, faTimes, faCaretDown, faSignOutAlt, faSpinner } from '@fortawesome/free-solid-svg-icons'
import majors from '../assets/api/majors.json'
import '../css/Account.css'


function Message (props)
{
    return (
        props.message ? 
            //key is used to replay our fade-in animation when form is resubmitted
            <div key={props.key} className={props.color === "green" ? "success-green-br" : "error-red-br"} id="message-container" style={{position:"absolute"}}>
                <p id="message-container-content" className="white">{props.message}</p>
            </div> 
            : null
    ) 
}

function PopupPrompt (props) {
    return (
    <React.Fragment>
        <div className="popup-box">
            <div className="popup-box" onClick={props.handleClose} ></div>
            <form onSubmit={props.handleSubmit} className="box">
                <h2 id="popup-box-title">{props.title}</h2>
                    <hr></hr>
                <label className="popup-box-field">Planner Name:</label>
                <input className="popup-box-input" placeholder="My Planner" value={props.name} onChange={ props.nameChange } required></input>
                <label className="popup-box-field">Major:</label>
                <select className="popup-box-input" defaultValue="" value={props.major} onChange={ props.majorChange } required>
                    <option value="">Select a Major . . .</option>
                    {majors.map ( (major, index) => {
                        return (
                            <option key={index}>{major}</option>
                        ) 
                    })}
                </select>
                <button className="popup-box-submit blue-br">{props.action}</button>
            </form>
        </div>
    </React.Fragment>
    );
  };

class Planners extends React.Component {
    navigateToPlanner = event => {
        console.log(this.props.index)
        console.log(this.props.plan)
        this.props.history.push ({ pathname: window.location.pathname + '/planner/' + this.props.index , state: { planner: this.props.plan, plannerNumber: this.props.index }})
    }

    render () {
        const width = this.props.deleteMode ? "90%" : "100%"
        return (
            <React.Fragment>
                {this.props.deleteMode ? <FontAwesomeIcon icon={faTimes} class="delete-mode-icon" onClick={this.props.handleDelete}/>  : null }
                <li className="account-main-planner" value={this.props.index} style={{width: width}} onClick={this.props.modifyMode ?  this.props.modifySelected : this.navigateToPlanner}>
                    <div className="account-main-plan-name">{this.props.plan.name}</div>
                    <div className="account-main-plan-major">{this.props.plan.major}</div>
                </li>
            </React.Fragment>
        )
    }
}

export default class Account extends React.Component {
    state = ({
        username: "",
        createMode: false,
        modifyMode: false,
        modifySelected: null, //tracks position/index of planner selected to be modified
        deleteMode: false,
        plannerList: [], //keeps full list of planners
        plannerName: "",
        plannerMajor: "",
        message: "",
        messageColor: "red",
        fetchingForInitialData: true,
        updateKey: 0 //used to update and rerender states that don't change
    })  

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

    createPlanner = event => {
        event.preventDefault();
        const data = {
            name: this.state.plannerName,
            major: this.state.plannerMajor,
        }
        axios.post('/create-planner', data)
        .then( res => {
            this.props.history.push ({ pathname: window.location.pathname + '/planner/' + res.data.index })
        })
        .catch ( err => {
            this.setState({message: "An error occured when creating new planner", messageColor: "red", updateKey: this.state.updateKey + 1,})
            console.log(err)
        })
    }

    modifyPlanner = event => {
        event.preventDefault();
        const data = {
            name: this.state.plannerName,
            major: this.state.plannerMajor,
            plannerIndex: this.state.modifySelected,
        }
        
        axios.post('/modify-planner', data) 
        .then ( res => {
            const planners = this.state.plannerList.slice() //copy the plannerList array
            planners[data.plannerIndex].name = data.name; //execute the manipulations
            planners[data.plannerIndex].major = data.major; //execute the manipulations
            this.setState({
                plannerList: planners, 
                modifySelected: null, 
                plannerName: "", 
                plannerMajor: "", 
                message: "Selected planner has been successfully modified", 
                messageColor: "green",
                updateKey: this.state.updateKey + 1,
            }) //set the new state
        })
        .catch ( err => {
            console.error(err)
            this.setState({message: "An error occured when modifying existing planner", messageColor: "red", updateKey: this.state.updateKey + 1,})
        })
    }

    deletePlanner = index => {
        console.log("Planner position: " + index)
        const data = {
            plannerIndex: index
        }
        axios.post('/delete-planner', data)
        .then ( res => {
            const planners = this.state.plannerList.slice() //copy the plannerList array
            planners.splice(data.plannerIndex, 1)
            this.setState ({ plannerList: planners, message: "Selected planner has been successfully deleted", messageColor: "green", updateKey: this.state.updateKey + 1,})
        })
        .catch ( err => {
            console.error(err)
            this.setState({message: "An error occured when deleting existing planner", messageColor: "red", updateKey: this.state.updateKey + 1,})
        })
    }

    toggleMode = (mode) => {
        this.setState ({
            createMode: mode === "create" ? !this.state.createMode : false,
            modifyMode: mode === "modify" ? !this.state.modifyMode : false,
            modifySelected: null,
            deleteMode: mode === "delete" ? !this.state.deleteMode : false,
            plannerName: "",
            plannerMajor: ""
        })
    }

    render () {
        /* Create popup prompts when createMode or modifyMode is active */
        var createPrompt, modifyPrompt = null;
        if (this.state.createMode) {
            createPrompt = <PopupPrompt 
            title="Create New Planner"
            action="Create" 
            name={this.state.plannerName} 
            nameChange={ event => this.setState({plannerName: event.target.value })} 
            major={this.state.plannerMajor} 
            majorChange={ event => this.setState({plannerMajor: event.target.value })} 
            handleClose={() => this.toggleMode("create")} 
            handleSubmit={this.createPlanner}
            /> 
        }
        else if (this.state.modifyMode && this.state.modifySelected !== null) {
            modifyPrompt = <PopupPrompt 
                title="Modify Existing Planner"
                action="Modify" 
                name={this.state.plannerName} 
                nameChange={ event => this.setState({plannerName: event.target.value })} 
                major={this.state.plannerMajor} 
                majorChange={ event => this.setState({plannerMajor: event.target.value })} 
                handleClose={() => this.toggleMode("modify")} 
                handleSubmit={this.modifyPlanner}
            /> 
        }

        return (
            <div>
                {this.state.fetchingForInitialData ? <div className="loading-overlay"><FontAwesomeIcon className="spin" style={{fontSize: "18vw", color: "#8BB8E8"}} icon={faSpinner}/></div> : null }
                <div>
                    <header id="account-header">
                        <div id="account-header-content">
                            <span><a href="/">
                                <FontAwesomeIcon id="account-header-logo" icon = { faCalendar } />
                                <h1 id="account-header-title" className="blue"><span className="gold" style={{"letterSpacing": 0}}>Bruin</span>Planner</h1>
                            </a></span>
                            <nav id="account-header-userinfo">
                                <div className="dropdown">
                                    <button className="account-header-userinfo-buttons blue">
                                        {this.state.username} <FontAwesomeIcon icon={faCaretDown}/>    
                                    </button>
                                    <div className="dropdown-content">
                                        <div onClick={this.logOut}>Log-out <FontAwesomeIcon icon={faSignOutAlt}/></div>
                                    </div>
                                </div>
                            </nav>
                        </div>
                    </header>
                    <Message key={this.state.updateKey} color={this.state.messageColor} message={this.state.message}></Message>
                    {createPrompt} {/*Prompt to create a planner*/}
                    {modifyPrompt} {/*Prompt to modify a planner*/}
                    <section>
                        <div id="account-main-content">
                            <h2 id="account-main-heading">Welcome <span style={{textDecoration: 'underline'}}>{this.state.username}</span>!</h2>
                            <h3 id="account-main-subheading">Modify, create, and delete your UCLA Planners here</h3>
                            <div id="account-main-buttons">
                                <button className="account-main-button" onClick={() => this.toggleMode("create")}>Create</button>
                                <button className={this.state.modifyMode ? "account-main-button selected":"account-main-button"} onClick={() => this.toggleMode("modify")}>Modify</button>
                                <button className={this.state.deleteMode ? "account-main-button selected":"account-main-button"} onClick={() => this.toggleMode("delete")}>Delete</button>
                            </div>
                            <ul id="account-main-planners">
                            {(this.state.plannerList || []).map((plan, index) => (
                                <Planners 
                                    plan={plan} 
                                    index={index}  
                                    history={this.props.history} 
                                    modifyMode={this.state.modifyMode} 
                                    modifySelected={() => this.setState({ plannerName: this.state.plannerList[index].name, plannerMajor: this.state.plannerList[index].major,  modifySelected: index})} 
                                    deleteMode={this.state.deleteMode}
                                    handleDelete={() => this.deletePlanner(index)}
                                />
                            ))}
                            </ul>
                        </div>
                    </section>
                </div>
            </div>
        )
    }

    componentDidMount () {
        var path = window.location.pathname
        var accountUsername = path.split('/').pop()
        axios.get ('/getUserInfo')
        .then ( res => {
            if (res.data.username === accountUsername)
                this.setState ({ username: res.data.username, plannerList: res.data.planners, fetchingForInitialData: false })
            else 
                window.location = '/error'
        })
        .catch ( err => {
            window.location = '/error'
            console.error(err)
        })
    }
}