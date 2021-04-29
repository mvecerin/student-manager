import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { DataService } from './data.service';
import { User } from './user.model';
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user: User;
  private token: string;
  messageEmitter: Subject<string> = new Subject<string>();
  authChange: Subject<boolean> = new Subject<boolean>();
  private currentUserSubject = new BehaviorSubject<any>(null);

  constructor(private router: Router, private dataService: DataService) { }

  signup(user: User) {
    this.dataService.signup(user)
    .subscribe((res: {success: boolean, msg: string, insertId?: any}) => {
      if(res.success && res.insertId) {
        this.router.navigate(['../auth/login'],
        {queryParams: { registered: 'success' }});
      } else {
        this.messageEmitter.next(res.msg);
      }
    },
    err => {
      this.messageEmitter.next(err.error.msg);
    });
  }

  login(credentials: {email: string, password: string}) {
    this.dataService.login(credentials)
    .subscribe((res: {success: boolean, msg: string, token?: string, user?: User}) => {
      if(res.success) {
        this.user = res.user;
        this.token = res.token;
        localStorage.setItem('token', this.token);
        this.authChange.next(true);
        this.currentUserSubject.next(this.user);
        this.router.navigate(['/lessons'], {queryParams: { authenticated: 'success' } });
      }
      else {
        this.messageEmitter.next(res.msg);
      }
    },
    err => {
      this.messageEmitter.next(err.error.msg);
    });
  }

  logout() {
    this.user = null;
    this.token = null;
    localStorage.removeItem('token');
    this.authChange.next(false);
    this.currentUserSubject.next(null);
    this.router.navigate(['../auth/login']);
  }

  getUser() {
    return this.user;
  }

  isAuthenticated(): boolean{
    return this.getToken() !== null;
  }

  getToken() {
    if(this.token) {
      return this.token;
    } else {
      if (localStorage.getItem('token')) {
        return localStorage.getItem('token');
      } else {
        return null;
      }
    }
  }

  whoAmI() {
    if(this.getToken()) {
      return this.dataService.getCurrentUser()
      .pipe(map((res: {success: boolean, user?: User, msg?: string}) => {
        if(res.success) {
          this.user = res.user;
          this.currentUserSubject.next(this.user);
          this.authChange.next(true);
        }
        return res;
      }));
    }
    else {
      return new Observable(observer => {
        observer.next({success: false})
      })
    }
  }

}
