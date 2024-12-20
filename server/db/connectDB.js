/* eslint-disable no-undef */
const {mongoose} = require('mongoose')

// creating a function to connect to the database
const connectDB = async () => {
    try {
        // creating a connection to the database from the URI
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log(conn.connection.host)
    } catch (error) {
        console.log("Error connection to MongoDB : ", error.message)
        process.exit(1) // exiting the process with failure as 1 is failiure
    }
}

module.exports = {connectDB}