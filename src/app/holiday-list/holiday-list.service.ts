import { Injectable, OnInit } from '@angular/core';
import { Headers, RequestOptions, Http } from '@angular/http';
import { environment } from '../../environments/environment';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import {apiCallService} from '../service/apiCall.service';


@Injectable()
export class HolidayService implements OnInit {

       constructor(private http: Http,private apiService : apiCallService) {
    }

    ngOnInit() {
        this.getLeaveBalance();
    }

    public getHolidays() {
        let currentYear =new Date().getFullYear();
        // let holidayApiUrl = 'http://172.16.1.165:5000/holidayList/'+currentYear;
        let holidayApiUrl = 'http://172.16.1.165:5000/holidayList/2016';
        
        return this.apiService.getApiCall(holidayApiUrl);
    }
    public getLeaveBalance() {
        let currentYear =new Date().getFullYear();
        let leaveBalanceApiUrl = 'http://172.16.1.165:5000/leaveBalanceOfEmployee';
        let data =JSON.stringify({year:'2017'});
        return this.apiService.postApiCall(leaveBalanceApiUrl,data);
      
      }
 
}