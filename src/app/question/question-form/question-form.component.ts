import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Question } from '../question-detail/question.model';
import Icons from './icon';
import { QuestionService } from '../question.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-question-form',
  templateUrl: './question-form.component.html',
  styleUrls: ['./question-form.component.css'],
  providers: [QuestionService]
})
export class QuestionFormComponent implements OnInit {
  icons: Object[] = Icons;

  constructor(
    private questionService: QuestionService,
    private router: Router,
    ) { }

  getIconVersion(icon: any) {
    let version;
    icon.versions.font.includes('plain.wordmark') ?
      version = 'plain-wordmark' :
      icon.name === 'illustrator' ?
      version = icon.versions.svg[0] :
      version = icon.versions.font[0];
    return version;
  }

  getIconName(icon: any) {
    return icon.name;
  }

  onSubmit(form: NgForm) {
    const q = new Question(
      form.value.title,
      form.value.description,
      new Date(),
      form.value.icon,
    );
    console.log(q);
    this.questionService.addQuestion(q)
      .subscribe(
        ({ _id }) => this.router.navigate(['/questions', _id]),
        error => console.log(error)
      );
    form.resetForm();
  }

  ngOnInit() {
  }

}
