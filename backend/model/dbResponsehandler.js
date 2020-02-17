/**
 * Extracts the applications from the DB request into a list of instances of the Applciation object.
 *
 * @param {String} rows - Response from the DB.
 * @returns List of Applications
 */
function extractApplication(rows, competences) {
    let competenceNames = [];
    competences.forEach(competence => {
        competenceNames[competence.competence_id] = competence.name;
    });
    let applicationID = rows[0].application_id;
    let applicationList = [];
    let indexCompetence = 0;
    let indexAvailability = 0;
    let tempApplication = {
        lastEdited: (rows[0].last_edited === null) ? "-" : rows[0].last_edited,
        dateOfSubmission: (JSON.stringify(rows[0].time_of_submission)).split('T')[0].split('"')[1],
        status: rows[0].status,
        firstName: rows[0].firstname,
        lastName: rows[0].surname,
        dateOfBirth: rows[0].ssn,
        id: rows[0].application_id,
        competence: [
            {
                name: competenceNames[rows[0].competence_id],
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
        if (checkIfNotExistsInCompetence(competenceNames[element.competence_id], tempApplication.competence, competenceNames)) {
            indexCompetence++;
            tempApplication.competence[indexCompetence] = { name: competenceNames[element.competence_id], yearsOfExperience: element.years_of_experience };
        }
        if (checkIfNotExistsInAvailability(element.startdate, element.enddate, tempApplication.availability)) {
            indexAvailability++;
            tempApplication.availability[indexAvailability] = { startDate: element.startdate, endDate: element.enddate };
        }
        if (!(element.application_id === applicationID)) {
            applicationList.push(JSON.stringify(tempApplication));
            tempApplication.dateOfSubmission = (JSON.stringify(element.time_of_submission)).split('T')[0].split('"')[1]
            tempApplication.firstName = element.firstname;
            tempApplication.lastName = element.surname;
            tempApplication.dateOfBirth = element.ssn;
            tempApplication.status = element.status;
            tempApplication.id = element.application_id;
            tempApplication.lastEdited = (element.last_edited === null) ? "-" : element.last_edited;
            applicationID = element.application_id;
            indexAvailability = 0;
            indexCompetence = 0;
            tempApplication.competence = [
                {
                    name: competenceNames[element.competence_id],
                    yearsOfExperience: element.years_of_experience
                }
            ];
            tempApplication.availability = [
                {
                    startDate: element.startdate,
                    endDate: element.enddate
                }
            ];
        }

    });
    applicationList.push(JSON.stringify(tempApplication));
    return applicationList;
}

function checkIfNotExistsInCompetence(name, list, competenceNames) {
    for (let element of list) {
        if (name === element.name) {
            return false
        }
    }
    return true;
}

function checkIfNotExistsInAvailability(startDate, endDate, list) {
    for (let element of list) {
        if (JSON.stringify(startDate).split("GMT")[0].split('T')[0] === JSON.stringify(element.startDate).split("GMT")[0].split('T')[0] || endDate == element.endDate) {
            return false;
        }
    }
    return true;
}
module.exports = {
    extractApplication,
}