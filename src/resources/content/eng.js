function getLanguage() {
    const lang = {
        access: {
            message: "You do not have the access rights for this page! Login or get higher privilege from admin"
        },
        home: {
            message: "If you don't have username and password please contact the admin to obtain them.",
            tel: "Tel: 0701238274",
            mail: "Mail: admin@iv1201.se"
        },
        register: {
            register: "Register",
            username: {
                name: "Username",
                placeholder: "Enter username"
            },
            password: {
                name: "Password",
                placeholder: "Enter Password",
            },
            email: {
                name: "Email",
                placeholder: "Enter Email"
            },
            date: {
                name: "Date of birth",
                placeholder: "Enter date of birth"
            },
            firstName: {
                name: "First Name",
                placeholder: "Enter first name"
            },
            lastName: {
                name: "Last Name",
                placeholder: "Enter last name"
            }
        },
        header: {
            home: "Home",
            applications: "Applications",
            apply: "Apply",
            login: "Login",
            logout: "Logout",
            language: "Language",
            register: "Register",
            username: "Username",
            password: "Password",
            profile: "Your profile",
            swe: "SWE",
            eng: "ENG",
            loginError: "Invaild password/username"

        },
        validationError: {
            emptyField: {
                message: "Please fill in this field"
            },
            noMatchPassword: {
                message: "Passwords do not match"
            },
            toLongField: {
                message: "FIELD is to long(maximum is MAXNUM characters)"
            },
            toShortField: {
                message: "FIELD is to short(minimum is MINNUM characters)"
            },
            notValidField: {
                message: "Please enter a valid FIELD"
            },
            invalidCharacters: {
                message: "FIELD contains invalid characters"
            },
            notUnicode: {
                message: "Please only use Unicode characters"
            },
            duplicateUsername: {
                message: "This username already exists, try another username"
            },
            notNumber: {
                message: "You must specify a  valid number"
            },
            competenceTypeNotChoosen: {
                message: "Pleace choose a compitence from the list"
            },
            alreadyHasApplication: {
                message: "You have already created a application. You may not create any more appications."
            },
            bothCompAndAvailMissing: {
                message: "Please specify a compitence and a availibility"
            },
            compMissing: {
                message: "Please specify a compitence"
            },
            availMissing: {
                message: "Please specify a availibility date"
            },
            availEmpty:{
                message: "Please give a valid availibility date"
            },
        },
        listApplications: {
            firstName: "First name",
            lastName: "Last name",
            applicationDate: "Application date",
            moreInfo: "Application info",
            info: "Info",
            competences: "Competences",
            applicationPeriod: "Application period",
            from: "From: ",
            to: "To: ",
            availability: "Availability",
            name: "Name",
            accept: "Accept",
            reject: "Reject",
            close: "Close",
            application: "Application",
            editedMessage: "This applicataion has already been edited by someone else!\n" +
                "The page will be reloaded to see the new status.",
            success: "The application has been changed",
            noApplications: "The filter you used has no matching applications",
            filter: "Filter"

        },
        apply: {
            sumbitError: "You did not use the correct input for the application so it could not be created. Please check the application and try again.",
            buttonCompetences: "Competence:",
            buttonDefaultValue: "Pick a competence",
            buttonAddCompetence: "Add competence",
            textYearsOfExperience: "Years of experience:",
            availabilityButton: "Add availibility",
            sumbitApplication: "Submit application",
            tableCompetence: [
                "Competence",
                "Years of experience"
            ],
            tableAvailability: [
                "Availability",
                "Start date",
                "End date",
                "Period "
            ],
        },

        user: [
            {
                name: "Username: ",
                placeholder: "Enter username"
            },
            {
                name: "Password: ",
                placeholder: "Enter Password",
            },
            {
                name: "Email: ",
                placeholder: "Enter Email"
            },
            {
                name: "Date of birth: ",
                placeholder: "Enter date of birth"
            },
            {
                name: "First Name: ",
                placeholder: "Enter first name"
            },
            {
                name: "Last Name: ",
                placeholder: "Enter last name"
            },
            {
                name: "Welcome "
            },
            {
                availability: "Availability",
                competence: "Competence",
                yearsOfExperience: "Years of experience",
                to: " to ",
                dateOfSubmission: "Date of submission: ",
                status: "Status: ",
                lastEdited: "Last edited:  ",
                firstName: "First name: ",
                lastName: "Last name: ",
                dateOfBirth: "Date of birth: ",
                info: "Info"
            },
            {
                status0: "Unhandled",
                status1: "Accepted",
                status2: "Rejected",
                statuselse: "Status Loading/Error"
            },
            {
                noApplicationMessage: "This is where your application will be displayed when you create one."
            }
        ],
        general: {
            loading: "Loading...",
            error: "oops something went wrong!"
        }
    }
    return lang;
}
module.exports = {
    getLanguage,
}