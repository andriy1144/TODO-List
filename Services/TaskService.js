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

export function getAllData() {
    return customProjects;
}

export function addNewTask(name, isDone=false){
    customProjects.push({name:name, isDone:isDone});
}