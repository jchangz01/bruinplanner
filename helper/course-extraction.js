const fetch = require("node-fetch");
const fs = require('fs')

/* Extract course info from devX API */
const majorToCourse = new Map();
const courseToCourseNum = new Map();
const allCourses = []


//Retrieve and filter API data to courseNames, courseNumbers, and courseMajors
/*async function extractCourses () {
    return new Promise ((resolve, reject) => {
        fetch ("http://api.ucladevx.com/courses")
        .then ( async body => {
            if (body.ok) {
                var parsedBody = await body.json();
                for (var i = 0; i < parsedBody.length; i++)
                {
                    if (!courseToCourseNum.get(parsedBody[i].courseTitle))
                    {*/
                        //let generalCourseNum = parsedBody[i].courseNum.replace(/-.*/g, '')
                        /*courseToCourseNum.set(parsedBody[i].courseTitle, generalCourseNum)

                        if (majorToCourse.get(parsedBody[i].major))
                            majorToCourse.get(parsedBody[i].major).push(parsedBody[i].courseTitle)
                        else    
                            majorToCourse.set(parsedBody[i].major, [parsedBody[i].courseTitle])
                    }
                }
                for (let [key, value] of courseToCourseNum) {
                    allCourses.push ({
                        courseName: key,
                        courseID: value
                    })
                }
                var Courses = JSON.stringify(allCourses)
                fs.writeFile("courselist.json", Courses, 'utf8', function (err) {
                    if (err) {
                        console.log("An error occured while writing JSON Object to File.");
                        return console.log(err);
                    }
                
                    console.log("JSON file has been saved.");
                });
                console.log(allCourses)

                resolve();
            }
            else 
                console.log('fail')
        })
    })
}*/

async function extractCourses () {
    return new Promise ((resolve, reject) => {
        fetch ("http://api.ucladevx.com/courses")
        .then ( async body => {
            if (body.ok) {
                var parsedBody = await body.json();
                for (var i = 0; i < parsedBody.length; i++)
                {
                    if (!courseToCourseNum.get(parsedBody[i].courseNum.replace(/-.*/g, '')))
                    {
                        let generalCourseNum = parsedBody[i].courseNum.replace(/-.*/g, '')
                        courseToCourseNum.set(generalCourseNum, parsedBody[i].courseTitle)

                        if (majorToCourse.get(parsedBody[i].major))
                            majorToCourse.get(parsedBody[i].major).push(parsedBody[i].courseTitle)
                        else    
                            majorToCourse.set(parsedBody[i].major, [parsedBody[i].courseTitle])
                    }
                }
                for (let [key, value] of courseToCourseNum) {
                    allCourses.push ({
                        courseName: value,
                        courseID: key
                    })
                }
                var Courses = JSON.stringify(allCourses)
                fs.writeFile("courselist.json", Courses, 'utf8', function (err) {
                    if (err) {
                        console.log("An error occured while writing JSON Object to File.");
                        return console.log(err);
                    }
                
                    console.log("JSON file has been saved.");
                });
                console.log(allCourses)

                resolve();
            }
            else 
                console.log('fail')
        })
    })
}


extractCourses()

//setTimeout(function(){ console.log(courseToCourseNum); }, 8000);

module.exports = { allCourses : allCourses }