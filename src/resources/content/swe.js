function getLanguage() {
    const lang = {
        access: {
            message: "Du har inte tillgång till denna sida logga in för att få åtkomst"
        },
        home: {
            message: "Om du inte har något lösenord eller användarnamn var vänligen kontakta admin.",
            tel: "Tel: 0701238274",
            mail: "Mail: admin@iv1201.se"
            
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
            eng: "ENG",
            loginError: "Fel lösenord/användarnamn"

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
            },
            duplicateUsername: {
                message: "Användarnamnet existerar redan, testa ett annat användarnamn"
            },
            notNumber: {
                message: "Du måste specificera ett giltigt nummer"
            },
            competenceTypeNotChoosen: {
                message: "Välj en kompetens från listan"
            },
            alreadyHasApplication: {
                message: "Du har redan skapat en applikation. Du får ej skapa fler applikationer."
            },
            bothCompAndAvailMissing: {
                message: "Var god och skriv in en kompetens och en tillgänglighet"
            },
            availEmpty:{
                message: "Skriv in ett korrekt tillgänglighetsdatum"
            },
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
            application: "Ansökan",
            editedMessage: "Denna ansökningen har redan blivit ändrad på av någon annan!\n" +
                "Sidan kommer att laddas om så det går att se den uppdaterade ansökningen.",
            success: "Ansökningen har ändrats.",
            noApplications: "Filtret du använde har inga matchande ansökningar.",
            filter: "Filter"
        },
        apply: {
            sumbitError: "Du skrev fyllde inte i fälten korrekt! Titta över det du fyllt i och försök igen.",
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
                dateOfBirth: "Födelsedag: ",
                info: "Info"
            },
            {
                status0: "Ej hanterad",
                status1: "Accepterad",
                status2: "Avböjd",
                statuselse: "Status Laddar/Fel"
            },
            {
                noApplicationMessage: "Här visas din applikation när du skapar den."
            }
        ],
        general: {
            loading: "Laddar...",
            error: "Hoppsan något gick fel!"
        }
    }
    return lang;
}
module.exports = {
    getLanguage,
}