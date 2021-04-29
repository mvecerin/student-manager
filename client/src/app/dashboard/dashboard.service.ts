import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Lesson } from '../model/lesson.model';
import { Score } from '../model/score.model';
import { Student } from '../model/student.model';
import { DataService } from '../shared/data.service';

@Injectable()
export class DashboardService implements OnDestroy {

  students: Student[] = null;
  studentSubject: BehaviorSubject<Student[]> = new BehaviorSubject(null);
  lessons: Lesson[] = null;
  lessonSubject: BehaviorSubject<Lesson[]> = new BehaviorSubject(null);
  scores: Score[] = null;
  scoreSubject: BehaviorSubject<Score[]> = new BehaviorSubject(null);

  constructor(private dataService: DataService) {
    this.init();
  }

  init() {

    // Scores
    this.dataService.getScores()
    .subscribe((res: {success: boolean, data: Score[]}) => {
      if(res.success) {
        this.scores = res.data;
        this.scoreSubject.next(this.scores);
      }
    });

    // Students
    this.dataService.getStudents()
    .subscribe((res: {success: boolean, data: Student[]}) => {
      if(res.success) {
        this.students = res.data;
        this.studentSubject.next(this.students);
      }
    });

    // Lessons
    this.dataService.getLessons()
    .subscribe((res: {success: boolean, data: Lesson[]}) => {
      if(res.success) {
        this.lessons = res.data;
        this.lessonSubject.next(this.lessons);
      }
    });
  }

  // Students
  getStudents() {
    return this.studentSubject;
  }
  addStudent(data: Student) {
    this.dataService.addStudent(data)
    .subscribe((res: {success: boolean, insertId?: any}) => {
      if(res.success) {
        data._id = res.insertId;
        this.students.push(data);
        this.studentSubject.next([...this.students]);
      }
    }),
    err => {
      console.log(err);
    };
  }
  editStudent(data: Student) {
    this.dataService.editStudent(data)
    .subscribe((res: {success: boolean}) => {
      if(res.success) {
        this.students[this.students.findIndex(e => e._id == data._id)] = data;
        this.studentSubject.next([...this.students]);
      }
    }),
    err => {
      console.log(err);
    };
  }
  deleteStudent(id: any) {
    this.dataService.deleteStudent(id)
    .subscribe((res: {success: boolean}) => {
      if(res.success) {
        this.students = this.students.filter(e => e._id != id);
        this.studentSubject.next([...this.students]);
      }
    }),
    err => {
      console.log(err)
    };
  }

  // Lessons
  getLessons() {
    return this.lessonSubject;
  }
  getLesson(id: any) {
    return this.dataService.getLesson(id);
  }
  addLesson(data: Lesson) {
    data.dateAdded = new Date();
    this.dataService.addLesson(data)
    .subscribe((res: {success: boolean, insertId?: any}) => {
      if(res.success) {
        data._id = res.insertId;
        this.lessons.push(data);
        this.lessonSubject.next([...this.lessons]);
      }
    }),
    err => {
      console.log(err);
    };
  }
  deleteLesson(id: any) {
    this.dataService.deleteLesson(id)
    .subscribe((res: {success: boolean}) => {
      if(res.success) {
        this.lessons = this.lessons.filter(e => e._id != id);
        this.lessonSubject.next([...this.lessons]);
      }
    }),
    err => {
      console.log(err)
    };
  }

  editLesson(data: Lesson) {
    this.dataService.editLesson(data)
    .subscribe((res: {success: boolean}) => {
      if(res.success) {
        this.lessons[this.lessons.findIndex(e => e._id == data._id)] = data;
        this.lessonSubject.next([...this.lessons]);
      }
    }),
    err => {
      console.log(err);
    };
  }

  // Scores
  getScores() {
    return this.scoreSubject;
  }
  getScore(id: any) {
    return this.scores.find(e => e._id == id);
  }
  getScoresByLessonId(id: any) {
    return this.dataService.getScoresByLessonId(id);
  }
  addScore(data: Score) {
    this.dataService.addScore(data)
    .subscribe((res: {success: boolean, insertId?: any}) => {
      if(res.success) {
        data._id = res.insertId;
        this.scores.push(data);
        this.scoreSubject.next([...this.scores]);
      }
    }),
    err => {
      console.log(err);
    };
  }
  editScore(data: Score) {
    this.dataService.editScore(data)
    .subscribe((res: {success: boolean}) => {
      if(res.success) {
        this.scores[this.scores.findIndex(e => e._id == data._id)] = data;
        this.scoreSubject.next([...this.scores]);
      }
    }),
    err => {
      console.log(err);
    };
  }

  getSumForStudent(studentId: any): number {
    return this.scores?.reduce((previous, current) => {
      if(current.studentId === studentId) {
        previous += current.score
      }
      return previous
    }, 0);
  }

  getAvgForLesson(lessonId: any): number {
    return this.scores?.reduce(([sum, count], current) => {
      return (current.lessonId === lessonId)
      ? [sum += current.score, count += 1]
      : [sum, count];
    }, [0, 0])
    .reduce((sum, count) => {
      return sum/count;
    });
  }

  ngOnDestroy() {
  //   this.studentSubject = null;
  //   this.scoreSubject = null;
  //   this.lessonSubject = null;
  //   this.lessons = null;
  //   this.scores = null;
  //   this.students = null;
   }

}
