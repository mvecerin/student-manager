import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { map } from 'rxjs/operators';
import { Lesson } from 'src/app/model/lesson.model';
import { DashboardService } from '../dashboard.service';
import { LessonsDialogComponent } from './lessons-dialog/lessons-dialog.component';
@Component({
  providers: [DashboardService],
  selector: 'app-lessons',
  templateUrl: './lessons.component.html',
  styleUrls: ['./lessons.component.css']
})
export class LessonsComponent implements OnInit, OnDestroy {

  lessons: Lesson[] = null;
  joins: any[] = null;
  lessonSubscription = null;

  addString = 'Add a new lesson';
  editString = 'Edit lesson';
  displayedColumns: string[] = ['number', 'title', 'avg', 'maxScore', 'dateAdded', 'editLesson', 'scoreInput', 'deleteLesson'];

  constructor(private dashboardService: DashboardService, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.init();
  }

  init() {

    this.lessonSubscription = this.dashboardService.getLessons()
    .pipe(map(value => {
      this.joins = []
      if(value) {
        value.forEach(e => {
          let avg = this.dashboardService.getAvgForLesson(e._id);
          avg !== NaN
          ? this.joins.push(Object.assign(e, {avg: avg}))
          : this.joins.push(e);
        });
      }
      return value;
    }));
    this.lessonSubscription.subscribe(res => {
      this.lessons = res;
    });
  }

  openDialog(title: string, edit: boolean, i?: number) {
    this.dialog.open(LessonsDialogComponent, {
      data: {
        data: i ? {...this.lessons[i]} : null,
        edit: edit,
        title: title
      }
    })
    .afterClosed()
    .subscribe(res => {
      if(res) {
        edit
        ? this.editLesson(res)
        : this.addLesson(res)
      }
    }, err => console.log);
  }

  addLesson(data: Lesson) {
    this.dashboardService.addLesson(data);
  }
  deleteLesson(i: number){
    this.dashboardService.deleteLesson(this.lessons[i]._id);
  }
  editLesson(data: Lesson) {
    this.dashboardService.editLesson(data);
  }

  ngOnDestroy() {
    this.lessonSubscription.unsubscribe();
  }

}
