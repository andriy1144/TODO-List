import dotenv from "dotenv";
import axios from "axios";

//Congiration of env
dotenv.config();

const BEARER_TOKEN = process.env.API_AUTHORIZATION_TOKEN;
const API_URL = "https://todoist.com/api/v1";

const defaultHeader = {Authorization: `Bearer ${BEARER_TOKEN}`};

export async function getAllProjects(){
    try{
        const response = await axios.get(`${API_URL}/projects`, {headers: defaultHeader});
        return response.data.results.slice(1);
    }catch(err){
        console.error(`ERROR: GET getAllProjects(): \n ${err}`);
        console.error(err);
        throw err;
    }
}

export async function getProjectById(id) {
    try{
        const response = await axios.get(`${API_URL}/projects/${id}`, {headers: defaultHeader});
        return response;
    }catch(err){
        console.error(`ERROR: GET getProjectById(id): \n ${err}`);
        console.error(err);
        throw err;
    }   
}

export async function addNewProject(data){
    try{
        addProjectStatus(data);
        return await axios.post(`${API_URL}/projects`, data, {headers: defaultHeader});
    }catch(err){
        console.error(`ERROR: POST addNewProject(data): \n ${err}`);
        console.error(err);
        throw err;
    }
}

export async function deleteProjectWithId(id){
    try{
        return await axios.delete(`${API_URL}/projects/${id}`, {headers: defaultHeader});
    }catch(err){
        console.error(`ERROR: DELETE deleteProjectWithId(id): \n ${err}`);
        console.error(err);
        throw err;
    }
}

export async function updateProjectStatus(id){
    try{
        //Getting project by id
        let project = await getProjectById(id);
        
        let updateStatusProject = {
            name: changeStatus(project.data.name),
            description: project.data.description,
            color: project.data.color,
            is_favorite: project.data.is_favorite,
            view_style: project.data.view_style
        }

        return await axios.post(`${API_URL}/projects/${id}`, updateStatusProject, {headers: defaultHeader});
    }catch(err){
        console.error(`ERROR: UPDATE updateProjectStatus(id): \n ${err}`);
        console.error(err);
        throw err;
    }
}

function addProjectStatus(project){
    project.name = `${project.name}|false`
    return project;
}

function changeStatus(projectStatus){
    let currProjectStatus = projectStatus.split("|")[1];
    return currProjectStatus === "true" ? `${projectStatus.split("|")[0]}|false` : `${projectStatus.split("|")[0]}|true`;
}