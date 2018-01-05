import { Component, OnInit ,ViewChild, ElementRef} from '@angular/core';
import { leaveHistory } from './leave-history.service';
import { HolidayService } from '../holiday-list/holiday-list.service';
import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-leave-history',
  templateUrl: './leave-history.component.html',
  styleUrls: ['./leave-history.component.css'],


})
export class LeaveHistoryComponent implements OnInit {
  
  leaveHistoryDetails = [];
  date;
  currentId;
  leaveBalanceCount = [];
  leaveApprovedStatus = [];
  leaveCancelledStatus = [];
  leaveRejectedStatus = [];
  leaveHistoryAll = [];
  leavesPending = [];
  leaveHistoryList = [];
  title: string;
  currentrequest: any = [];
  ShowEditTable: boolean = false;
  EditRowID: any = '';
  integraHoliday = [];
  HolidayList: any = [];
  daysDiff;
  endDate;
  startDate;
  constructor(private leaveHistory: leaveHistory, private HolidayService: HolidayService,private router:Router) { }

  ngOnInit() {
    this.getleaveHistoryDetails();
    this.getList(1);
  }

  private getleaveHistoryDetails() {

    this.leaveHistory.getleaveHistory().subscribe(res => {
      // if(data.Status == 'Pending'){
      // res.data.Result
      this.leaveHistoryDetails = res.data.Result;
      for (let i = 0; i < this.leaveHistoryDetails.length; i++) {
        if (this.leaveHistoryDetails[i].status == 'approved') {
          this.leaveApprovedStatus.push(this.leaveHistoryDetails[i])

        }
        if (this.leaveHistoryDetails[i].status == 'cancel') {
          this.leaveCancelledStatus.push(this.leaveHistoryDetails[i])

        }
        if (this.leaveHistoryDetails[i].status == 'rejected') {
          this.leaveRejectedStatus.push(this.leaveHistoryDetails[i])

        }
        if (this.leaveHistoryDetails[i].status == 'Pending') {
          this.leavesPending.push(this.leaveHistoryDetails[i])

        }
        // else{
        //   this.leaveHistoryAll.push(this.leaveHistoryDetails[i])
        // }
      }

      console.log(this.leaveHistoryDetails);
      // }
    })
  }
  getList(a) {
    if (a == 1) {
      this.title = "Approved Leaves"

      this.leaveHistoryList = this.leaveApprovedStatus;
    }
    if (a == 3) {
      this.title = "Cancelled Leaves"
      this.leaveHistoryList = this.leaveCancelledStatus;
    }
    if (a == 2) {
      this.title = "Rejected Leaves"
      this.leaveHistoryList = this.leaveRejectedStatus;
    }
    if (a == 4) {
      this.title = "Pending Leaves"
      this.leaveHistoryList = this.leavesPending;
    }
    if (a == 5) {
      this.title = "All Leaves"
      this.leaveHistoryList = this.leaveHistoryDetails;
    }
  }
  Edit(val) {
    this.EditRowID = val;
  }

  editLeave(RequestID) {


    console.log(this.leaveHistoryDetails);
    for (var i = 0; i < this.leaveHistoryDetails.length - 1; i++) {
      if (this.leaveHistoryDetails[i].req_no == RequestID) {

        // var d = new Date(this.leaveHistoryDetails[i].leave_start_date);

        // console.log(d)
        this.currentrequest = this.leaveHistoryDetails[i];
      }
    }
    console.log(this.currentrequest);
    this.date = moment(this.currentrequest.leave_start_date).format('DD-MM-YYYY');
    console.log(this.date)
    

  }

  
  cancelLeave(id) {

    this.currentId = id;
 
  }
  close() {
    let leaveRequestsUrl = 'http://172.16.1.165:5000/leavesToApprove';

    this.leaveHistory.cancelLeave(this.currentId).subscribe(res => {
      if (res.message == 'Success') {
        this.getleaveHistoryDetails();
      }
    })
  }
  updateLeave(leave) {

    console.log(this.currentrequest);

  this.validLeaveType();
  this.validEndDate(this.currentrequest.leave_start_date,this.currentrequest.leave_end_date);
  var LeavesCount =this.calculateDays(this.currentrequest.leave_start_date,this.currentrequest.leave_start_date)
if(this.currentrequest.leave_end_date != "" || this.currentrequest.leave_start_date != "" || this.currentrequest.leave_type != "" ||
this.currentrequest.reason != "" || this.currentrequest.phone != ""){
  
  var data = {
    reqNum: this.currentrequest.req_no,
    startDate: this.currentrequest.leave_start_date,
    endDate: this.currentrequest.leave_end_date,
    leaveType: this.currentrequest.leave_type,
    reason: this.currentrequest.reason,
    address: this.currentrequest.contact_details,
    phone: this.currentrequest.phone_no,
    noOfLeaves: LeavesCount
  };

    this.leaveHistory.updateLeave(data).subscribe(res => {
      alert(res.message);
      if (res.message == 'Success' && res.status == 200)
      {
        
        this.getleaveHistoryDetails();
        this.router.navigate(['/IMSS/ILTS/dashboard']);
      }

    })
}
    

  }
  validEndDate(start, end) {

    this.startDate = new Date(start);
    this.endDate = new Date(end);
    // this.duration = this.calculateDays(start,end)
    if (this.startDate > this.endDate) {
      alert("Start Date cannot be greater than End Date");
      this.currentrequest.leave_start_date = "";
      this.currentrequest.leave_end_date = "";
    }

  }
  validLeaveType() {

    console.log(this.currentrequest.leaveType);
    var dayCount = this.calculateDays(this.formatDate(this.currentrequest.leave_start_date), this.formatDate(this.currentrequest.leave_end_date));
    //  var dayCount =this.calculateDays("5 January, 2018","22 January, 2018");
    console.log(dayCount);
    var abc = this.formatDate(this.currentrequest.leave_start_date);

    console.log("abc", abc)
    if (dayCount > 3 && this.currentrequest.leave_type == 1) {
      alert("You cannot apply more than 3 Casual Leave");
    }
    if (dayCount < 4 && this.currentrequest.leave_type == 2) {
      alert("You cannot apply less than 3 Casual Leave");
    }

  }


  pad(num) { return ("0" + num).slice(-2); }
  formatDate(date) { var d = new Date(date), dArr = [d.getFullYear(), this.pad(d.getMonth() + 1), this.pad(d.getDate())]; return dArr.join('-'); }

  calculateDays(a, b) {

    var first = new Date(a);
    var last = new Date(b);
    var aDay = 24 * 60 * 60 * 1000
    this.daysDiff = ((last.getTime() - first.getTime()) / aDay) + 1;
    if (this.daysDiff > 0) {
      for (var i = first.getTime(), lst = last.getTime(); i <= lst; i += aDay) {
        var d = new Date(i);
        if (d.getDay() == 6 || d.getDay() == 0 // weekend
          || this.integraHoliday.indexOf(this.formatDate(d)) != -1) {
          this.daysDiff--;
        }
      }
    }
    console.log(this.daysDiff);
    return this.daysDiff;
  }
}