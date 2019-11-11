import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(username) {
    this.currentUserSubject = new BehaviorSubject({name: username});
    // store user details and jwt token in local storage to keep user logged in between page refreshes
    localStorage.setItem('currentUser', JSON.stringify(username));
    this.router.navigate(['/home/book-finder']);
  }

  logout() {
    this.currentUserSubject = null;
    localStorage.removeItem('currentUser');
  }

  constructor(private router: Router) {
    this.currentUserSubject = new BehaviorSubject(null);
    const loggedInUser: string = JSON.parse(localStorage.getItem('currentUser'));
    if (loggedInUser) {
      this.login(loggedInUser);
    }
  }
}
