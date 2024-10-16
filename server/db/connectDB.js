const {mongoose} = require('mongoose')

// creating a function to connect to the database
const connectDB = async () => {
    try {
        // creatign a connection to the database from the URI
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log(conn.connection.host)

    } catch (error) {
        console.log("Error connection to MongoDB : ", error.message)
        process.exist(1) // exiting the process with failure as 1 is failiure
    }
}

module.exports = {connectDB}