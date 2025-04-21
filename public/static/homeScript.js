//ADDING MODAL WINDOW FUNCTIONALITY
const modal = document.querySelector(".modal-container");
const closeModal = document.querySelector("#close-modal");
const openModal = document.querySelector("#open-modal");

openModal.addEventListener("click", () => {
    modal.classList.add("open");
});

closeModal.addEventListener("click", ()=>{
    modal.classList.remove("open");
});


// CHECKING TASK
const projectLabels = document.querySelectorAll(".checkbox-container");

if(projectLabels.length > 0){
    projectLabels.forEach((project) => {
        project.addEventListener("click", () => {
            fetch(`${BASE_LINK}projects/${project.dataset.link}/checked`);
        });
    });
}