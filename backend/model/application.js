module.exports = class Application{
    /**
     *Creates an instance of Application.
     * @param {List} availability - List of dates when the client is available.
     * @param {Date} applicationDate - The date when the appication was submitted.
     * @param {List} competence - List of all the competences of the application.
     * @param {String} name - Name of user who owns the applciation.
     */
    constructor(availability, applicationDate,competence,name){
        this.availability = availability;
        this.competence = competence;
        this.applicationDate = applicationDate;
        this.name = name;
    }
    display() {
        console.log(this.availability[0].startDate + " " + this.competence[0].competenceName);
    }
}
