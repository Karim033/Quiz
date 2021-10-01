export class Quiz {

    constructor(questions) {

        this.questions = questions;
        this.totalQuestions = this.questions.length;
        this.currentQuestion = 0;
        this.isCorrect = false;
        this.score = 0;
        this.nextBtn = document.getElementById("next");
        this.nextBtn.addEventListener("click", this.nextQuestion.bind(this));

        document.getElementById("tryBtn").addEventListener("click" , this.tryAgain)

        this.showQuestions();
    }

    showQuestions() {
        document.getElementById("question").innerHTML = this.questions[this.currentQuestion].question;
        document.getElementById("currentQuestion").innerHTML = this.currentQuestion + 1;
        document.getElementById("totalNumberOfQuestions").innerHTML = this.totalQuestions;
        this.getAnswers();
    }
    getAnswers() {
        this.answers = [this.questions[this.currentQuestion].correct_answer, ...this.questions[this.currentQuestion].incorrect_answers];
        let currentIndex = this.answers.length, randomIndex;
        while (currentIndex != 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            [this.answers[currentIndex], this.answers[randomIndex]] = [this.answers[randomIndex], this.answers[currentIndex]];
        }
        this.cartoona = ``;
        for (let i = 0; i < this.answers.length; i++) {
            this.cartoona += `<div class="form-check">
            <label class="form-check-label">
                <input type="radio" class="form-check-input" name="answer" id="a${i}" value="${this.answers[i]}">
                ${this.answers[i]}  
            </label>
        </div>`
        }
        document.getElementById("rowAnswer").innerHTML = this.cartoona;
    }

    checkedUserAnswer() {

        this.userAnswer = document.getElementsByName("answer");
        this.userAnswer = [...this.userAnswer].filter(elm => elm.checked)[0].value;
        this.correct_answer = this.questions[this.currentQuestion].correct_answer;

        if (this.userAnswer == this.correct_answer) {
            this.score ++;
            this.isCorrect = true;
        }
        else {
            this.isCorrect = false;
        }
    }
    nextQuestion() {
        this.checkedUserAnswer();
        (this.isCorrect) ? $("#Correct").fadeIn(500, () => {
            $("#Correct").fadeOut(500)
        }) : $("#inCorrect").fadeIn(500, () => {
            $("#inCorrect").fadeOut(500)
        })
        this.currentQuestion++;
        if(this.currentQuestion < this.totalQuestions){
            this.showQuestions();
        }else{
            this.finish();
        }
        
    }

    finish(){
        $("#quiz").fadeOut(500 , ()=>{
            $("#finish").fadeIn(500);
        });
        document.getElementById("scored").innerHTML = this.score;
    }

    tryAgain(){
        $("#finish").fadeOut(500 , ()=>{
            $("#setting").fadeIn(500);
        })
    }

}