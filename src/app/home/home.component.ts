import { Component, OnInit } from '@angular/core';
import {HomeService} from './home.service';
import {HolidayService} from '../holiday-list/holiday-list.service';
import {RouterModule} from '@angular/router';
import { Router  } from '@angular/router';
import { DatePipe } from '@angular/common';
import * as moment from 'moment';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  leaveRequestArray = [];
  leaveHistoryArray = [];
  leaveBalanceCount = [];
  TableData: any = [];
  isManager:boolean = false
  currentrequest: any = [];
  ShowEditTable : boolean = false;
  EditRowID: any = '';
  constructor(private homeService: HomeService,private HolidayService: HolidayService,private router:Router) { }

  ngOnInit() {
   
     this.getLeaveBalance();
     this.checkIsManager();
  }
  private checkIsManager(){
          var user = JSON.parse(localStorage.getItem('userDetails'));
          this.isManager= user.isManager;
  }  
  private getLeaveRequest(){

    this.homeService.getLeaveRequest().subscribe(res =>{
      if(res.message == "No Results Found"){

        this.leaveRequestArray = [];
      }else{
        
      this.leaveRequestArray = res.data.Result;
      }
      this.getLeaveHistory();
      

    })
  }
  private getLeaveHistory(){

    this.homeService.getLeaveHistory().subscribe(res =>{
      if(res.message == "No Results Found"){

        this.leaveHistoryArray = [];
      }else{
        
        this.leaveHistoryArray = res.data.Result;
      }
      
     

    })
  }
  private getLeaveBalance(){

    this.HolidayService.getLeaveBalance().subscribe(res =>{
      this.leaveBalanceCount = res.data.Result;
     this.getLeaveRequest();

      
     

    })
  }
  Edit (val){
    this.EditRowID = val;
  }
 
  editEmployee(RequestID){  

    
    for(var i =0;i<this.leaveHistoryArray.length-1;i++){
      if(this.leaveHistoryArray[i].req_no == RequestID)
      var d = new Date(this.leaveHistoryArray[i].leave_start_date);
    
     
      this.currentrequest =  this.leaveHistoryArray[i];
    }
  }
    approveLeave(RequestID){
    let data = {reqNum:RequestID,comments:'approved'}
    if(confirm("Approve leave??")){
   this.homeService.ApproveLeave(data).subscribe(res => {
     console.log(res);
      alert(res.message);
      if (res.message == 'Success' && res.status == 200) {
        this.getLeaveRequest();
      }
    })
    }
  }

 rejectLeave(RequestID){   
    let data = {reqNum:RequestID,comments:'approved'}
    if(confirm("Reject Leave?")){  
   this.homeService.RejectLeave(data).subscribe(res => {
      console.log(res);
      alert(res.message);
      if (res.message == 'Success' && res.status == 200) {
        this.getLeaveRequest();
      }
    })
   }
  }

  
 
  
}
