import { Component } from '@angular/core';
import { first } from 'rxjs/operators';

import { User } from '@app/_models';
import { UserService } from '@app/_services';

import { AuthenticationService } from '../_services';

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent {
    loading = false;
    user!: User;
    users!: User[];

    constructor(
        private userService: UserService,
        private authenticationService: AuthenticationService
    ) {
        this.authenticationService.user.subscribe((x: User) => this.user = x);
    }

    ngOnInit() {
        this.loading = true;
        this.userService.getAll().pipe(first()).subscribe(users => {
            this.loading = false;
            this.users = users;
        });
    }
}