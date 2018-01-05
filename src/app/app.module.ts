import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule} from '@angular/router';
import { HttpModule } from '@angular/http';
import { DatePipe } from '@angular/common';
import { AppComponent } from './app.component';
import { HolidayListComponent } from './holiday-list/holiday-list.component';
import {HolidayService} from './holiday-list/holiday-list.service';
import { SideNavComponent } from './side-nav/side-nav.component';
import { RequestLeaveComponent } from './request-leave/request-leave.component';
import { routes } from './app.routes';
import { HomeComponent } from './home/home.component';
import {leaveSubmit} from './request-leave/request-leave.service'
import { LeaveHistoryComponent } from './leave-history/leave-history.component';
import {leaveHistory} from './leave-history/leave-history.service';
import { LoginComponent } from './login/login.component';
import { FormsModule }   from '@angular/forms';
import { AuthenticationService } from './service/authentication.service';
import { JwtHelper } from 'angular2-jwt';
import { EmitterService } from './service/emitter.service';
import {HomeService} from './home/home.service';
import {apiCallService} from './service/apiCall.service';
import * as moment from 'moment';
@NgModule({
  declarations: [
    AppComponent,
    HolidayListComponent,
    SideNavComponent,
    RequestLeaveComponent,
    HomeComponent,
    
    LeaveHistoryComponent,
    LoginComponent,

  ],
  imports: [
    BrowserModule,
    RouterModule,
    HttpModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [HolidayService,leaveHistory,AuthenticationService,EmitterService,HomeService,apiCallService,leaveSubmit],
  bootstrap: [AppComponent]
})
export class AppModule { }
