var plannerStructure = {
    name: "",
    major: "",
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
}

function getPlannerStructure () {
    return Object.assign({}, plannerStructure) //returns a copy of plannerStructure by value 
}

module.exports = { getPlannerStructure : getPlannerStructure }