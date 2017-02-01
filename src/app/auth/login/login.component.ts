import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import { ApiService } from '../../shared/api.service';

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

    constructor(
        private router: Router,
        private apiService: ApiService
    ) {
        this.loginForm = new FormGroup({
            username: new FormControl(),
            password: new FormControl(),
            confirmPassword: new FormControl(),
            userType: new FormControl(),
            contactNo: new FormControl()
        });
        this.success = false;
    }

    ngOnInit() {}

    validateAndLogin() {
        /*switch (this.userType.id) {
            case "Customer":
                this.success = this.usersService.getUsers(this.loginForm.value);
                break;
            case "Mechanic":
                this.success = this.mechanicsService.getUsers(this.loginForm.value);
                break;
            default:
                break;
        }
        if (this.success) {
            this.router.navigate(['./home']);
        }*/
    }

    selected(value: any): void {
        this.userType = value;
    }

    refreshValue(value: any): void {
        this.userType = value;
    }
}

