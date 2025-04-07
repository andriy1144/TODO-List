import dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";

//Congiration of env
dotenv.config();

//Configuration of express.js and its middlewares
const app = express();
app.use(express.static("public"));
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended:true}));


// TEST DATA
const customProjects = [
    {
        name: "Note #1",
        isDone:false,
    },
    {
        name: "Note #2",
        isDone:true,
    },
    {
        name: "Note #3",
        isDone:false,
    }
]

//Requests
app.get("/", (req,res) => {
    res.render("home.ejs", {pageTitle: "Homepage", projects: customProjects});
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});