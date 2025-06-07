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
        const spiningWheel = handleCheckingTimeout(label);
        const id = label.dataset.link;

        fetch(`${BASE_LINK}projects/${id}/checked`).then((res) => {
            console.log("Response status:" + res.status);
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