import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from '../auth/user.model';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
  singupForm: FormGroup;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.singupForm = new FormGroup({
      firstName: new FormControl(null, Validators.required),
      lastName: new FormControl(null, Validators.required),
      email: new FormControl(null, [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl(null, Validators.required),
      password2: new FormControl(null, Validators.required)
    });
  }

  onSubmit() {
    const { firstName, lastName, email, password, password2 } = this.singupForm.value;
    if (this.singupForm.valid && password === password2) {
      const user = new User(email, password, firstName, lastName);
      this.authService.signup(user)
        .subscribe(
          this.authService.login,
          this.authService.handleError,
        );
    }
  }
}
