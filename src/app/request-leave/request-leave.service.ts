import { Injectable, OnInit } from '@angular/core';
import { Headers, RequestOptions, Http } from '@angular/http';
import { environment } from '../../environments/environment';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import {apiCallService} from '../service/apiCall.service';


@Injectable()
export class leaveSubmit implements OnInit {
    integraHoliday=[]
       constructor(private http: Http,private apiService : apiCallService) {
    }

    ngOnInit() {
        
    }
    getHolidayArray(){
        let holidayApiUrl = 'http://172.16.1.165:5000/holidayList/2016';
        
    return this.apiService.getApiCall(holidayApiUrl);
    
        
    
      }
    
    public submitLeave(data) {
        var requestLeaveApiUrl ='http://172.16.1.165:5000/requestLeave'
        return this.apiService.postApiCall(requestLeaveApiUrl,data);
 
}
}