module.exports = class Application{
    constructor(date,competence,name,status){
        this.date = date;
        this.competence = competence;
        this.name = name;
        this.status = status;
    }
    display() {
        console.log(this.date + " " + this.name);
    }
}
