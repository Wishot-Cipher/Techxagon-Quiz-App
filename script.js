const questions = [
    {
        question: "<em>How can we identify a closing tag ?</em>",
        answers : [
            {text: "<h4>", correct: false},
            {text: "</h4>", correct: true},
            {text: "</h4/>", correct: false},
            {text: "<h4/>", correct: false}
        ]
    },
    {
        question: "<em> The visible part of the HTML document is between what tag ? </em>",
        answers : [
            {text: "<body>", correct: true},
            {text: "<head>", correct: false},
            {text: "<html>", correct: false},
            {text: "<meta>", correct: false}
        ]
    },
    {
        question: "<em> An HTML element is defined by ?</em>",
        answers : [
            {text: "A long tag, some content, and a short tag.", correct: false},
            {text: "A big tag, some content, and a small tag.", correct: false},
            {text: "A good tag, some content, and a bad tag.", correct: false},
            {text: "An opening tag, some content, and a closing tag.", correct: true}
        ]
    },
    {
        question: "<em> How will you represent a line brake in HTML ?</em>",
        answers : [
            {text: "<line>", correct: false},
            {text: "<br>", correct: true},
            {text: "<lb>", correct: false},
            {text: "<brake>", correct: false}
        ]
    },
    {
        question: " <em> What's the purpose of the 'src' attribute in the &ltimg&gt tag ?</em> ",
        answers : [
            {text: "Specifies the source/path of the image", correct: true},
            {text: "Defines the style of the image", correct: false},
            {text: "Adds a border to the image", correct: false},
            {text: "Provides alternative text for the image", correct: false}
        ]
    },
    {
        question: "<em> What dose the 'href' attribute in &lta&gt tag define ? </em>",
        answers : [
            {text: "Heading reference", correct: false},
            {text: "Specifies the text the reader can see", correct: false},
            {text: "Specifies the URL of the page the link goes to", correct: true},
            {text: "HTML reference", correct: false}
        ]
    },
    {
        question: "<em>How do you make <b>text bold</b> in HTML ?</em>",
        answers : [
            {text: "<italic>", correct: false},
            {text: "<em>", correct: false},
            {text: "<bolder>", correct: false},
            {text: "<b>", correct: true}
        ]
    },
    {
        question: "<em>Which tag is used for creating a hyperlink in HTML ?</em>",
        answers : [
            {text: "<a>", correct: true},
            {text: "<href>", correct: false},
            {text: "<link>", correct: false},
            {text: "<hyper>", correct: false}
        ]
    },
    {
        question: "<em> Which HTML tag is used to display the largest heading ? </em>",
        answers : [
            {text: "<h6>", correct: false},
            {text: "<h1>", correct: true},
            {text: "<head>", correct: false},
            {text: "<header>", correct: false}
        ]
    },
    {
        question: "<em> What dose the 'alt' attribute in the &ltimg&gt tag specify ? </em>",
        answers : [
            {text: "Image alignment", correct: false},
            {text: "image source", correct: false},
            {text: "image caption", correct: false},
            {text: "Alternative text for the image", correct: true}
        ]
    },
    
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-button");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

const shuffleArray = (array) => {
    for (let quesNum = array.length - 1; quesNum > 0; quesNum--) {
        const j = Math.floor(Math.random() * (quesNum + 1));
        [array[quesNum], array[j]] = [array[j], array[quesNum]];
    }
    return array;
};

const startQuiz = () => {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    const shuffledQuestions = shuffleArray(questions);
    localStorage.setItem('quizQuestions', JSON.stringify(shuffledQuestions));
    showQuestions();
};

const showQuestions = () => {
    resetState();
    const storedQuestions = JSON.parse(localStorage.getItem('quizQuestions'));
    let currentQuestion = storedQuestions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = `${questionNo}. ${currentQuestion.question}.`;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerText = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectedAnswer);
    });
};

const resetState = () => {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
};

const selectedAnswer = (e) => {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("answerClicked");
        score++;
    } else {
        selectedBtn.classList.add("answerClicked");
    }
    Array.from(answerButtons.children).forEach(button => {
        // if (button.dataset.correct === "true") {
        //     button.classList.add("rightAnswer")
        // }
        button.disabled = true;
    });
    nextButton.style.display = "block";
};

const showScore = () => {
    resetState();
    const storedScore = localStorage.getItem("userScore");
    if (storedScore) {
        score = parseInt(storedScore)
    }
    questionElement.innerHTML = `You Scored ${score} Out Of ${questions.length}`;
    nextButton.innerHTML = "Exam Is Over";
    nextButton.style.display = "block";
    nextButton.disabled = true;
    localStorage.setItem("userScore", score.toString())
 window.addEventListener("beforeunload", (e) => {
 e.preventDefault();
 e.returnValue = score;
})
};

const handleNextButton = () => {
    currentQuestionIndex++;
    const storedQuestions = JSON.parse(localStorage.getItem('quizQuestions'));
    if (currentQuestionIndex < storedQuestions.length) {
        showQuestions();
    } else {
        showScore();
    }
};

nextButton.addEventListener("click", () => {
    const storedQuestions = JSON.parse(localStorage.getItem('quizQuestions'));
    if (currentQuestionIndex < storedQuestions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});

window.onload = function() {
    const storedScore = localStorage.getItem("userScore");
    if (storedScore) {
        score = parseInt(storedScore);
        showScore();
    }
}

startQuiz();