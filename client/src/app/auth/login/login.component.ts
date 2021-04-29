import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  message: string = null;

  constructor(private router: Router, private route: ActivatedRoute, private authService: AuthService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      'email' : new FormControl(null, [Validators.required, Validators.email]),
      'password' : new FormControl(null, Validators.required)
    });

    this.showSnackBar();

    this.authService.messageEmitter
    .subscribe((error: string) => {
      this.message = error;
    });
  }

  showSnackBar() {
    this.route.queryParams
    .subscribe(params => {
      if(params.registered !== undefined && params.registered === 'success') {
        this._snackBar.open('Successfully signed up! Please log in.', null, {duration: 2000,
        verticalPosition: 'top'});
        this.router.navigate([],
          {queryParams: { registered: null },
          queryParamsHandling: 'merge'
        });
      }
    });
  }

  login() {
    this.authService.login(this.form.value);
  }

}
