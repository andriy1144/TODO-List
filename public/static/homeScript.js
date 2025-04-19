const LINK = `${window.location.protocol}`;

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




// ----------------------------------------------------
// DELETE FUNCTIONALITY
const trashButton = document.querySelector(".trash-icon");

let deletionDelay;
let isExist = false;

let currUndoDeletionBlock;
let currPorject;

trashButton.addEventListener("click", () => {
    if(isExist) return;

    currUndoDeletionBlock = createUndoButton();
    currPorject = trashButton.parentElement;

    currPorject.style.display = "none";

    isExist = true;

    deletionDelay = setTimeout(() => {
        console.log(trashButton.dataset.link);
        fetch(`${LINK}projects/${trashButton.dataset.link}/delete`, {method:"DELETE"});

        currUndoDeletionBlock.remove();
        currPorject.remove();
        isExist = false;
    },6500);
});

// UNDO BUTTON CREATION
function createUndoButton(){
    const undoDeletion = document.createElement('div');
    undoDeletion.className = 'undo-deletion';

    const timerContainer = document.createElement('div');
    timerContainer.className = 'timer-container';

    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('class', 'progress-ring');
    svg.setAttribute('width', '40');
    svg.setAttribute('height', '40');

    const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle.setAttribute('class', 'progress-ring__circle');
    circle.setAttribute('stroke', 'white');
    circle.setAttribute('stroke-width', '4');
    circle.setAttribute('fill', 'transparent');
    circle.setAttribute('r', '16');
    circle.setAttribute('cx', '20');
    circle.setAttribute('cy', '20');

    svg.appendChild(circle);

    const timerText = document.createElement('div');
    timerText.className = 'timer-text';
    timerText.id = 'timer';
    timerText.textContent = '5';

    timerContainer.appendChild(svg);
    timerContainer.appendChild(timerText);

    const undoText = document.createElement('h3');
    undoText.id = 'undo-text';
    undoText.textContent = 'Undo';

    undoDeletion.appendChild(timerContainer);
    undoDeletion.appendChild(undoText);

    document.querySelector(".container").appendChild(undoDeletion);

    startCircleAnimation();

    undoDeletion.addEventListener("click", () => {
        undoDeletion.remove();
        clearTimeout(deletionDelay);
        currPorject.style.display = "flex";
        isExist = false;
    })

    return undoDeletion;
}