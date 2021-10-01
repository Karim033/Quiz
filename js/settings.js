import {Quiz} from "./quiz.js"
export class settings {

    constructor() {
        this.questions;
        this.categoryElements = document.getElementById('category');
        this.numberOfQuestionsElements = document.getElementById('numberOfQuestions');
        this.difficultyElements = document.getElementsByName('difficulty');
        this.startBtn = document.getElementById('startBtn');
        startBtn.addEventListener('click', this.startQuiz.bind(this));
    }

    async startQuiz() {

        this.category = this.categoryElements.value;
        this.amount = this.numberOfQuestionsElements.value;
        this.difficulty = Array.from(this.difficultyElements).filter(elment => elment.checked)[0].value;
        this.questions = await this.fetchUrl(`https://opentdb.com/api.php?amount=${this.amount}&category=${this.category}&difficulty=${this.difficulty}`);
        if(this.questions.length > 0) {
            $("#setting").fadeOut(500, () => {
                $("#quiz").fadeIn(500);
            });
            new Quiz(this.questions);
        };
    }
    async fetchUrl(URL) {
        let response = await fetch(URL);
        let finalResult = await response.json();
        return finalResult.results;
    }
}