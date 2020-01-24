const { Pool, Client } = require('pg')


function registerUser(user) {
    try {
        const client = new Client({
            // connectionString: process.env.DATABASE_URL,

            user: "wlmremkduaitnk",
            password: "83a43bfb610544a9c62da56a7144bafb13a726bf63a91e7ec454178a9623b479",
            database: "d38bijitre5o3s",
            port: 5432,
            host: "ec2-54-247-92-167.eu-west-1.compute.amazonaws.com",
            ssl: true
        });
        client.connect()
        client.query('SELECT * FROM person', (err, res) => {
            // console.log(err, res)
            client.end()
        });
    } catch (error) {
        console.log(error)
    }

}
module.exports = {
    registerUser,

}