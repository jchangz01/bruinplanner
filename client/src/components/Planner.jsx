import React from 'react'
import axios from 'axios'
import { DndProvider, useDrag, useDrop } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendar, faSignOutAlt, faSpinner, faUser, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import '../css/Planner.css'

const terms = ["Year 1 Fall", "Year 1 Winter", "Year 1 Spring", "Year 2 Fall", "Year 2 Winter", "Year 2 Spring", "Year 3 Fall", "Year 3 Winter", "Year 3 Spring", "Year 4 Fall", "Year 4 Winter", "Year 4 Spring" ]


function Course (props) {
    const [{ isDragging }, drag] = useDrag({
        item: { 
            type: props.type,
            name: props.courseName,
            id: props.courseID,
            allCourseIndex: props.courseIndex, //position of course within the master course list
            removeFrom: props.displayedCourses, //we will remove the course from the array passed by this list or string property to a list to take the course-box out of display
            removeFromIndex: props.displayedCoursesIndex //course index within the array specified in removeFrom
        },
        collect: monitor => ({
            isDragging: !!monitor.isDragging() //if dragging is detected, return true in isDragging 
        })
    })
    

    return (
        <div className="course-box" ref={drag} 
            style={ props.type === 'searchCourse' ? {backgroundColor: "white", opacity: isDragging ? 0.5 : 1, cursor: 'move'} 
            : { opacity: isDragging ? 0.5 : 1, cursor: 'move' }}>

            <h2 className="course-id">{props.courseID}</h2>
            <p className="course-name">{props.courseName}</p>
        </div>
    )
}

function RecylingBin (props) {
  
    const [{ isOver }, drop] = useDrop({
        accept: 'plannerCourse',
        drop: item => {
            props.removeClass(item.removeFrom, item.removeFromIndex)
        },
        collect: monitor => ({
            isOver: !!monitor.isOver() 
        }),
        
    })

    return (
        <div id="planner-sidebar-recycling-area" ref={drop} style={isOver ? {backgroundColor: "#d11a2a"} : null}>
            <FontAwesomeIcon id="planner-sidebar-recycling-bin" icon={faTrashAlt} style={isOver ? {color: "white"} : null}/>
        </div>
    )
}


function PlannerQuarters (props) {
    const [{ isOver }, drop] = useDrop({
        accept: ['plannerCourse', 'searchCourse'],
        drop: item => {
            if (item.type === 'plannerCourse') {
                props.alterClass (item.removeFrom, item.removeFromIndex, props.term, item.name, item.id )
            }
            else {  
                props.addClass (props.termClasses, item.name, item.id, item.allCourseIndex, item.removeFrom, item.removeFromIndex)
            }
        },
        collect: monitor => ({
            isOver: !!monitor.isOver(), //if dragged object is hovering over dropzone, return true in isOver
        }), 
    })

    return (    
    <div ref={drop} className="planner-quarter" style={isOver ? {backgroundColor: "white"} : null}>
        <h4 className="planner-quarter-title">{props.term}</h4>
        <hr className="planner-quarter-line"></hr>
        { (props.termClasses || []).map ( (course, index) => (
            <Course courseID={course.courseID} courseName={course.courseName} type='plannerCourse' displayedCourses={props.term} displayedCoursesIndex={index}/>
        ))}
    </div>
    )
}

class SearchCourses extends React.Component {
    static defaultProperty = {
        courses: []
    };
    constructor(props) {
        super(props);
        this.state = {
        filteredCourses: [],
        showCourses: false,
        userInput: ""
        };
    }

    onChange = event => {
        const { courses } = this.props;
        const userInput = event.currentTarget.value;

        const filteredCourses = []
        var i = 0;
        var filteredCoursesCount = 0;
        while (filteredCoursesCount < 36 && i < courses.length)
        {
            if (courses[i].courseName.toLowerCase().indexOf(userInput.toLowerCase()) > -1)
            {
                filteredCourses[filteredCoursesCount] = courses[i]
                filteredCourses[filteredCoursesCount].courseIndex = i;
                filteredCoursesCount++
            }
            i++;
        }
        console.log(filteredCourses)
        this.setState({
            filteredCourses,
            showCourses: true,
            userInput: event.currentTarget.value
        });
    };
    
    
    render () {
        const {
            state: {
                filteredCourses,
                showCourses,
                userInput
            }
            } = this;
            var courseListComponent = (<div id="search-class-container"></div>);
            if (showCourses && userInput) {
            if (filteredCourses.length) {
                courseListComponent = (
                <div id="search-class-container">
                    {filteredCourses.map((course, index) => {
                        return (
                            <div class="search-class-course-container">
                                <Course courseName={course.courseName} courseID={course.courseID} type='searchCourse' courseIndex={course.courseIndex} displayedCourses={filteredCourses} displayedCoursesIndex={index}/>
                            </div>
                        );
                    })}
                </div>
                );
            } else {
                courseListComponent = (
                <div className="search-class-noMatch">
                    <em>Search result does not match our courses</em>
                </div>
                );
            }
        }
        return ( 
            <div id="search-class">
                <div id="search-class-description">
                    <h1 id="search-class-title">Search for Classes </h1>
                    <p id="search-class-title-des">(MAX 36 classes displayed per search)</p>
                    <input type="search" id="search-class-input" placeholder="Search class by course name" value={this.state.userInput} onChange={this.onChange}></input>
                </div>
                
            {courseListComponent}
            </div>
        )
    }
}

class PlannerSaveButton extends React.Component {
    state = {
        loading: false,
        error: false,
        success: false,
    }
    
