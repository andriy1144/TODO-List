const LINK = `${window.location.protocol}://${window.location.hostname}:${window.location.port}`;

//ADDING MODAL WINDOW FUNCTIONALITY
const modal = document.querySelector(".modal-container");
const closeModal = document.querySelector("#close-modal")
const openModal = document.querySelector("#open-modal");

openModal.addEventListener("click", () => {
    modal.classList.add("open");
})

closeModal.addEventListener("click", ()=>{
    modal.classList.remove("open");
})


// DELETE FUNCTIONALITY
const trashButton = document.querySelector(".trash-icon");
const cancelButtonBlock = document.querySelector(".undo-deletion");

let deletionDelay;

trashButton.addEventListener("click", () => {
    cancelButtonBlock.classList.add("open");
    deletionDelay = setTimeout(() => {
        console.log(trashButton.dataset.link);
        fetch(`${LINK}/projects/${trashButton.dataset.link}/delete`);
    },5000);
});