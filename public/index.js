const button = document.getElementById("generate-button");
const title = document.getElementById("title");
const container = document.querySelector(".container");
const triviaQuestion = document.getElementById("trivia-question");
const questionCount = document.getElementById("question-count");
const nextBtn = document.getElementById("next-question-btn");
const resultBtn = document.getElementById("result-btn");
const answerCounter = document.getElementById("answer-count");
const questionCountContainer = document.querySelector(".question-count-container");
const scoreContainer = document.querySelector(".score-container");
const selectContainer = document.querySelector(".select-container");
const mySelect = document.getElementById("mySelect");
const timeSelectContainer = document.querySelector(".time-container");
const timeSelect = document.getElementById("select-questions");


const semicircles = document.querySelectorAll(".semicircle");
const timer = document.querySelector(".timer");
const timerContainer = document.querySelector(".timer-container");
const circleContainer = document.querySelector(".circle-container")


let timerLoop;

let data;
let currentQuestionIndex = 0;
let count = 1;
let answerCount = 0;




    const hr = 0;
    let min = 0;
    let sec = timeSelect.value;
    const hours = hr * 3600000;
    const minutes = min * 60000;
    const seconds = sec * 1000;

    let setTime = hours + minutes + seconds;

    const starTime = Date.now();

    let futureTime  = starTime + setTime;


    





