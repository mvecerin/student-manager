import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Score } from 'src/app/model/score.model';
import { Student } from 'src/app/model/student.model';
import { DashboardService } from '../dashboard.service';
import { StudentsDialogComponent } from './students-dialog/students-dialog.component';

@Component({
  providers: [DashboardService],
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit, OnDestroy {

  students: Student[] = null;
  joins: any[] = null;
  studentSubscription = null;

  displayedColumns: string[] = ['number', 'jmbag', 'fName', 'lName', 'sum', 'edit', 'delete'];
  addString = 'Add a new student';
  editString = 'Edit student';

  constructor(private dashboardService: DashboardService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.init();
  }

  init() {

    // Students
    this.studentSubscription = this.dashboardService.getStudents()
    .pipe(map(value => {
      this.joins = []
      if(value) {
        value.forEach(e => {
          let sum = this.dashboardService.getSumForStudent(e._id);
          sum !== NaN
          ? this.joins.push(Object.assign(e, {sum: sum}))
          : this.joins.push(e);
        });
      }
      return value;
    }));

    this.studentSubscription.subscribe(res => {
      this.students = res;
    })
  }

  openDialog(title: string, edit: boolean, i?: number) {
    this.dialog.open(StudentsDialogComponent, {
      data: {
        data: i ? {...this.students[i]} : null,
        edit: edit,
        title: title
      }
    })
    .afterClosed()
    .subscribe(res => {
      if(res) {
        edit
        ? this.editStudent(res)
        : this.addStudent(res)
      }
    }, err => console.log);
  }

  addStudent(data: Student) {
    this.dashboardService.addStudent(data);
  }
  editStudent(data: Student) {
    this.dashboardService.editStudent(data);
  }
  deleteStudent(i: number) {
    this.dashboardService.deleteStudent(this.students[i]._id);
  }

  ngOnDestroy() {
    this.studentSubscription.unsubscribe();
  }


}
