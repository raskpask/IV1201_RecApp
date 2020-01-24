module.exports = class User{
    constructor(username,password,email,date,firstName,lastName){
        this.username = username;
        this.password = password;
        this.email = email;
        this.date = date;
        this.firstName = firstName;
        this.lastName = lastName;
    }
    display() {
        console.log(this.firstName + " " + this.lastName);
    }
}
