import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';
import { User } from '../shared/user.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  user: User = null;

  constructor(private authService: AuthService, private route: ActivatedRoute, private router: Router, private _snackBar: MatSnackBar) { }


  ngOnInit(): void {
    this.init();
  }

  async init() {

    // SnackBar
    this.showSnackBar();

    // Current user
    this.authService.whoAmI()
    .subscribe((res: {success: boolean, user?: User}) => {
      if(res.success) {
        this.user = res.user;
      }
    });

  }

  showSnackBar() {
    this.route.queryParams
    .subscribe(params => {
      if(params.authenticated !== undefined && params.authenticated === 'success') {
          this._snackBar.open('Successfully authenticated!', null, {duration: 2000,
          verticalPosition: 'top'});
          this.router.navigate([],
            {queryParams: { authenticated: null },
            queryParamsHandling: 'merge'
          });
      }
    });
  }

  logout() {
    this.user = null;
    this.authService.logout();
  }

}
