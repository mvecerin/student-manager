import { Component } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import { DashboardComponent } from 'src/app/dashboard/dashboard.component';

@Component({
  selector: 'app-snack-bar',
  templateUrl: './snack-bar.component.html',
  styleUrls: ['./snack-bar.component.css']
})
export class SnackBarComponent {

  constructor(private _snackBar: MatSnackBar) {}

  openSnackBar() {
    this._snackBar.openFromComponent(DashboardComponent, {
      duration: 4 * 1000,
    });
  }

}