button.addEventListener("click", () => {
    fetch('http://localhost:9000/questions.json')
    .then(res => res.json())
    .then(responseData => {
        data = responseData;
        console.log(data);
        

        for (let i = data.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [data[i], data[j]] = [data[j], data[i]];
        } 


    const hr = 0;
    let min = 0;
     sec = timeSelect.value;
    const hours = hr * 3600000;
    const minutes = min * 60000;
    const seconds = sec * 1000;

    let setTime = hours + minutes + seconds;

    const starTime = Date.now();

    let futureTime  = starTime + setTime;


        

        
        

        data.length = mySelect.value;

        loadQuestion(data,currentQuestionIndex)
        checkAnswer(data,currentQuestionIndex)
        showInputs();
        questionCount.textContent = `${count} of ${data.length}`
        button.style.display = "none";
        questionCountContainer.style.opacity=1;
        scoreContainer.style.opacity =1;
        answerCounter.textContent = answerCount;
        selectContainer.style.display = "none";
        timeSelectContainer.style.display ="none";
       
       
        
        if(timeSelect.value !=="unlimited"){
            timerContainer.style.opacity = 1;
            circleContainer.style.opacity = 1;
            timerLoop = setInterval(() => countDownTimer(futureTime, setTime,timerLoop),countDownTimer);
        }





       if(mySelect.value != 5){
        timer.style.marginRight ="3.4em"
       }
       
        
        
     
        
        
      
      

        
        
       
    })
    
    function loadQuestion(questions,index) {
        
        const currentQuestion = questions[index];
        triviaQuestion.textContent = currentQuestion.question;

        
        const radioInputs = document.querySelectorAll('input[name="answer"]');
        
        
        currentQuestion.options.forEach((option, optionIndex) => {
            
            radioInputs[optionIndex].value = option;
            
        });
    
        
        
    }


    function checkAnswer(answer, index){
        const radioInputs = document.querySelectorAll(`input[name="answer"]`);
        
        radioInputs.forEach(input => {
            input.addEventListener("click",() => {
                const turnOffInputs = radioInputs.forEach(input => {
                    input.disabled = true;
                });
                
                const selectedAnswer = input.value; 
                
                
                const correctAnswer = answer[index].answer;
                
                if(selectedAnswer === correctAnswer) {
                    console.log("correct");
                    input.classList.add("input-correct");
                    turnOffInputs;
                    
                    answerCount++;
                    answerCounter.textContent = answerCount;
                    removeHoverEffect()
                    clearInterval(timerLoop)

                    if(count === data.length){
                        resultBtn.style.display = "block";
                    }else{
                        nextBtn.style.display = "block";
                    }
                   
                    
                } else {
                    input.classList.add("input-wrong");
                    turnOffInputs;
                    answerCounter.textContent = answerCount;
                    removeHoverEffect()
                    clearInterval(timerLoop)
                    

                    if(count === data.length){
                        resultBtn.style.display = "block";
                    }else{
                        nextBtn.style.display = "block";
                    }


                    setTimeout(() => {
                        radioInputs.forEach(input => {
                            if(input.value ===correctAnswer){
                                input.classList.add("input-correct");
                            }
                        })
                    },300)
                    
                }
            });
        });
    }
    

    nextBtn.addEventListener("click", () => {
        count ++;
        currentQuestionIndex++;
        nextBtn.style.display = "none";
        loadQuestion(data,currentQuestionIndex);
        resetUi();
        questionCount.textContent = `${count} of ${data.length}`
        checkAnswer(data,currentQuestionIndex)
        addHoverEffect()
        
        if(timeSelect.value !== NaN){
            updateTimeAndResetTimer();
        }
        
        
        
    })

const resetUi = () => {
    const radioInputs = document.querySelectorAll(`input[name="answer"]`)

    radioInputs.forEach(input => {
        input.disabled = false;
        input.classList.remove("input-wrong")
        input.classList.remove("input-correct")
    })
}
const showInputs = () => {
    const radioInputs = document.querySelectorAll(`input[name="answer"]`)

    radioInputs.forEach(input => {
        input.style.opacity = 1;
        input.classList.add("hover-effect")
    })
}
const addHoverEffect = () => {
    const radioInputs = document.querySelectorAll(`input[name="answer"]`)

    radioInputs.forEach(input => {
        
        input.classList.add("hover-effect")
    })
}

const removeHoverEffect = () => {
    const radioInputs = document.querySelectorAll(`input[name="answer"]`)

    radioInputs.forEach(input => {
        
        input.classList.remove("hover-effect")
    })
}

function countDownTimer(futureTime,setTime,timerLoop){
    const currentTime = Date.now();
   
    const remainingTime = futureTime - currentTime;
    const angle = (remainingTime / setTime) * 360;
    
    if(angle > 180){
        semicircles[2].style.display = "none";
        semicircles[0].style.transform = "rotate(180deg)";
        semicircles[1].style.transform = `rotate(${angle}deg)`;
    }else{
        semicircles[2].style.display = "block";
        semicircles[0].style.transform = `rotate(${angle}deg)`;
        semicircles[1].style.transform = `rotate(${angle}deg)`;
    }
    
    
    
    const hrs = Math.floor((remainingTime / (1000 * 60 * 60))%24);
    const mins  = Math.floor((remainingTime / (1000 * 60)) % 60);
    const secs = Math.floor((remainingTime / (1000)) % 60);
    const miliSecs = remainingTime % 1000;
    
    const miliSecsStr = miliSecs.toString().padStart(3, '0').slice(0, 2);
    
    timer.innerHTML = `
    <div>${mins}<span id ="small-letter">m</span></div>
    <div>${secs}<span id ="small-letter">s</span></div>
    `
    
    
    
    if(mins === 0){
        timer.innerHTML = `
    <div>${secs}</div>
    `
    }
    if(remainingTime <= 10000){
        semicircles[0].style.background = "red";
        semicircles[1].style.background = "red";
        timer.style.color = "red";
        timer.innerHTML = `
        <div>${secs}.<span id ="mili-secs">${miliSecsStr}</span></div>
        `
    }
    
    if(remainingTime < 0){
        clearInterval(timerLoop);
        semicircles[0].style.display = "none";
        semicircles[1].style.display = "none";
        semicircles[2].style.display = "none";
        
            nextBtn.style.display = "block";
            const radioInputs = document.querySelectorAll(`input[name="answer"]`);

            radioInputs.forEach(input => {
                input.disabled = true;
            })
            removeHoverEffect();
        timer.innerHTML = `
    <div>0</div>
    `
    }
    
    }

    const resetTimer = (fTime,sTime) => {
        
        
        
        futureTime = Date.now() + setTime;
        clearInterval(timerLoop);
        timerLoop = setInterval(() => countDownTimer(fTime, sTime,timerLoop),countDownTimer);

        semicircles[0].style.display = "block";
        semicircles[1].style.display = "block";
        semicircles[2].style.display = "block";

        semicircles[0].style.background = "#33A1FD";
        semicircles[1].style.background = "#33A1FD";
        timer.style.color = "black";

    }

    function updateTimeAndResetTimer() {
        sec = parseInt(timeSelect.value);
        const hours = hr * 3600000;
        const minutes = min * 60000;
        const seconds = sec * 1000;
        setTime = hours + minutes + seconds; 
        futureTime = Date.now() + setTime; 
        resetTimer(futureTime, setTime); 
    }

   
    function turnOffInputs(){
        
    }


});


