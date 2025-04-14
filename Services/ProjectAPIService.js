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

export async function addNewProject(data){
    try{
        return await axios.post(`${API_URL}/projects`, data, {headers: defaultHeader});
    }catch(err){
        console.error(`ERROR: POST addNewProject(data): \n ${err}`);
        console.error(err);
        throw err;
    }
}