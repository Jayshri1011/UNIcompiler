document.addEventListener("DOMContentLoaded", openStartModal());
const questions = [
    {
        question: "Which festival is called the festival of colours ?",
        optionA: "Diwali",
        optionB: "Holi",
        optionC: "Lohri",
        optionD: "makarsankranti",
        correctOption: "optionB"
    },

    {
        question: "Plants receive their nutrients mainly from ______ .",
        optionA: "Chlorophyll",
        optionB: "Atmosphere",
        optionC: "Light",
        optionD: "Soil",
        correctOption: "optionD"
    },

    {
        question: "What is the National song of india ?",
        optionA: "Vande mataram",
        optionB: "Jan gan man",
        optionC: "Both",
        optionD: "None",
        correctOption: "optionA"
    },

    {
        question: "Water vapour is a ______ .",
        optionA: "gas",
        optionB: "cloud droplet",
        optionC: "rain drop",
        optionD: "snowflake",
        correctOption: "optionA"
    },

    {
        question: "CFCs are used as - ",
        optionA: "refrigerants",
        optionB: "insulator",
        optionC: "aerosol propellants",
        optionD: "all the above",
        correctOption: "optionD"
    },

    {
        question: "Rainbow consist of how many colours ?",
        optionA: "8",
        optionB: "7",
        optionC: "11",
        optionD: "9",
        correctOption: "optionB"
    },

    {
        question: "How many minutes are there in an hour ?",
        optionA: "60 minutes",
        optionB: "12 minutes",
        optionC: "24 minutes",
        optionD: "48 minutes",
        correctOption: "optionA"
    },

    {
        question: "What is the name of national bird of india?",
        optionA: "owl",
        optionB: "parrot",
        optionC: "peacock",
        optionD: "ostrich",
        correctOption: "optionC"
    },

    {
        question: "Sun rises in the _______ .",
        optionA: "south",
        optionB: "west",
        optionC: "north",
        optionD: "east",
        correctOption: "optionD"
    },

    {
        question: "The largest planet of our solar system -",
        optionA: "pluto",
        optionB: "jupiter",
        optionC: "earth",
        optionD: "moon",
        correctOption: "optionB"
    },

    {
        question: "The blue planet is-",
        optionA: "pluto",
        optionB: "jupiter",
        optionC: "earth",
        optionD: "moon",
        correctOption: "optionC"
    }

    

]

let shuffledQuestions = [] 
function handleQuestions() { 
  
    while (shuffledQuestions.length <= 9) {
        const random = questions[Math.floor(Math.random() * questions.length)]
        if (!shuffledQuestions.includes(random)) {
            shuffledQuestions.push(random)
        }
    }
}


let questionNumber = 1
let playerScore = 0  
let wrongAttempt = 0 
let indexNumber = 0


function NextQuestion(index) {
    handleQuestions()
    const currentQuestion = shuffledQuestions[index]
    document.getElementById("question-number").innerHTML = questionNumber
    document.getElementById("player-score").innerHTML = playerScore
    document.getElementById("display-question").innerHTML = currentQuestion.question;
    document.getElementById("option-one-label").innerHTML = currentQuestion.optionA;
    document.getElementById("option-two-label").innerHTML = currentQuestion.optionB;
    document.getElementById("option-three-label").innerHTML = currentQuestion.optionC;
    document.getElementById("option-four-label").innerHTML = currentQuestion.optionD;

}
document.getElementById("display-question").style.fontSize= "20px";

function checkForAnswer() {
    const currentQuestion = shuffledQuestions[indexNumber] 
    const currentQuestionAnswer = currentQuestion.correctOption 
    const options = document.getElementsByName("option"); 
    let correctOption = null

    options.forEach((option) => {
        if (option.value === currentQuestionAnswer) {
            correctOption = option.labels[0].id
        }
    })
   
   
    if (options[0].checked === false && options[1].checked === false && options[2].checked === false && options[3].checked == false) {
        document.getElementById('option-modal').style.display = "flex"
    }

   
    options.forEach((option) => {
        if (option.checked === true && option.value === currentQuestionAnswer) {
            document.getElementById(correctOption).style.backgroundColor = "lime"
            playerScore++
            indexNumber++
            
            setTimeout(() => {
                questionNumber++
            }, 100)
        }

        else if (option.checked && option.value !== currentQuestionAnswer) {
            const wrongLabelId = option.labels[0].id
            document.getElementById(wrongLabelId).style.backgroundColor = "red"
            document.getElementById(correctOption).style.backgroundColor = "lime"
            
            indexNumber++
            wrongAttempt++
            
            setTimeout(() => {
                questionNumber++
            }, 100)
        }
    })
}




function handleNextQuestion() {
    checkForAnswer()
    unCheckRadioButtons()
    
    setTimeout(() => {
        if (indexNumber <= 9) {
            NextQuestion(indexNumber)
        }
        else {
            handleEndGame()
        }
        resetOptionBackground()
    }, 100);
}


function resetOptionBackground() {
    const options = document.getElementsByName("option");
    options.forEach((option) => {
        document.getElementById(option.labels[0].id).style.backgroundColor = ""
    })
}


function unCheckRadioButtons() {
    const options = document.getElementsByName("option");
    for (let i = 0; i < options.length; i++) {
        options[i].checked = false;
    }
}


function handleEndGame() {
    let remark = null
    let remarkColor = null

    
    if (playerScore <= 3) {
        remark = "Poor Grades"
        remarkColor = "red"
    }
    else if (playerScore >= 4 && playerScore < 7) {
        remark = "...Keep Learning.... "
        remarkColor = "orange"
    }
    else if (playerScore >= 7) {
        remark = "Congratualations, You did it...!!"
        remarkColor = "lime"
    }
    

   
    document.getElementById('remarks').innerHTML = remark
    document.getElementById('remarks').style.color = remarkColor
    
    document.getElementById('wrong-answers').innerHTML = wrongAttempt
    document.getElementById('right-answers').innerHTML = playerScore
    document.getElementById('score-modal').style.display = "flex"

}
function openStartModal(){
    document.getElementById("start-modal").style.display="flex";
}

function closeStartModal(){
    document.getElementById('start-modal').style.display = "none"
}


function closeScoreModal() {
    questionNumber = 1
    playerScore = 0
    wrongAttempt = 0
    indexNumber = 0
    shuffledQuestions = []
    NextQuestion(indexNumber)
    document.getElementById('score-modal').style.display = "none"
    openStartModal();
}


function closeOptionModal() {
    document.getElementById('option-modal').style.display = "none"
}