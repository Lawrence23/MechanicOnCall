import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ApiService {

	public baseUrl: string = 'http://10.9.12.227:7000'

    constructor(private http :Http) {}

    login(user :any) :Observable<any> {
		let url :string = this.baseUrl + '/api/v1/login/';
		let body :any = {
			email: user.email,
			password: user.password,
			status: ''
		};
		if (user.userType.text === 'Mechanic') {
			body.status = '1';
		} else {
			body.status = '0';
		}
		return this.http.post(url, body)
			.map( (response :Response) => {
				let json :any = response.json();
				return json as any;
			});
	};

	checkUser(user :any) :Observable<any> {
		console.log(user);
		let url :string = this.baseUrl + '/api/v1/signup/';
		let body :any = {
			email: user.email,
			status: ''
		};
		if (user.userType.text === 'Mechanic') {
			body.status = '1';
		} else {
			body.status = '0';
		}
		return this.http.post(url, body)
			.map( (response :Response) => {
				let json :any = response.json();
				return json as any;
			});
	};

	createCustomer(user :any) :Observable<any> {
		console.log(user);
		let url :string = this.baseUrl + '/api/v1/customer/';
		let body :any = {
			firstName: user.firstname,
    		lastName: user.lastname,
    		email: user.email,
    		contactNo: user.contactNo,
    		password: user.passwordGroup.password
		};
		return this.http.post(url, body)
			.map( (response :Response) => {
				let json :any = response.json();
				return json as any;
			});
	};

}
