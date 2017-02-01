import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';

@Injectable()
export class AuthService {
	isLoggedIn :boolean = false;

	// store the URL so we can redirect after logging in
	redirectUrl :string;

	setRedirectUrl(url :string) :void {
		this.redirectUrl = url;
	};

	getRedirectUrl() :string {
		return this.redirectUrl;
	};

	login() :Observable < boolean > {
		return Observable.of(true).do((val :boolean) => this.isLoggedIn = true);
	};

	logout() :void {
		this.isLoggedIn = false;
	};
}
