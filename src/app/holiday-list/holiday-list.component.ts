import { Component, OnInit } from '@angular/core';
import {HolidayService} from './holiday-list.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-holiday-list',
  templateUrl: './holiday-list.component.html',
  styleUrls: ['./holiday-list.component.css']
})
export class HolidayListComponent implements OnInit {
holidayArray:any[];
leaveBalanceCount:any[];
  constructor(private holidayList: HolidayService) { }

  ngOnInit() {
     this.getLeaveBalance();
  }
  private getHolidayList(){
      this.holidayList.getHolidays().subscribe(res =>{
        this.holidayArray = res.data.Result;
       
        localStorage.setItem('holidayList',JSON.stringify(this.holidayArray));
  
      })
    

  }
  private getLeaveBalance(){
    this.holidayList.getLeaveBalance().subscribe(res =>{
      this.leaveBalanceCount = res.data.Result;
      this.getHolidayList();
     

    })
  }

}
