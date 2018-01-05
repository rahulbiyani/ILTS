import { Component,Input,OnInit } from '@angular/core';
import { EmitterService } from './service/emitter.service';
import {RouterModule} from '@angular/router';
import { Router  } from '@angular/router';
import { Location } from '@angular/common';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // showComponent:boolean; 
  // currentURL:string;
  
  @Input() public isLogin1: boolean = false;
  constructor(
    private emitterService: EmitterService,private router:Router,private location: Location) {
      // this.currentURL = location.path();
      
     }
     ngOnInit(){
    //this.activeNav();
      // this.isLogin1 = false;
    }
    activeNav(){
  this.isLogin1 = true;
    }
   
}
