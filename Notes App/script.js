const notesContainer = document.querySelector(".notes-container");
const createBtn = document.querySelector(".btn");


function createNote(){
    let note = document.createElement("p");
    note.contentEditable = "true";
    note.classList.add("input-box");

    let img = document.createElement("img");
    img.src = `./images/delete.png`;

    note.appendChild(img);
    notesContainer.appendChild(note);
}

function savedData(){
    localStorage.setItem("noteData", notesContainer.innerHTML)
}

function getSavedData(){
    notesContainer.innerHTML = localStorage.getItem("noteData")
}

createBtn.addEventListener("click", (event) => {
    createNote();
    savedData();
})

notesContainer.addEventListener("click", (event) => {
    if(event.target.tagName === "IMG"){
        event.target.parentElement.remove();
        savedData();
    }
    else if(event.target.tagName === "P"){
        let inputBox = document.querySelectorAll(".input-box");
        inputBox.forEach(nt => {
            nt.onkeyup = function(){
                savedData();
            }
        })
    }
})

document.addEventListener("keydown", (event) => {
    if(event.key === "Enter"){
        document.execCommand("insertLineBreak");
        event.preventDefault();
    }
})

// localStorage.clear();

getSavedData();