import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from './user.model';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  authForm: FormGroup;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authForm = new FormGroup({
      email: new FormControl(null, [
        Validators.required,
        Validators.email,
      ]),
      password: new FormControl(null, Validators.required)
    });
  }

  onSubmit() {
    if (this.authForm.valid) {
      const { email, password } = this.authForm.value;
      const user = new User(email, password, null, null);
      this.authService.signin(user)
        .subscribe(
          this.authService.login,
          this.authService.handleError,
        );
    }
  }

}
