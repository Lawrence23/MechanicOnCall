import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild } from '@angular/router';
import { CookieService } from 'angular2-cookie/services/cookies.service';

import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {
	constructor(
		private authService :AuthService,
		private router :Router,
		private cookie :CookieService
	) {}

	canActivate(route :ActivatedRouteSnapshot, state :RouterStateSnapshot) :boolean {
		let url :string = state.url;
		return this.checkLogin(url);
	};

	canActivateChild(route :ActivatedRouteSnapshot, state :RouterStateSnapshot) :boolean {
		return this.canActivate(route, state);
	};

	checkLogin(url :string) :boolean {
		if (this.cookie.getObject('user')) {
			return true;
		}

		// Store the attempted URL for redirecting
		this.authService.setRedirectUrl(url);

		// Navigate to the login page with extras
		this.router.navigate(['/login']);
		return false;
	};
}
