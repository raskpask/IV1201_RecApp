function getLanguage() {
    const lang = {
        access: {
            message: "Du har inte tillgång till denna sida logga in för att få åtkomst"
        },
        register: {
            register: "Registrera",
            username: {
                name: "Användarnamn",
                placeholder: "Fyll i användarnamn"
            },
            password: {
                name: "Lösenord",
                placeholder: "Fyll i lösenord",
            },
            email: {
                name: "Mail",
                placeholder: "Fyll i mail"
            },
            date: {
                name: "Födelsedag",
                placeholder: "Fyll i födelsedag"
            },
            firstName: {
                name: "Förnamn",
                placeholder: "Fyll i förnamn"
            },
            lastName: {
                name: "Efternamn",
                placeholder: "Fyll i efternamn"
            }
        },
        header: {
            home: "Hem",
            applications: "Ansökningar",
            apply: "Ansök",
            login: "Logga in",
            logout: "Logga ut",
            language: "Språk",
            register: "Registrera",
            username: "Användarnamn",
            password: "Lösenord",
            profile: "Min profil",
            swe: "SWE",
            eng: "ENG"

        },
        validationError: {
            emptyField: {
                message: "Fyll i fältet"
            },
            noMatchPassword: {
                message: "Lösenorden matchar inte"
            },
            toLongField: {
                message: "Fältet är för långt(max antal tecken är MAXNUM)"
            },
            toShortField: {
                message: "Fältet är för kort(minsta antal tecken är MINNUM)"
            },
            notValidField: {
                message: "Fyll i korrekt FIELD"
            },
            invalidCharacters: {
                message: "FIELD innehåller felaktiga tecken"
            },
            notUnicode: {
                message: "Använda endast Unicode tecken"
            }
        },
        listApplications: {
            firstName: "Förnamn",
            lastName: "Efternamn",
            applicationDate: "Ansökningsdatum",
            moreInfo: "Ansöknignsinfo",
            info: "Information",
            competences: "Kompetenser",
            applicationPeriod: "Ansökinginsperiod",
            from: "Från: ",
            to: "Till: ",
            availability: "Tillgänglighet",
            name: "Namn",
            accept: "Acceptera",
            reject: "Avböj",
            close: "Stäng",
            application: "Ansökan"

        },
        apply: {
            buttonCompetences: "Kompetens:",
            buttonDefaultValue: "Välj en kompetens",
            buttonAddCompetence: "Lägg till kompetens",
            textYearsOfExperience: "År av erfarnehet: ",
            availabilityButton: "Lägg till tillgänglighet",
            sumbitApplication: "Skicka ansökan",
            tableCompetence: [
                "Kompetens",
                "År av erfarenhet"
            ],
            tableAvailability: [
                "Tillgänglighet",
                "Start datum",
                "Slut datum",
                "Period "
            ],
        },

        user: [
            {
                name: "Användarnamn: ",
                placeholder: "Fyll i användarnamn"
            },
            {
                name: "Lösenord: ",
                placeholder: "Fyll i lösenord",
            },
            {
                name: "Mail: ",
                placeholder: "Fyll i mail"
            },
            {
                name: "Födelsedag: ",
                placeholder: "Fyll i födelsedag"
            },
            {
                name: "Förnamn: ",
                placeholder: "Fyll i förnamn"
            },
            {
                name: "Efternamn: ",
                placeholder: "Fyll i efternamn"
            },
            {
                name: "Välkommen "
            },
            {
                availability: "Tillgänglighet",
                competence: "Kompetens",
                yearsOfExperience: "År av erfarenhet",
                to: " till ",
                dateOfSubmission: "Ansökningsdatum: ",
                status: "Status: ",
                lastEdited: "Senast redigerad:  ",
                firstName: "Förnamn: ",
                lastName: "Efternamn: ",
                dateOfBirth: "Födelsedag: "
            },
            {
                status0: "Ej hanterad",
                status1: "Accepterad",
                status2: "Avböjd",
                statuselse: "Status Laddar/Fel"
            }
        ]
    }
    return lang;
}
module.exports = {
    getLanguage,
}