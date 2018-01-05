import { Component, OnInit ,Input,Output,EventEmitter} from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../service/authentication.service';
import { FormsModule }   from '@angular/forms';
import { EmitterService } from '../service/emitter.service';
import { Location } from '@angular/common';
import {AppComponent} from "../app.component"
@Component({
    moduleId: module.id,
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
    model: any = {};
    loading = false;
    error = '';
    // isLogin: boolean = true;
    @Input() public isLogin1: boolean = true;
    @Output()
    change: EventEmitter<boolean> = new EventEmitter<boolean>();
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService,
    private emitterService: EmitterService,private appComp : AppComponent) { }

    ngOnInit() {
        // reset login status
        this.authenticationService.logout();
    }

    login() {
        this.loading = true;
        this.authenticationService.login(this.model.username, this.model.password)
            .subscribe(result => {
                if (result === true) {
                   
                    
                    this.appComp.activeNav();
                    this.router.navigate(['/IMSS/ILTS/dashboard']);
                   
                   
                } else {
                    this.error = 'Username or password is incorrect';
                    this.loading = false;
                }
            });
    }
}