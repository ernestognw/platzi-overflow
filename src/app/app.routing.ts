import { Routes, RouterModule } from '@angular/router';
import { QuestionListComponent } from './question/question-list/question-list.component';
import { AuthComponent } from './auth/auth.component';
import { RegisterComponent } from './register/register.component';
import { QuestionDetailComponent } from './question/question-detail/question-detail.component';
import { QuestionFormComponent } from './question/question-form/question-form.component';


const QUESTION_ROUTES: Routes = [
  { path: '', component: QuestionListComponent },
  { path: 'new', component: QuestionFormComponent },
  { path: ':id', component: QuestionDetailComponent }
];

const APP_ROUTES: Routes = [
  { path: '', component: QuestionListComponent, pathMatch: 'full' },
  { path: 'signin', component: AuthComponent },
  { path: 'signup', component: RegisterComponent },
  { path: 'questions', children: QUESTION_ROUTES },
];

export const Routing = RouterModule.forRoot(APP_ROUTES);
