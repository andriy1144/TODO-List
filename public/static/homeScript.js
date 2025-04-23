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
const checkboxes = document.querySelectorAll(".checkbox-container input[type='checkbox']");

checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("click", (e) => {
        const label = checkbox.closest(".checkbox-container");
        const id = label.dataset.link;

        fetch(`${BASE_LINK}projects/${id}/checked`);
    });
});
