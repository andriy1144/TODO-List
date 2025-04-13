import dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";
import { addNewProject, getAllProjects } from "./Services/ProjectAPIService.js";

//Congiration of env
dotenv.config();

//Configuration of express.js and its middlewares
const app = express();
app.use(express.static("public"));
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended:true}));


//Requests
app.get("/", async (req,res) => {
    try{
        const projects = await getAllProjects();
        res.render("home.ejs", {pageTitle: "Homepage", projects: projects});
    }catch(err){
        res.render("error.ejs", {errorName: err.response.data.error, errorStatusCode: err.response.status});
    }
});

app.post("/newProject", async (req,res) => {
    try{
        const response = await addNewProject(req.body);
        res.status(response.status).redirect("/");
    }catch(err){
        res.render("error.ejs", {errorName: err.response.data.error, errorStatusCode: err.response.status});
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});