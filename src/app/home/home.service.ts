import { Injectable, OnInit } from '@angular/core';
import { Headers, RequestOptions, Http } from '@angular/http';
import { environment } from '../../environments/environment';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import{apiCallService} from "../service/apiCall.service"

@Injectable()
export class HomeService implements OnInit {

    constructor(private http: Http,private apiService:apiCallService) {
    }

    ngOnInit() {
    }

    

      public getLeaveRequest() {
        let leaveRequestsUrl = 'http://172.16.1.165:5000/leavesToApprove';
      
        return this.apiService.postApiCall(leaveRequestsUrl,"");
    }
   

      public getLeaveHistory() {
     
        let leaveRequestsUrl = 'http://172.16.1.165:5000/leaveHistory';
      
        return this.apiService.getApiCall(leaveRequestsUrl);
      }
        public ApproveLeave(approveData){
        let ApproveLeaveRequestsUrl = 'http://172.16.1.165:5000/approveLeave';
        let data = approveData;
        return this.apiService.postApiCall(ApproveLeaveRequestsUrl,data);
      }

        public RejectLeave(RejectData){
        let RejectLeaveRequestsUrl = 'http://172.16.1.165:5000/rejectLeave';
        let data =RejectData;
        return this.apiService.postApiCall(RejectLeaveRequestsUrl,data);
      }
     
}