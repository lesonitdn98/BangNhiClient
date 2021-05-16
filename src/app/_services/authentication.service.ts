import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '@environments/environment';
import { User } from '@app/_models';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private userSubject: BehaviorSubject<User>;
    public user: Observable<User>;

    constructor(
        private router: Router,
        private http: HttpClient
    ) {
        this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')!));
        this.user = this.userSubject.asObservable();

    }

    public get userValue(): User {
        return this.userSubject.value;
    }

    register(username: string, password: string, fullName: string, email: string) {
        return this.http.post<any>(`${environment.apiUrl}/auth/register?username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}&name=${encodeURIComponent(fullName)}&email=${encodeURIComponent(email)}`, null)
            .pipe(map(response => {
                if (response.ok) {
                    return response;
                }
            }));
    }

    login(username: string, password: string) {
        return this.http.post<any>(`${environment.apiUrl}/auth/login?username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`, null)
            .pipe(map(response => {
                if (response.ok) {
                    // store user details and basic auth credentials in local storage to keep user logged in between page refreshes
                    localStorage.setItem('user', JSON.stringify(response.data.user));
                    localStorage.setItem('accessToken', response.data.accessToken);
                    this.userSubject.next(response.data.user);
                    return response.data.user;
                }
            }));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('user');
        localStorage.removeItem('accessToken')
        this.userSubject.next(null!);
        this.router.navigate(['/login']);
    }

    logoutServer() {
        return this.http.post<any>(`${environment.apiUrl}/auth/logout`, null)
            .pipe(map(response => {
                return response;
            }));
    }
}