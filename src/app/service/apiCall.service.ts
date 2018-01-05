import { Injectable, OnInit } from '@angular/core';
import { Headers, RequestOptions, Http } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { debuglog } from 'util';
@Injectable()
export class apiCallService implements OnInit {

    constructor(private http : Http) {
    }

    ngOnInit() {
    }

    public postApiCall(url,data) {
      
        var userToken = JSON.parse(localStorage.getItem('currentToken'));
        let headers = new Headers({ 'Authorization':userToken,'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(url,data,options)
      
            .map(res => {
           
            var newToken = res.json().data.Token;
            if(newToken != undefined){            
               localStorage.setItem('currentToken',JSON.stringify(newToken));
            }
                return res.json();
               
            })
            .catch(this.postApiCallhandleError);
    }
    public getApiCall(url) {
    
        var userToken = JSON.parse(localStorage.getItem('currentToken'));
        let headers = new Headers({ 'Authorization':userToken,'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.get(url, options)       
            .map(res => {
            
                
            var newToken = res.json().data.Token;
            if(newToken != undefined){
                localStorage.setItem('currentToken',JSON.stringify(newToken));

            }
                return res.json();
               
            })
            .catch(this.getApiCallhandleError);
    }
 public postApiCallhandleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json() || 'Server error');
      } public getApiCallhandleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json() || 'Server error');
      }
}