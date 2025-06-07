import dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";
import { addNewProject, 
         deleteProjectWithId, 
         getAllProjects, 
         updateProjectStatus,
         editProject } from "./services/ProjectAPIService.js";

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

app.delete("/projects/:id/delete", async (req,res) => {
    try{
        const response = await deleteProjectWithId(req.params.id);
        res.sendStatus(response.status);
    }catch(err){
        res.render("error.ejs", {errorName: err.response.data.error, errorStatusCode: err.response.status});
    }
});

app.get("/projects/:id/checked", async (req,res) => {
    // console.log("Check with id: " + req.params.id);
    try{
        const response = await updateProjectStatus(req.params.id);
        res.sendStatus(response.status);
    }catch(err){
        res.render("error.ejs", {errorName: err.response.data.error, errorStatusCode: err.response.status});
    }
});

app.patch("/projects/:id/edit", async (req,res) => {
    console.log(`Server has just got edit request on ${req.params.id}`)
    try{
        const newPrjectData = req.body;
        const id = req.params.id;
        const response = await editProject(id, newPrjectData);
        res.sendStatus(response.status);
    }catch(err){
        res.render("error.ejs", {errorName: err.response.data.error, errorStatusCode: err.response.status})
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});