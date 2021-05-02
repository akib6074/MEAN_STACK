const express =  require("express");

const postRoutes = require("./routes/posts");

const app = express();

//mongoose full driver code

const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://max:hPSsWi06z1uWr86V@cluster0.kmgi8.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")
    .then(() => {
        console.log('Connected to database!');
    })
    .catch(() => {
        console.log('Connection failed!');
    });

//mongoose driver code end

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin","*");
    res.setHeader("Access-Control-Allow-Headers", 
    "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader("Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS");
    next();
});

app.use("/api/posts", postRoutes);

module.exports = app;