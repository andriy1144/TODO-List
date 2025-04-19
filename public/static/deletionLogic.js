const BASE_LINK = `${window.location.protocol}`;
const trashButtonsList = document.querySelectorAll(".trash-icon");

let isUndoBtnOnTheScreen = false;
let deletionFunction;
let currUndoDeletionBtn;
let currPorject;

const DELETE_DELAY_MS = 6500;
const TIMER_START_VALUE = 5;

if(trashButtonsList.length > 0){
    trashButtonsList.forEach((btn) => btn.addEventListener("click", () => {
        if(isUndoBtnOnTheScreen) return;
        handleDeleteRequest(btn);
    }));
}

function handleDeleteRequest(btn){
    initAndHideElements(btn);
    createSendingDeleteRequest(btn);
}

function initAndHideElements(btn){
    currUndoDeletionBtn = createUndoButton();
    currPorject = btn.parentElement;
    currPorject.style.display = "none";
    isUndoBtnOnTheScreen = true;
}

function createSendingDeleteRequest(btn){
    deletionFunction = setTimeout(() => {
        fetch(`${BASE_LINK}projects/${btn.dataset.link}/delete`, {method:"DELETE"});
        removeProjectAndSetInitState();
    }, DELETE_DELAY_MS)
}

function removeProjectAndSetInitState(){
    currUndoDeletionBtn.remove();
    currPorject.remove();
    
    isUndoBtnOnTheScreen = false;
}

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
    timerText.textContent = TIMER_START_VALUE;

    timerContainer.appendChild(svg);
    timerContainer.appendChild(timerText);

    const undoText = document.createElement('h3');
    undoText.id = 'undo-text';
    undoText.textContent = 'Undo';

    undoDeletion.appendChild(timerContainer);
    undoDeletion.appendChild(undoText);

    document.querySelector(".container").appendChild(undoDeletion);

    startCircleAnimation();

    //adding logic to the element
    undoDeletion.addEventListener("click", () => {
        undoDeletion.remove();
        clearTimeout(deletionFunction);
        currPorject.style.display = "flex";
        isUndoBtnOnTheScreen = false;
    })

    return undoDeletion;
}