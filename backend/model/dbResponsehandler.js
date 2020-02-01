

function extractApplication(rows) {
    console.log(rows)
    let applicationID = rows[0].application_id;
    let applicationList = [];
    let indexCompetence = 0;
    let indexAvailability = 0;
    let indexApplicationList = 0;
    let tempApplication = {
        lastEdited: (rows[0].last_edited === null) ? "-" : rows[0].last_edited,
        dateOfSubmission: (JSON.stringify(rows[0].time_of_submission)).split('T')[0].split('"')[1],
        status: rows[0].status,
        firstName: rows[0].firstname,
        lastName: rows[0].surname,
        dateOfBirth: rows[0].ssn,
        competence: [
            {
                name: rows[0].name,
                yearsOfExperience: rows[0].years_of_experience
            }
        ],
        availability: [
            {
                startDate: rows[0].startdate,
                endDate: rows[0].enddate
            }
        ]

    };
    rows.forEach(element => {
        if (checkIfNotExistsInCompetence(element.name, tempApplication.competence)) {
            // console.log("adds to list:")
            // console.log(element.name)
            indexCompetence++;
            tempApplication.competence[indexCompetence] = { name: element.name, yearsOfExperience: element.years_of_experience };
            // console.log(tempApplication.competence)
        }
        if (checkIfNotExistsInAvailability(element.startdate, element.enddate, tempApplication.availability)) {
            indexAvailability++;
            tempApplication.availability[indexAvailability] = { startDate: element.startdate, endDate: element.enddate };
        }
        if (!(element.application_id === applicationID)) {
            console.log("Adding: ")
            console.log(tempApplication)
            applicationList.push(JSON.stringify(tempApplication));
            console.log("After adding the list looks like this: ")
            console.log(applicationList)
            tempApplication.dateOfSubmission = (JSON.stringify(element.time_of_submission)).split('T')[0].split('"')[1]
            tempApplication.firstName = element.firstname;
            tempApplication.lastName = element.surname;
            tempApplication.dateOfBirth = element.ssn;
            tempApplication.status = element.status;
            tempApplication.lastEdited = (element.last_edited === null) ? "-" : element.last_edited;
            applicationID = element.application_id;
            // indexApplicationList++;
            indexAvailability = 0;
            indexCompetence = 0;
            // console.log(element)
            tempApplication.competence = [
                {
                    name: element.name,
                    yearsOfExperience: element.years_of_experience
                }
            ];
            tempApplication.availability = [
                {
                    startDate: element.startdate,
                    endDate: element.enddate
                }
            ];
            // console.log(tempApplication.competence)
            // console.log(tempApplication.availability)
        }

    });
    console.log("List looks like this before last push:")
    console.log(applicationList)
    console.log("Adding: ")
    console.log(tempApplication)
    applicationList.push(JSON.stringify(tempApplication));
    console.log("sending:")
    console.log(applicationList)
    return applicationList;
}
function checkIfNotExistsInCompetence(name, list) {
    // console.log(name)
    // console.log(list)
    for (let element of list) {
        // console.log("compare element: "+element)
        // console.log(element)
        // console.log("compare: " + element.name + " " + name)
        if (name === element.name) {
            // console.log("does exist")
            return false
        }
    }
    return true;
}
function checkIfNotExistsInAvailability(startDate, endDate, list) {
    for (let element of list) {
        // console.log("compare: "+JSON.stringify(startDate).split("GMT")[0].split('T')[0] +" "+ JSON.stringify(element.startDate).split("GMT")[0].split('T')[0])
        if (JSON.stringify(startDate).split("GMT")[0].split('T')[0] === JSON.stringify(element.startDate).split("GMT")[0].split('T')[0] || endDate == element.endDate) {
            // console.log("equal")
            return false;
        }
    }
    return true;
}
module.exports = {
    extractApplication,

}