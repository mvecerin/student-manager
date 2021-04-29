import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Lesson } from 'src/app/model/lesson.model';
import { Score } from 'src/app/model/score.model';
import { Student } from 'src/app/model/student.model';
import { DashboardService } from '../../dashboard.service';

@Component({
  providers: [DashboardService],
  selector: 'app-lesson',
  templateUrl: './lesson.component.html'
})
export class LessonComponent implements OnInit, OnDestroy {

  students: Student[] = null;
  scores: Score[] = null;
  studentSubscription: Subscription = null;
  scoreSubscription: Subscription = null;
  lesson: Lesson;
  joins: any[];

  displayedColumns: string[] = ['number', 'jmbag', 'fName', 'lName', 'maxScore', 'score'];

  constructor(private route: ActivatedRoute, private dashboardService: DashboardService) { }

  ngOnInit(): void {
    this.init();
  }

  init() {

    this.initLesson().toPromise()
    .then((res: {success: boolean, data: Lesson}) => {
      if(res.success) {
        this.lesson = res.data;
        return res.data._id;
      }
    }).then(e => {
      this.initStudents()
      return e;
    }).then(e => {
      this.initScores(e)
    });

  }

  initLesson() {
    const id = this.route.snapshot.params['id'];
    return this.dashboardService.getLesson(id);
  }
  initStudents() {
    this.studentSubscription = this.dashboardService.getStudents()
    .subscribe(res => {
      this.students = res;
    });
  }
  initScores(lessonId: any) {
    this.scoreSubscription = this.dashboardService.getScoresByLessonId(lessonId)
    .subscribe((res: {success: boolean, data: Score[]}) => {
      if(res.success) {
        this.scores = res.data;
      }
      if(this.scores) {
        this.joins = [];
        this.students.forEach(e => {
          if(this.getScoreForStudent(e._id) !== undefined) {
            let score = {score: {...this.getScoreForStudent(e._id)}};
            let element = Object.assign(e, score);
            this.joins.push(element);
          } else {
            this.joins.push(e);
          }
        });
      }
    });
  }

  // Scores
  getScoreForStudent(studentId: any): Score {
    return this.scores.find(e => {
      return e.studentId === studentId;
    });
  }

  addScore(newScore: number, studentId: any, event: any) {
    if(newScore <= this.lesson.maxScore) {
      let score = new Score();
      score.studentId = studentId;
      score.lessonId = this.lesson._id;
      score.score = newScore;
      this.dashboardService.addScore(score);
      event.target.style.color = "darkGreen"
    } else {
      event.target.style.color = "darkRed"
    }
  }
  editScore(newScore: number, score: Score, event: any) {
    if(newScore <= this.lesson.maxScore) {
      this.dashboardService.editScore(score);
      event.target.style.color = "darkGreen"
    } else {
      event.target.style.color = "darkRed"
    }
  }

  ngOnDestroy() {
    this.scoreSubscription.unsubscribe();
    this.studentSubscription.unsubscribe();
  }

}
