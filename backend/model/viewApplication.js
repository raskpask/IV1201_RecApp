module.exports = class Application{
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
