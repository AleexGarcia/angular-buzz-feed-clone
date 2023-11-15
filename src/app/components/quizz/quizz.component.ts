import { Component, OnInit } from '@angular/core';
import { TQuestion } from 'src/app/models/question';
import quizz_questions from '../../../assets/data/quizz_questions.json';

@Component({
  selector: 'app-quizz',
  templateUrl: './quizz.component.html',
  styleUrls: ['./quizz.component.scss'],
})
export class QuizzComponent implements OnInit {
  title: string = '';
  results: string = '';
  questions: TQuestion[] = [];
  questionSelected?: TQuestion;
  private questionIndex: number = 0;
  private questionMaxIndex!: number;
  isFinished: boolean = false;
  private answers = { A: 0, B: 0 };

  constructor() {}

  ngOnInit(): void {
    if (quizz_questions) {
      this.title = quizz_questions.title;
      this.questions = quizz_questions.questions;
      this.questionMaxIndex = this.questions.length - 1;
      this.questionSelected = this.questions[this.questionIndex];
    }
  }
  playerChoose(alias: string) {
    if (alias === 'A' || alias === 'B') {
      this.answers[alias]++;
      this.nextStep();
    }else{
      console.error('Alias deve ser A ou B');
    }
  }
  async nextStep() {
    this.questionIndex++;
    if (this.questionMaxIndex > this.questionIndex) {
      this.questionSelected = this.questions[this.questionIndex];
    } else {
      this.isFinished = true;
      this.results = quizz_questions.results[await this.checkResult()];
    }
  }
  async checkResult() {
    return this.answers.A > this.answers.B ? 'A' : 'B';
  }

  async restartQuizz() {
    this.questionIndex = 0;
    this.questionSelected = this.questions[this.questionIndex];
    this.isFinished = false;
    this.answers.A = 0;
    this.answers.B = 0;
  }
}
