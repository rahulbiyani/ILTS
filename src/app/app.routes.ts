import { Routes } from '@angular/router';
import {HomeComponent} from './home/home.component';
import { RequestLeaveComponent } from './request-leave/request-leave.component';
import { HolidayListComponent } from './holiday-list/holiday-list.component';
import { LeaveHistoryComponent } from './leave-history/leave-history.component';
import{LoginComponent} from './login/login.component';
// import { LayoutRoutes } from './layout/layout.routes';
// import { AuthenticationService } from './service/authentication/authentication.service';

// export const routes: Routes = [	
    // { path: '',   redirectTo: '/tracktrace', pathMatch: 'full', canActivate:[AuthenticationService]},
    // // ...LayoutRoutes,
    // { path: '**', redirectTo: '/tracktrace',  pathMatch: 'full', canActivate:[AuthenticationService] },
    
// ];
export const routes: Routes = [
    { path: '', redirectTo: 'IMSS/login', pathMatch: 'full' },
    { path: 'IMSS/login', component: LoginComponent },
    { path: 'IMSS/ILTS/dashboard', component: HomeComponent },
    { path: 'IMSS/ILTS/HolidayList', component: HolidayListComponent },
    { path: 'IMSS/ILTS/RequestLeave', component: RequestLeaveComponent },
    { path: 'IMSS/ILTS/LeaveHistory', component: LeaveHistoryComponent }
  ];