    savePlanner = () => {
        this.setState({loading: true, error: false, success: false})
        const data = {
            planner: this.props.planner,
            plannerIndex: this.props.plannerIndex
        }
        axios.post ('/savePlanner', data)
        .then ( res=> {
            if (res.data.result === 'saved')
                this.setState({loading: false, success: true})
            else
                this.setState({loading: false, error: false})
        })
        .catch ( err => {
            this.setState({loading: false, error: false})
        })
    }

    render() {
        return (
            <div id="planner-save-button-container">
                { this.state.error ? 
                    <span class="planner-save-button-message error-red">An error occured when saving your planner</span> : null
                }
                { this.state.success ?
                    <span class="planner-save-button-message success-green">Your plan was successfully saved!</span> : null
                }
                { this.state.loading ? 
                <button id="planner-save-button">
                    Saving <FontAwesomeIcon className="spin" icon={faSpinner} />
                </button>
                : <button id="planner-save-button" onClick={this.savePlanner}>Save Planner</button>
                }
            </div>
        )
    }
}


export default class Account extends React.Component {
    state = {
        username: "Username",
        planner: {
            name: "Planner name",
            major: "Planner major",
            "Year 1 Fall": [],
            "Year 1 Winter": [],
            "Year 1 Spring": [],
            "Year 2 Fall": [], 
            "Year 2 Winter": [], 
            "Year 2 Spring": [],
            "Year 3 Fall": [],
            "Year 3 Winter": [],
            "Year 3 Spring": [],
            "Year 4 Fall": [],
            "Year 4 Winter": [],
            "Year 4 Spring": [],
        },
        plannerIndex: null,
        allCourses: [],
        fetchingForInitialData: true
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

    addClassToPlanner = (quarter, name, id, allCourseIndex, displayedCourses, displayedCoursesIndex) => {
        quarter.push({courseID: id, courseName: name}) //add course to the specified quarter

        displayedCourses.splice(displayedCoursesIndex, 1) //remove course from search box display

        var allCoursesCopy = this.state.allCourses.slice();
        console.log(allCoursesCopy[allCourseIndex])
        console.log(allCourseIndex)
        allCoursesCopy.splice(allCourseIndex, 1)
        this.setState({ allCourses: allCoursesCopy }) //remove course from master course list
    }

    alterClassInPlanner = (quarterFrom, quarterFromIndex, quarterTo, name, id) => {
        let plannerCopy = Object.assign({}, this.state.planner);
        plannerCopy[quarterFrom].splice (quarterFromIndex, 1) //remove course from the quarter that originally held the class
        plannerCopy[quarterTo].push ({courseID: id, courseName: name}) //add course to the specified planner
        this.setState({ planner: plannerCopy })
    }

    removeClassFromPlanner = (quarterFrom, quarterFromIndex) => {
        let plannerCopy = Object.assign({}, this.state.planner);
        let recycledCourse = plannerCopy[quarterFrom][quarterFromIndex]; 
        plannerCopy[quarterFrom].splice (quarterFromIndex, 1) //remove course from the quarter that originally held the class

        var allCoursesCopy = this.state.allCourses.slice();
        allCoursesCopy.push(recycledCourse)
        this.setState({ planner: plannerCopy, allCourses: allCoursesCopy })
    }

    render () {
        return (
            <div>
                {this.state.fetchingForInitialData ? <div className="loading-overlay"><FontAwesomeIcon className="spin" style={{fontSize: "18vw", color: "#8BB8E8"}} icon={faSpinner}/></div> : null }
                <DndProvider backend={HTML5Backend}>
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
                        <RecylingBin removeClass={this.removeClassFromPlanner}/>
                        <div id="planner-sidebar-user">
                            <h2><FontAwesomeIcon icon={faUser}/> {this.state.username}</h2>
                        </div>
                    </div>
                    <section>
                        <div id="planner">
                            <div id="planner-description">
                                <h1 id="planner-title">{this.state.planner.name}, </h1>           
                                <p id="planner-major">{this.state.planner.major}</p>  
                                <PlannerSaveButton planner={this.state.planner} plannerIndex={this.state.plannerIndex} />
                            </div>
                            <div id="planner-container">
                            { terms.map ( term => (
                                <PlannerQuarters updateKey={this.state.updateKey} addClass={this.addClassToPlanner} alterClass={this.alterClassInPlanner} term={term} termClasses={this.state.planner[term]}/>
                            ))}
                            </div>
                        </div>
                    </section>
                    <section>
                        <SearchCourses courses={this.state.allCourses}/>
                    </section>
                </DndProvider>
            </div>
        )
    }

    componentDidMount () {
        var path = window.location.pathname.split('/')
        var plannerIndex = path[path.length - 1]//get planner number from url
        var accountUsername = path[path.length - 3] //get account username from url

        axios.post ('/getPlannerInfo', { "index" : plannerIndex })
        .then ( res => {
            if (res.data.username === accountUsername)
                this.setState ({ username: res.data.username, planner: res.data.plannerInfo, plannerIndex: plannerIndex })
            else 
                window.location = '/error'
        })
        .catch ( err => {
            window.location = '/'
            console.error(err)
        })
        
        axios.post('/getFilteredCourses', {"index" : plannerIndex })
        .then ( res => {
            console.log( res.data.filteredCourses )
            this.setState({ allCourses: res.data.filteredCourses, fetchingForInitialData: false })
        })
        .catch ( err => {
            window.location = '/'
            console.error(err)
        })
    }
}