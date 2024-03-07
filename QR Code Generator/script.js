const url = "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=" ;

let userInput = document.querySelector(".user-input");
let qrImage = document.querySelector("#qrImg");
let imageBox = document.querySelector(".imgBox")

function generateQR(){
    if(userInput.value !== ""){
        let userValue = userInput.value;
        qrImage.src = `${url}${userValue}`;
        imageBox.classList.add("show-img");
    }
    else{
        userInput.classList.add("error");
        setTimeout(() => {
            userInput.classList.remove("error");
        },300);
    }
}

userInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        generateQR();
    }
});