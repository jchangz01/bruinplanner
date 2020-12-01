const fetch = require ('node-fetch')

async function getCourseData() 
{
    return new Promise ((resolve, reject) => {
        fetch ('../courselist.json')
        .then ( res => { 
            if ( res.ok ) 
                resolve (res.json()); 
            else 
                console.log("Attempt to retrieve course data failed!")
        })
        .catch( err => console.log(err))
    })
}

module.exports = { getCourseData : getCourseData }