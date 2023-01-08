import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ImportInitializerService {

  private runningSubject: BehaviorSubject<boolean>;

  constructor() {
    this.runningSubject = new BehaviorSubject<boolean>(false);
  }

  running(value: boolean): void {
    this.runningSubject.next(value);
  }

  get runningObservable(): Observable<boolean> {
    return this.runningSubject.asObservable();
  }
}
