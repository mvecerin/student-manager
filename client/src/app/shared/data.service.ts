import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  apiRoot: string = environment.API_URL + '/api';
  authRoute = '/auth';
  lessonsRoute = '/lessons';
  scoresRoute = '/scores';
  studentsRoute = '/students';

  constructor(private http: HttpClient) { }

  // AUTH
  signup(user) {
    return this.http.post(this.apiRoot + this.authRoute + '/signup', user);
  }

  login(credentials) {
    return this.http.post(this.apiRoot + this.authRoute + '/login', credentials);
  }

  getCurrentUser() {
    return this.http.get(this.apiRoot + '/users/me');
  }

  // LESSONS
  getLessons() {
    return this.http.get(this.apiRoot + this.lessonsRoute);
  }
  getLesson(id) {
    return this.http.get(this.apiRoot + this.lessonsRoute + `/${id}`);
  }
  addLesson(lesson) {
    return this.http.post(this.apiRoot + this.lessonsRoute, lesson);
  }
  deleteLesson(id) {
    return this.http.delete(this.apiRoot + this.lessonsRoute + `/${id}`);
  }
  editLesson(lesson) {
    return this.http.put(this.apiRoot + this.lessonsRoute, lesson);
  }

  // STUDENTS
  getStudents() {
    return this.http.get(this.apiRoot + this.studentsRoute);
  }
  addStudent(student) {
    return this.http.post(this.apiRoot + this.studentsRoute, student);
  }
  deleteStudent(id) {
    return this.http.delete(this.apiRoot + this.studentsRoute + `/${id}`);
  }
  editStudent(student) {
    return this.http.put(this.apiRoot + this.studentsRoute, student);
  }

  // SCORES
  getScores() {
    return this.http.get(this.apiRoot + this.scoresRoute);
  }
  getScoresByLessonId(id) {
    return this.http.get(this.apiRoot + this.scoresRoute + `/lesson/${id}`);
  }
  addScore(score) {
    return this.http.post(this.apiRoot + this.scoresRoute, score);
  }
  deleteScore(id) {
    return this.http.delete(this.apiRoot + this.scoresRoute + `/${id}`);
  }
  editScore(score) {
    return this.http.put(this.apiRoot + this.scoresRoute, score);
  }

}
