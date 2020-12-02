const allCourses = require ('../courselist.json') //retrieves an array of objects containing all course names and ids

const terms = ["Year 1 Fall", "Year 1 Winter", "Year 1 Spring", "Year 2 Fall", "Year 2 Winter", "Year 2 Spring", "Year 3 Fall", "Year 3 Winter", "Year 3 Spring", "Year 4 Fall", "Year 4 Winter", "Year 4 Spring" ]

/* Remove courses already contained in the planner being loaded in */
function filterAllCourseData(planner) 
{
    //Store allCourses into a map for faster access time
    let courseMap = new Map();
    let filteredCourses = []
    for (var i = 0; i < allCourses.length; i++) 
        courseMap.set(allCourses[i].courseID, allCourses[i].courseName)
    
    terms.map ( term => {
        for (var i = 0; i < planner[term].length; i++) {
            let courseID = planner[term][i].courseID
            courseMap.delete(courseID)
        }
    })

    for (let [id, name] of courseMap) {
        filteredCourses.push ({
            courseName: name,
            courseID: id
        })
    }
    return (filteredCourses)
}

module.exports = { filterAllCourseData : filterAllCourseData }