var plannerStructure = {
    name: "",
    major: "",
    yr1Fall: [],
    yr1Winter: [],
    yr1Spring: [],
    yr2Fall: [],
    yr2Winter: [],
    yr2Spring: [],
    yr3Fall: [],
    yr3Winter: [],
    yr3Spring: [],
    yr4Fall: [],
    yr4Winter: [],
    yr4Spring: [],
}

function getPlannerStructure () {
    return Object.assign({}, plannerStructure) //returns a copy of plannerStructure by value 
}

module.exports = { getPlannerStructure : getPlannerStructure }