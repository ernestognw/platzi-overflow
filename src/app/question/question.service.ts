import { Injectable } from '@angular/core';
import { Question } from './question-detail/question.model';
import { Http, Headers, Response } from '@angular/http';
import { environment } from '../../environments/environment';
import urljoin from 'url-join';
import { throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Answer } from '../answer/answer.model';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  private questionsUrl: string;

  constructor(private http: Http) {
    this.questionsUrl = urljoin(environment.apiUrl, 'questions');
  }

  getQuestions(): Promise<void | Question[]> {
    return this.http
      .get(this.questionsUrl)
      .toPromise()
      .then(res => res.json() as Question[])
      .catch(this.handleError);
  }

  getQuestion(id): Promise<void | Question> {
    const url = urljoin(this.questionsUrl, id);
    return this.http
      .get(url)
      .toPromise()
      .then(res => res.json() as Question)
      .catch(this.handleError);
  }

  getToken() {
    const token = localStorage.getItem('token');
    return `?token=${token}`;
  }

  addQuestion(question: Question) {
    const body = JSON.stringify(question);
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const token = this.getToken();

    return this.http.post(this.questionsUrl + token, body, { headers }).pipe(
      map((response: Response) => response.json()),
      catchError((error: Response) => throwError(error.json()))
    );
  }

  addAnswer(answer: Answer) {
    const a = {
      description: answer.description,
      question: {
        _id: answer.question._id
      }
    };
    const body = JSON.stringify(a);
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const url = urljoin(this.questionsUrl, answer.question._id.toString(), 'answers');
    const token = this.getToken();
    return this.http.post(url + token, body, { headers }).pipe(
      map((response: Response) => response.json()),
      catchError((error: Response) => throwError(error.json()))
    );
  }

  handleError(error: any) {
    const errMsg = error.message
      ? error.message
      : error.status
        ? `${error.status} - ${error.statusText}`
        : 'Server error';
    console.log(errMsg);
  }
}
