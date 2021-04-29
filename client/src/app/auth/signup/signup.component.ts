import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  form: FormGroup;
  message: string = null;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      'fName': new FormControl(null, Validators.required),
      'lName': new FormControl(null, Validators.required),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, Validators.required),
      'passwordRepeat': new FormControl(null, Validators.required),
    },
    this.passwordValidator);

    this.authService.messageEmitter
    .subscribe((message: string) => {
      this.message = message;
    });
  }

  passwordValidator(form: FormGroup) {
    return form.get('password').value === form.get('passwordRepeat').value ? null : {'mismatch': true};
  }

  signup() {
    const {passwordRepeat, ...user} = this.form.value;
    this.authService.signup(user);
  }
}
