import { Component, OnInit } from '@angular/core';

import { HolidayService } from '../holiday-list/holiday-list.service';
import { Router } from '@angular/router';
import { apiCallService } from '../service/apiCall.service';
import { leaveSubmit } from './request-leave.service';
import * as moment from 'moment';
@Component({
  selector: 'app-request-leave',
  templateUrl: './request-leave.component.html',
  styleUrls: ['./request-leave.component.css']
})
export class RequestLeaveComponent implements OnInit {
  leaveBalanceCount = [];
  currentrequest: any = [];
  compensaryDate: any = []
  startDate; endDate; duration;
  integraHoliday = [];
  HolidayList: any = [];
  daysDiff;
  constructor(private HolidayService: HolidayService, private router: Router, private apiService: apiCallService, private leaverequest: leaveSubmit) { }

  ngOnInit() {

    this.getLeaveBalance();
    this.getHolidayArray();


    this.currentrequest = { leaveType: "", startDate: "", endDate: "", phone: "", reason: "", address: "", noOfLeaves: 0 };
    this.compensaryDate = [];
  }
  getHolidayArray() {

    this.leaverequest.getHolidayArray().subscribe(res => {
      this.HolidayList = res.data.Result;
      for (var i = 0; i < this.HolidayList.length - 1; i++) {
        this.integraHoliday.push(this.formatDate(this.HolidayList[i].day));

      }

    })


  }
  private getLeaveBalance() {

    this.HolidayService.getLeaveBalance().subscribe(res => {
      if (res.status == 200 && res.data.Result) {

        this.leaveBalanceCount = res.data.Result;
      }

    })
  }

  validEndDate(start, end) {

    this.startDate = new Date(start);
    this.endDate = new Date(end);
    this.duration = this.endDate - this.startDate;
    // this.duration = this.calculateDays(start,end)
    if (this.startDate > this.endDate) {
      alert("Start Date cannot be greater than End Date");
      this.currentrequest.StartDate = "";
      this.currentrequest.EndDate = "";
    }

  }
  validLeaveType() {

    var dayCount = this.calculateDays(this.formatDate(this.currentrequest.startDate), this.formatDate(this.currentrequest.endDate));

    var abc = this.formatDate(this.currentrequest.startDate);


    if (dayCount > 3 && this.currentrequest.leaveType == 1) {
      alert("You cannot apply more than 3 Casual Leave");
    }

    if (dayCount < 4 && this.currentrequest.leaveType == 2) {
      alert("You cannot apply less than 4 Casual Leave");
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

    return this.daysDiff;
  }

  SubmitLeave() {


    this.currentrequest.noOfLeaves = this.calculateDays(this.formatDate(this.currentrequest.startDate), this.formatDate(this.currentrequest.endDate))
    this.leaverequest.submitLeave(this.currentrequest).subscribe(res => {
      alert(res.message);
      if (res.message == 'Success') {
        this.router.navigate(['/IMSS/ILTS/dashboard']);
      }
    })
  }
}
