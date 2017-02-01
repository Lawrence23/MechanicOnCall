import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApiService } from './api.service';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth-guard.service';

@NgModule({
    imports: [
        CommonModule
    ],
    providers: [ApiService, AuthService, AuthGuard]
})
export class SharedModule {}
