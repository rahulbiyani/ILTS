import { Injectable, OnInit } from '@angular/core';
import { Headers, RequestOptions, Http } from '@angular/http';
import { environment } from '../../environments/environment';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import {apiCallService} from '../service/apiCall.service';


@Injectable()
export class leaveHistory implements OnInit {

       constructor(private http: Http,private apiService : apiCallService) {
    }

    ngOnInit() {
        this.getleaveHistory();
    }

    
    public getleaveHistory() {
        let leaveRequestsUrl = 'http://172.16.1.165:5000/leaveHistory';
      
        return this.apiService.getApiCall(leaveRequestsUrl);
      
      }
   
    public cancelLeave(id){
        let leaveCancelUrl = 'http://172.16.1.165:5000/cancelLeave';
      let data ={reqNum:id}
        return this.apiService.postApiCall(leaveCancelUrl,data);
      }

      public updateLeave(updateData){
        let UpdateleaveRequestsUrl = 'http://172.16.1.165:5000/updateLeave';
        let data =updateData;
        return this.apiService.postApiCall(UpdateleaveRequestsUrl,data);
      }
 
}