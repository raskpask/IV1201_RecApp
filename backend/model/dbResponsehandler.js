function extractApplication(rows) {
    console.log(rows)
    let applicationID = rows[0].application_id;
    let applicationList = [];
    let indexCompetence = 0;
    let indexAvailability = 0;
    let tempApplication = {
        lastEdited: (rows[0].last_edited === null) ? "-" :rows[0].last_edited,
        dateOfSubmission: rows[0].time_of_submission,
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
            // console.log("adds to list")
            tempApplication.competence[indexCompetence] = { name: element.name, yearsOfExperience: element.years_of_experience };
            indexCompetence++;
        }
        if (checkIfNotExistsInAvailability(element.startdate, element.enddate, tempApplication.availability)) {
            tempApplication.availability[indexAvailability] = { startDate: element.startdate, endDate: element.enddate };
            indexAvailability++;
        }
        if (!(element.application_id === applicationID)) {
            applicationList.push(tempApplication);
            tempApplication.dateOfSubmission = element.time_of_submission
            tempApplication.firstName = element.firstname;
            tempApplication.lastName = element.surname;
            tempApplication.dateOfBirth = element.ssn;
            tempApplication.status = element.status;
            tempApplication.lastEdited = (element.last_edited === null) ? "-": element.last_edited;
            applicationID = element.application_id;
            tempApplication.competence = [];
            tempApplication.availability = [];
        }

    });
    applicationList.push(tempApplication);
    return applicationList;
}
function checkIfNotExistsInCompetence(name, list) {
    // console.log(name)
    // console.log(list)
    list.forEach(element => {
        if (name === element.name) {
            // console.log("does exist")
            return false;
        }
    })
}
function checkIfNotExistsInAvailability(startDate, endDate, list) {
    list.forEach(element => {
        if (startDate === element.startDate || endDate === element.endDate) {
            return false;
        }
    })
}
module.exports = {
    extractApplication,

}