import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { MyMaterial } from '../material';

@NgModule({
  imports     : [
    CommonModule,
    AuthRoutingModule,
    MyMaterial
  ],
  declarations: [AuthComponent, LoginComponent, RegisterComponent]
})
export class AuthModule {
}
