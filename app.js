const express = require('express')
var request = require('request')
const app = express()
const port = 8080

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/course', (req, res) => {
    request("http://api.ucladevx.com/courses", function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var parsedBody = JSON.parse(body);
            var course1 = parsedBody[1]["courseTitle"]
            res.send (course1); //print course1 - Introduction to Computer Science I
        }
    })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})