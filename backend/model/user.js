module.exports = class User{
    /**
     *Creates an instance of User.
     * @param {*} username
     * @param {*} password
     * @param {*} email
     * @param {*} date
     * @param {*} firstName
     * @param {*} lastName
     * @param {*} personID
     * @param {*} privilegeLevel
     * @param {*} token
     */
    constructor(username,password,email,date,firstName,lastName,personID,privilegeLevel,token){
        this.username = username;
        this.password = password;
        this.email = email;
        this.date = date;
        this.firstName = firstName;
        this.lastName = lastName;
        this.personID = personID;
        this.privilegeLevel = privilegeLevel;
        this.token = token;
    }
    display() {
        console.log(this.firstName + " " + this.lastName);
    }
}
