import { Injectable, OnInit } from '@angular/core';
import { Headers, RequestOptions, Http } from '@angular/http';
import { environment } from '../../environments/environment';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class leaveHistory implements OnInit {

    constructor(private http: Http) {
    }

    ngOnInit() {
    }

    public getLeaveHistory() {
 
        return this.http.get('assets/leaveHistory.json')
            .map(res => {
                return res.json();
            })
            .catch(this.handleError);
    }
    public handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json() || 'Server error');
      }
}