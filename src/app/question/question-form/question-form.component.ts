import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Question } from '../question-detail/question.model';
import Icons from './icon';

@Component({
  selector: 'app-question-form',
  templateUrl: './question-form.component.html',
  styleUrls: ['./question-form.component.css']
})
export class QuestionFormComponent implements OnInit {
  icons: Object[] = Icons;

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
  }

  constructor() { }

  ngOnInit() {
  }

}
