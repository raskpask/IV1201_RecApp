module.exports = class Application{
    /**
     *Creates an instance of Application.
     * @param {int} applicationID - Application ID
     * @param {List} availability - List of available dates.
     * @param {Date} applicationDate - Date when the application was made.
     * @param {List} competence - List of comepetences that the applciation has
     * @param {String} name - The name of the user who made the application
     */
    constructor(applicationID, availability, applicationDate,competence,name){
        this.applicationID = applicationID;
        this.availability = availability;
        this.competence = competence;
        this.applicationDate = applicationDate;
        this.name = name;
    }
    display() {
        console.log(this.availability[0].startDate + " " + this.competence[0].competenceName);
    }
}
