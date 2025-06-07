const BASE_LINK = `${window.location.protocol}`;
const editButtonsList = document.querySelectorAll(".edit-pen-icon");

editButtonsList?.forEach((btn) => {
    btn.addEventListener("click", () => {
        handleEditRequest();
    });
});

function handleEditRequest(){
    fetch(`${BASE_LINK}projects/${btn.dataset.link}/edit`, {method:"PATCH", body: {newTitle: "New title"}});
}