import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

import { SelectModule } from 'ng2-select';
import { GoogleMapsAPIWrapper, AgmCoreModule } from 'angular2-google-maps/core';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterModule,
        SelectModule,
        AgmCoreModule.forRoot({
            libraries: ["places"],
      		apiKey: 'AIzaSyCl2VgZ2-JBN9DXXdRx70cxUv1N18MEzVc'
    	})
    ],
    declarations: [AuthComponent, LoginComponent, RegisterComponent],
    providers: [GoogleMapsAPIWrapper]
})
export class AuthModule {}
