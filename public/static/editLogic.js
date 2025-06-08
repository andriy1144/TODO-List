const editButtonsList = document.querySelectorAll(".edit-pen-icon");
const successIconSrc = "/static/icons/success.svg";
const standartIcon = "/static/icons/pen.svg";


editButtonsList?.forEach((btn) => {
    btn.addEventListener("click", () => {
        if(isInputVisible(btn)) {
            const label = btn.previousElementSibling.previousElementSibling;
            const spiningWheel = handleCheckingTimeout(label);
            btn.style.display = "none";

            handleEditRequest(btn,label,spiningWheel);
        }
        changeVisibility(btn);
    });
});

function changeVisibility(btn){
    document.querySelector(`#project-${btn.dataset.link}-input-field`).classList.toggle("visible-input")
    document.querySelector(`label[data-link="${btn.dataset.link}"] > .checkbox-label`).toggleAttribute("hidden");
    
    const btnIcon = document.querySelector(`label[data-link="${btn.dataset.link}"]`)
                            .nextSibling
                            .nextSibling
                            .nextSibling
                            .nextSibling;

    if(btnIcon.getAttribute("src") === successIconSrc){
       btnIcon.setAttribute("src", standartIcon);
    }else{
       btnIcon.setAttribute("src", successIconSrc);
    }
}

function isInputVisible(btn){
    return document.querySelector(`#project-${btn.dataset.link}-input-field`).classList.contains("visible-input");
}

async function handleEditRequest(btn, label, spiningWheel){
    const inputField = document.querySelector(`#project-${btn.dataset.link}-input-field > input`);
    const newName = inputField.value.trim();
    
    if(!isInputValid(newName)) {
        inputField.value = label.querySelector(".checkbox-label").textContent;
        cleanUpWithButton(btn,label, spiningWheel);
        return;
    }

    return await fetch(`${BASE_LINK}projects/${btn.dataset.link}/edit`, {
        method: "PATCH", 
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        },
        body: toUrlEncoded({
            name: newName,
            description: null,
            color: null,
            is_favorite: null,
            view_style: null,
        })}
    ).then(res => {
        if(res.ok) label.querySelector(".checkbox-label").textContent = newName;
        cleanUpWithButton(btn,label, spiningWheel);
    });
}

function isInputValid(inputValue){
    return inputValue !== "" && inputValue && inputValue !== undefined;
}   

function cleanUpWithButton(btn, label, spiningWheel){
    btn.removeAttribute("style");
    cleanUp(label, spiningWheel);
}