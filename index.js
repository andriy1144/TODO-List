import dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";
import { addNewTask, getAllData } from "./Services/TaskService.js";

//Congiration of env
dotenv.config();

//Configuration of express.js and its middlewares
const app = express();
app.use(express.static("public"));
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended:true}));


//Requests
app.get("/", (req,res) => {
    res.render("home.ejs", {pageTitle: "Homepage", projects: getAllData()});
});

app.post("/newTask", (req,res) => {
    addNewTask(req.body.projectName);
    res.redirect("/");
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});