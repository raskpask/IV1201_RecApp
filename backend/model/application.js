module.exports = class Application{
    constructor(availability, applicationDate,competence){
        this.availability = availability;
        this.competence = competence;
        this.applicationDate = applicationDate;
    }
    display() {
        console.log(this.availability[0].startDate + " " + this.competence[0].competenceName);
    }
}
