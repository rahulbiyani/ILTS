import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';


@Injectable()
export class EmitterService {
    private emitMenuToggle = new Subject<any>();
   

    toogleMenu = this.emitMenuToggle.asObservable();
    

    constructor() { }

   
    emitOnMenuToggle(change: any) {
        this.emitMenuToggle.next(change);
    }
    
}