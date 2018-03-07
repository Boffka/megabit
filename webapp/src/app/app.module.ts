import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SDKBrowserModule } from './shared/sdk/index';
import { AppComponent } from './app.component';
import { SocketService } from './shared/services/socket/socket.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { MyMaterial } from './material';
import { DashComponent } from './dash/dash.component';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from './app.router';
import { AuthService } from './shared/services/auth/auth.service';
import { AuthGuard } from './shared/services/auth/auth.guard';

@NgModule({
  declarations: [
    AppComponent,
    DashComponent,
    HomeComponent
  ],
  imports     : [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    SDKBrowserModule.forRoot(),
    AppRoutingModule,
    NgxChartsModule,
    MyMaterial
  ],
  providers   : [
    SocketService,
    AuthService,
    AuthGuard
  ],
  bootstrap   : [AppComponent]
})

export class AppModule {
}
