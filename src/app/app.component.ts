import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';

import { AuthenticationService } from './_services';
import { User } from './_models';

@Component({ selector: 'app', templateUrl: 'app.component.html', styleUrls: ['./app.component.css'] })
export class AppComponent {
    user!: User;

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) {
        this.authenticationService.user.subscribe(x => this.user = x);
    }

    logout() {
        this.authenticationService.logoutServer().pipe(first()).subscribe(response => {
            if (response.ok) {
                this.authenticationService.logout();
            }
        });;
    }
}