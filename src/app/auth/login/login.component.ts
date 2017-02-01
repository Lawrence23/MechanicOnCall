import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import { ApiService } from '../../shared/api.service';

import { CustomValidators } from 'ng2-validation';
import { CookieService } from 'angular2-cookie/services/cookies.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    items: Array <any> = [{
        id: 1,
        text: 'Customer'
    }, {
        id: 2,
        text: 'Mechanic'
    }];
    userType: any = {};
    success: boolean;
    submitted: boolean

    constructor(
        private cookie :CookieService,
        private router: Router,
        private apiService: ApiService
    ) {
        this.loginForm = new FormGroup({
            email: new FormControl('', [Validators.required, CustomValidators.email]),
            password: new FormControl('', Validators.required),
            userType: new FormControl('', Validators.required)
        });
        this.success = false;
        this.submitted = false;
    }

    ngOnInit() {}

    validateAndLogin() {
        this.submitted = true;
        if (this.loginForm.valid) {
            this.apiService.login(this.loginForm.value).subscribe(
                (data :any) => {
                    if (data.status === '1') {
                        alert(data.message);
                        this.cookie.putObject('user', data.data[0]);
                        this.router.navigate(['/customer']);
                    }
                },
                (error :Error) => alert(error.message)
            );
        }
    }

    selected(value: any): void {
        this.userType = value;
        this.loginForm.patchValue({
            userType: value
        })
    }

    refreshValue(value: any): void {
        this.userType = value;
    }
}

