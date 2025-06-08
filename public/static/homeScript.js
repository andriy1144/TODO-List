//ADDING MODAL WINDOW FUNCTIONALITY
const modal = document.querySelector(".modal-container");
const closeModal = document.querySelector("#close-modal");
const openModal = document.querySelector("#open-modal");

onload = () => {
    if(localStorage.getItem("theme")) {
        document.documentElement.setAttribute("data-theme",localStorage.getItem("theme"));
        themeChangerBtn.firstChild.setAttribute("src", sunIconSrc);
    }
}

openModal.addEventListener("click", () => {
    modal.classList.add("open");
});

closeModal.addEventListener("click", ()=>{
    modal.classList.remove("open");
});

function formValidation(form){
    const name = form.name.value.trim();
    return name !== "" && name && name != undefined;
}

function toUrlEncoded(details){
    let formBody = [];
    for (var property in details) {
    let encodedKey = encodeURIComponent(property);
    let encodedValue = encodeURIComponent(details[property]);
    formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");

    return formBody;
}

// THEME CHANGER
const themeChangerBtn = document.querySelector(".theme-changer");
const moonIconSrc = "/static/icons/moon.svg";
const sunIconSrc = "/static/icons/sun.svg";

themeChangerBtn.addEventListener("click", (e) => {
    e.preventDefault();
    handleThemeChanging();
});

function handleThemeChanging(){
    const documentPage = document.documentElement;
    if(!documentPage.getAttribute("data-theme")) {
        documentPage.setAttribute("data-theme", "dark-theme");
        window.localStorage.setItem("theme", "dark-theme");
        themeChangerBtn.firstChild.setAttribute("src", sunIconSrc);
    }
    else {
        documentPage.removeAttribute("data-theme");
        window.localStorage.removeItem("theme");
        themeChangerBtn.firstChild.setAttribute("src", moonIconSrc);
    }
}

// CHECKING TASK
const checkboxes = document.querySelectorAll(".checkbox-container input[type='checkbox']");

checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("click", (e) => {
        const label = checkbox.closest(".checkbox-container");
        const spiningWheel = handleCheckingTimeout(label);
        const id = label.dataset.link;

        fetch(`${BASE_LINK}projects/${id}/checked`).then((res) => {
            cleanUp(label, spiningWheel);
        });
    });
});

function handleCheckingTimeout(label){
    label.querySelector("input").setAttribute("disabled", "true");
    return addSpiningCircle(label);
}

function addSpiningCircle(el){
    //Creating spinnig wheel
    let circle = document.createElement('img');
    circle.setAttribute("src", "/static/icons/tube-spinner.svg");
    circle.classList.add("spining-circle");
    //adding to dom
    const project = el.parentNode;
    project.insertAdjacentElement('beforeend', circle);

    return circle;
}

function cleanUp(label, spiningWheel){
    label.querySelector("input").removeAttribute("disabled");
    spiningWheel.remove();
}

// SEARCHING BAR FUNCTIONALITY
function search(name){
    const formattedName = formatStringToSearch(name);
    const projects = getAllProjects();
    findMathchedProjects(formattedName, projects);
}

function formatStringToSearch(str){
    const strParts = str.split(" ");
    return strParts.map((str) => str.trim())
                   .filter((str) => str !== "")
                   .join("").trim().toLowerCase();
}

function findMathchedProjects(name, projects){
    projects.forEach((project) => {
        const projectLabel = project.querySelector(".checkbox-label").textContent;
        const formattedProjectLabel = formatStringToSearch(projectLabel);
        if(name === "" || formattedProjectLabel.startsWith(name)){
            project.style.display = "flex"
        }else{
            project.style.display = "none"
        }
    }); 
}

function getAllProjects(){
    return document.querySelectorAll(".project");
}