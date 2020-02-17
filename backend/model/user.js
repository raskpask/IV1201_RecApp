module.exports = class User{
    /**
     *Creates an instance of User.
     * @param {String} username - Username of the user
     * @param {String} password - Password of the user
     * @param {String} email - Email of the user
     * @param {String} date - Birthday of the user
     * @param {String} firstName - Name of the user
     * @param {String} lastName - Surname of the user
     * @param {int} personID - Person ID of the user
     * @param {int} privilegeLevel - Privilege level of the user
     * @param {String} token - Authorization token of the user
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
