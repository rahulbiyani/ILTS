import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { JwtHelper } from 'angular2-jwt';
import { Router } from "@angular/router";
@Injectable()
export class AuthenticationService {
    public token: string = "";
   
    constructor(private http: Http,private router: Router) {
        // set token if saved in local storage
      
            var currentUser = JSON.parse(localStorage.getItem('currentUser'));
            this.token = currentUser && currentUser.token;
       
        
    }

    login(username: string, password: string): Observable<boolean> {
         
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post('http://172.16.1.165:5000/login', JSON.stringify({ username: username, password: password }), options)
            .map((response: Response) => {
         
               
                let userData = response.json() && response.json().data.Result[0];
              
                let token = response.json() && response.json().data.Result[0].token;
              
                if (token) {
                    // set token property
                    this.token = token;

                    // store username and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('userDetails',JSON.stringify(userData));
                    localStorage.setItem('currentUser', JSON.stringify({username: username, token: token}));
                    localStorage.setItem('currentToken', JSON.stringify(token));
                   
                    // return true to indicate successful login
                    return true;
                   
                } else {
                    // return false to indicate failed login
                    return false;
                }
            });
    }
    hasToken(){
        if(this.token == ""){
            return false;
        }else{
            return true;
        }

    }

    logout(): void {
        // clear token remove user from local storage to log user out
        this.token = null;
        localStorage.removeItem('currentUser');
    }
}