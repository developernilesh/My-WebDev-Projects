// const url = "https://opentdb.com/api.php?amount=5&category=17&difficulty=easy&type=multiple";

let questions = [
    {
        "type": "multiple",
        "difficulty": "easy",
        "category": "Science &amp; Nature",
        "question": "What name is given to all baby marsupials?",
        "answers": [
            {text: "Calf", correct: false},
            {text: "Pup", correct: false},
            {text: "Joey", correct: true},
            {text: "Cub", correct: false}
        ]
    },
    {
        "type": "multiple",
        "difficulty": "easy",
        "category": "Science &amp; Nature",
        "question": "Rhinoplasty is a surgical procedure on what part of the human body?",
        "answers": [
            {text: "Nose", correct: true},
            {text: "Ears", correct: false},
            {text: "Chin", correct: false},
            {text: "Neck", correct: false}
        ]
    },
    {
        "type": "multiple",
        "difficulty": "easy",
        "category": "Science &amp; Nature",
        "question": "What was the name of the first artificial Earth satellite, launched by the Soviet Union in 1957?",
        "answers": [
            {text: "Soyuz 7K-OK", correct: false},
            {text: "Sputnik 1", correct: true},
            {text: "Zenit-2", correct: false},
            {text: "Voskhod 3KV", correct: false}
        ]
    },
    {
        "type": "multiple",
        "difficulty": "easy",
        "category": "Science &amp; Nature",
        "question": "What is the standard SI unit for temperature?",
        "answers": [
            {text: "Fahrenheit", correct: false},
            {text: "Celsius", correct: false},
            {text: "Rankine", correct: false},
            {text: "Kelvin", correct: true}
        ]
    },
    {
        "type": "multiple",
        "difficulty": "easy",
        "category": "Science &amp; Nature",
        "question": "The element involved in making human blood red is which of the following?",
        "answers": [
            {text: "Copper", correct: false},
            {text: "Iron", correct: true},
            {text: "Iridium", correct: false},
            {text: "Cobalt", correct: false}
        ]
    },
    {
        "type": "multiple",
        "difficulty": "easy",
        "category": "Science &amp; Nature",
        "question": "The human heart has how many chambers?",
        "answers": [
            {text: "4", correct: true},
            {text: "2", correct: false},
            {text: "6", correct: false},
            {text: "3", correct: false}
        ]
    },
    {
        "type": "multiple",
        "difficulty": "easy",
        "category": "Science &amp; Nature",
        "question": "The asteroid belt is located between which two planets?",
        "answers": [
            {text: "Mercury and Venus", correct: false},
            {text: "Jupiter and Saturn", correct: false},
            {text: "Earth and Mars", correct: false},
            {text: "Mars and Jupiter", correct: true}
        ]
    },
    {
        "type": "multiple",
        "difficulty": "easy",
        "category": "Science &amp; Nature",
        "question": "Which is the most abundant element in the universe?",
        "answers": [
            {text: "Helium", correct: false},
            {text: "Oxygen", correct: false},
            {text: "Nytrogen", correct: true},
            {text: "Hydrogen", correct: false}
        ]
    },
    {
        "type": "multiple",
        "difficulty": "easy",
        "category": "Science &amp; Nature",
        "question": "What is the speed of light in a vacuum?",
        "answers": [
            {text: "50,461 m/s", correct: false},
            {text: "299,792,458 m/s", correct: true},
            {text: "308,215,043 m/s", correct: false},
            {text: "751,665,014,151 m/s", correct: false}
        ]
    },
    {
        "type": "multiple",
        "difficulty": "easy",
        "category": "Science &amp; Nature",
        "question": "What lies at the center of our galaxy?",
        "answers": [
            {text: "A black hole", correct: true},
            {text: "A wormhole", correct: false},
            {text: "A supernova", correct: false},
            {text: "A quasar", correct: false}
        ]
    }
];

const questionElement = document.querySelector("#question");
const ansBtns = document.querySelector("#answer-buttons");
const nextBtn = document.querySelector(".next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextBtn.innerHTML = "Next";
    // fetchQuestions();
    getQuestions();
}

// async function fetchQuestions(){
//     const response = await fetch(`${url}`);
//     const data = await response.json();

//     getQuestions(data.results);
// }

function getQuestions(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1 ;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach((answer) => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        ansBtns.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    nextBtn.classList.remove("active");
    while(ansBtns.firstChild){
        ansBtns.removeChild(ansBtns.firstChild);
    }
}

function selectAnswer(event){
    const selectedBtn = event.target;
    const isCorrect = selectedBtn.dataset.correct;
    if(isCorrect === "true"){
        selectedBtn.classList.add("correct");
        score++ ;
    }
    else{
        selectedBtn.classList.add("incorrect");
    }

    Array.from(ansBtns.children).forEach((button) => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    })
    nextBtn.classList.add("active");
}

function showScore(){
    resetState();
    questionElement.innerHTML=`You scored ${score} out of ${questions.length}`;
    nextBtn.innerHTML = "Play Again!";
    nextBtn.classList.add("active");
}

function handleNextBtn(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        getQuestions();
    }
    else{
        showScore();
    }
}

nextBtn.addEventListener("click", () => {
    if(currentQuestionIndex < questions.length){
        handleNextBtn();
    }
    else{
        startQuiz();
    }
})

startQuiz();
