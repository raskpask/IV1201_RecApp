module.exports = class Application{
    constructor(availability, applicationDate,competence,status){
        this.availability = availability;
        this.applicationDate = applicationDate;
        this.competence = competence;
        this.status = status;
    }
    display() {
        console.log(this.date + " " + this.name);
    }
}
