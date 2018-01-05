import { Component, OnInit,Input,EventEmitter } from '@angular/core';
import {HolidayService} from '../holiday-list/holiday-list.service';
import{HolidayListComponent} from '../holiday-list/holiday-list.component';
import { Router  } from '@angular/router';
import { Location } from '@angular/common';
// import { setTimeout } from 'timers';
import { AuthenticationService } from '../service/authentication.service';
import { EmitterService } from '../service/emitter.service';
@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {
  isLoginNav:boolean = true; 
  currentURL:string;
  @Input() userName:string;
  @Input() public isExpandMenu: boolean = false;
  constructor(private HolidayService: HolidayService,private router:Router,location: Location,
  private authService : AuthenticationService ,private emitterService: EmitterService) { 
    var user = JSON.parse(localStorage.getItem('currentUser'));
     this.userName = user.username;
  
  }
  ngOnInit() {

  }

}
