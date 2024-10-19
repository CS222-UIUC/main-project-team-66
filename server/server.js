
const app = require("./app");
const { connectDB } = require("./db/connectDB");

app.listen(8080, () => {
    connectDB();
    console.log("server started on port 8080");
});
