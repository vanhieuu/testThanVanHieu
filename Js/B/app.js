var url = "https://opentdb.com/api.php?amount=5&category=21&difficulty=easy&type=multiple";
// const $main = document.getElementById(`main`);
function print(question) {
    for (var i = 0; i < question.length; i++) {
        const quest = question[i];
        console.log(`#${i + 1}`);
        for (const key in quest) {
            const value = quest[key];
            console.log(`${key} : ${value}`)
        }
    }
}
let questions = fetch(url)
    .then((response) => response.json())
    .then((data => {
        print(data.results)
        console.log(data.results)
   

// .then((data) => {
//     data.forEach((result) => {
//         $main.innerHTML += `
//     <div>Category: ${result.category}</div>
//     <div>Type: ${result.type} </div>
//     <div>Difficulty: ${result.difficulty} </div>
//     <div>Question: ${result.question} </div>
//     <div>CorrectAnswer: ${result.correct_answer} </div>
//     <div>Incorrectanswers: ${result.incorrect_answers} </div>
//     --------------------------------------------
//     `
//     })
// });
let rightAnswerMessages = [
    `Yeahhh! Chính xác <i class="far fa-2x fa-laugh-squint"></i>`,
    `Wow, ghê đấy <i class="far fa-2x fa-grin-stars"></i>`,
    `Bạn đã trả lời đúng! <i class="far fa-2x fa-kiss"></i>`,
    `Ngon, tiếp nào... <i class="far fa-2x fa-grin-alt"></i>`,
]

let wrongAnswerMessages = [
    `Hả? Sai rồi. <i class="far fa-2x fa-flushed"></i>`,
    `Sai rồi nha. Cố lên <i class="far fa-2x fa-grin-beam-sweat"></i>`,
    `Bạn đã trả lời sai! <i class="far fa-2x fa-meh"></i>`,
    `Có gì đó không đúng? <i class="far fa-2x fa-meh-rolling-eyes"></i>`,
]
let suffleQuest;

let userResult = 0;

let currentQuestion;
let indexQuestion = 0;
let totalQuestion = 0;
newGame();
function submitAnswer() {
    if (checkHasAnswer()) {
        let nameAnswer = "answer_" + currentQuestion.category;
        let right = true;
        for (let i = 0; i < document.getElementsByName(nameAnswer).length; i++) {
            let answer = document.getElementsByName(nameAnswer)[i];
            if (answer.value.toLowerCase() === 'true' && !answer.checked) {
                right = false;
                break;
            }
        }
        if (right) {
            rightAnswer();
        } else {
            wrongAnswer();
        }
        preParaForNextQuestion();
    } else {
        needAnswerQuestion();
    }
}
function checkHasAnswer() {
    let hasAnswer = false;
    let nameAnswer = "answer_" + currentQuestion.category;
    for (let i = 0; i < document.getElementsByName(nameAnswer).length; i++) {
        let answer = document.getElementsByName(nameAnswer)[i];
        if (answer.checked) {
            hasAnswer = true;
            break;
        }
    }
    return hasAnswer;
}
function nextQuestion() {
    currentQuestion = suffleQuest.shift();
    if (currentQuestion) {
        indexQuestion++;
        newQuestion();
        hideResult();
        displayQuestion(currentQuestion, indexQuestion);
    } else {
        finished();
    }
}
function preParaForNextQuestion() {
    document.getElementById('btnSubmitAnswer').style.display = 'none';
    document.getElementById('btnNextQuestion').style.display = 'block';
} function displayQuestion(cQuestion, indexQuestion) {
    document.getElementById("indexQuestion").innerHTML = indexQuestion;
    document.getElementById("totalQuestion").innerHTML = totalQuestion;
    document.getElementById("contentQuestion").innerHTML = standardContentQuestion(cQuestion.question);
    document.getElementById("answerQuestion").innerHTML = "";
    let tblAnswert = '';
    if (cQuestion.isMultiAnswer) {
        for (let i = 0; i < cQuestion.answer.length; i++) {
            const answer = cQuestion.answer[i];
            tblAnswert += `<li>
                            <input class="hidden" type="checkbox" value="${answer.correct_answer}" id="answer_${indexQuestion}_${i + 1}" name="answer_${cQuestion.category}"/>
                            <label class="w-100p m-0 py-1" for="answer_${indexQuestion}_${i + 1}">
                                ${standardContentQuestion(answer.question)}
                            </label>
                        </li>`;
        }
    } else {
        for (let i = 0; i < cQuestion.answer.length; i++) {
            const answer = cQuestion.answer[i];
            tblAnswert += `<li>
                            <input class="hidden" type="radio" value="${answer.correct_answer}" id="answer_${indexQuestion}_${i + 1}" name="answer_${cQuestion.category}"/>
                            <label class="w-100p m-0 py-1" for="answer_${indexQuestion}_${i + 1}">
                                ${standardContentQuestion(answer.question)}
                            </label>
                        </li>`;
        }
    }
    document.getElementById("answerQuestion").innerHTML = tblAnswert;
}

function standardContentQuestion(content) {
    return content.replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
}

function onToggleSelected(e) {
    console.dir(e.target.parentElement);
    e.target.parentElement.classList.toggle('selected');
}

function hideResult() {
    document.getElementById("rightAnswer").style.display = 'none';
    document.getElementById("wrongAnswer").style.display = 'none';
    document.getElementById("needAnswer").style.display = 'none';
}

function newQuestion() {
    document.getElementById('btnSubmitAnswer').style.display = 'block';
    document.getElementById("btnNextQuestion").style.display = "none";
}

function rightAnswer() {
    hideResult();
    document.getElementById("rightAnswer").style.display = 'block';
    document.getElementById("rightAnswer").innerHTML = getRandomMessage(rightAnswerMessages);
    userResult++;
}

function getRandomMessage(listMessages) {
    let ran = Math.floor(Math.random() * listMessages.length);
    return listMessages[ran];
}



function wrongAnswer() {
    hideResult();
    document.getElementById("wrongAnswer").style.display = 'block';
    document.getElementById("wrongAnswer").innerHTML = getRandomMessage(wrongAnswerMessages);
}

function needAnswerQuestion() {
    hideResult();
    document.getElementById("needAnswer").style.display = 'block';
}

function finished() {
    document.getElementById("playing").style.display = 'none';
    document.getElementById("result").style.display = 'block';
    document.getElementById("userResult").innerHTML =
        "Bạn trả lời đúng " + userResult + " trên " + totalQuestion + " câu hỏi";
}

function newGame() {
    document.getElementById("playing").style.display = 'block';
    document.getElementById("result").style.display = 'none';
    suffleQuest = suffleQuestF();
    indexQuestion = 0;
    userResult = 0;
    totalQuestion = suffleQuest.length;
    nextQuestion();
}

function suffleQuestF() {
    let copy = JSON.parse(JSON.stringify(data.results));
    let result = [];
    while (copy.length > 0) {
        let i = Math.floor(Math.random() * copy.length);
        result.push(copy.splice(i, 1)[0]);
    }
    return result;
}

    // .then((data) => {
    //     data.forEach((result) => {
    //         $main.innerHTML += `
    //     <div>Category: ${result.category}</div>
    //     <div>Type: ${result.type} </div>
    //     <div>Difficulty: ${result.difficulty} </div>
    //     <div>Question: ${result.question} </div>
    //     <div>CorrectAnswer: ${result.correct_answer} </div>
    //     <div>Incorrectanswers: ${result.incorrect_answers} </div>
    //     --------------------------------------------
    //     `
    //     })
    // });
}));