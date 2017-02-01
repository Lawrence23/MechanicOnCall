import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ApiService {

	public baseUrl: string = 'http://10.9.12.227:7000'

    constructor(private http :Http) {}

    login(user :any) :Observable<any> {
		let url :string = this.baseUrl + '/api/v1/customer/';
		let body :Object = {
			email: user.username,
			password: user.password
		};
		return this.http.post(url, body)
			.map( (response :Response) => {
				let json :any = response.json();
				return json as any;
			});
	};

	checkUser(user :any) :Observable<any> {
		console.log(user);
		let url :string = this.baseUrl + '/api/v1/signup/';
		let body :Object = {
			email: user.email,
			status: ''
		};
		return this.http.post(url, body)
			.map( (response :Response) => {
				let json :any = response.json();
				return json as any;
			});
	};

}
