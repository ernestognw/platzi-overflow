import { Injectable } from '@angular/core';
import urljoin from 'url-join';
import { environment } from '../../environments/environment';
import { User } from './user.model';
import { Http, Headers } from '@angular/http';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  usersUrl: string;
  currentUser?: User;

  constructor(
    private http: Http,
    private router: Router,
    public snackbar: MatSnackBar
  ) {
    this.usersUrl = urljoin(environment.apiUrl, 'auth');
    if (this.isLoggedIn()) {
      const { userId, firstName, lastName, email } = JSON.parse(localStorage.getItem('user'));
      this.currentUser = new User(email, null, firstName, lastName, userId);
    }
  }

  signin(user: User) {
    const body = JSON.stringify(user);
    const headers = new Headers({ 'Content-Type': 'application/json' });
    return this.http.post(urljoin(this.usersUrl, 'signin'), body, { headers }).pipe(
      map((response: Response) => {
        const json: any = response.json();
        this.login(json);
        return json;
      }),
      catchError((error: Response) => {
        console.log(error);
        return throwError(error);
      })
    );
  }

  login = ({ token, userId, firstName, lastName, email }) => {
    this.currentUser = new User(email, null, firstName, lastName, userId);
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify({ userId, firstName, lastName, email }));
    this.router.navigateByUrl('/');
  }

  isLoggedIn() {
    return localStorage.getItem('token') !== null;
  }

  logout() {
    localStorage.clear();
    this.currentUser = null;
    this.router.navigateByUrl('/signin');
  }

  signup(user: User) {
    const body = JSON.stringify(user);
    const headers = new Headers({ 'Content-Type': 'application/json' });
    return this.http.post(urljoin(this.usersUrl, 'signup'), body, { headers }).pipe(
      map((response: Response) => {
        const json: any = response.json();
        this.login(json);
        return json;
      }),
      catchError((error: Response) => {
        console.log(error);
        return throwError(error);
      })
    );
  }

  showError(message) {
    this.snackbar.open(message, 'x', { duration: 2500 });
  }

  public handleError = (error: any) => {
    const { error: { name }, message } = error;
    if (name === 'TokenExpiredError') {
      this.showError('Tu sesión ha expirado');
    } else if (name === 'JsonWebTokenError') {
      this.showError('Ha habido un problema con tu sesión');
    } else {
      this.showError(message || 'Ha ocurrido un error. Inténtalo de nuevo');
    }
    this.logout();
  }
}
