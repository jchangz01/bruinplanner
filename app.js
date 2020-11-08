const express = require('express')
const { reset } = require('nodemon')
var request = require('request')
const app = express()
const port = 8080

//maps a major to appropriate courses
const majorToCourse = new Map();
//maps courses to their course numbers
const courseToCourseNum = new Map();

//Retrieve and filter API data to courseNames, courseNumbers, and courseMajors
request("http://api.ucladevx.com/courses", function (error, response, body) {
    if (!error && response.statusCode == 200) {
        var parsedBody = JSON.parse(body);
        var removeDuplicates = new Set();

        for (var i = 0; i < parsedBody.length; i++)
        {
            if (!courseToCourseNum.get(parsedBody[i]["courseTitle"]))
            {
                let generalCourseNum = parsedBody[i]["courseNum"].replace(/-.*/g, '')

                courseToCourseNum.set(parsedBody[i]["courseTitle"], generalCourseNum)

                if (majorToCourse.get(parsedBody[i]["major"]))
                    majorToCourse.get(parsedBody[i]["major"]).push(parsedBody[i]["courseTitle"])
                else    
                    majorToCourse.set(parsedBody[i]["major"], [parsedBody[i]["courseTitle"]])
            }
        }
    }
})

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/course', (req, res) => {
    res.send(majorToCourse.get("COM SCI"))
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})