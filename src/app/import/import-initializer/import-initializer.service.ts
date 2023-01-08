import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ImportInitializerService {

  private initSubject: BehaviorSubject<boolean>;
  private finishedSubject: BehaviorSubject<boolean>;

  constructor() {
    this.initSubject = new BehaviorSubject<boolean>(false);
    this.finishedSubject = new BehaviorSubject<boolean>(false);
  }

  init(value: boolean): void {
    this.initSubject.next(value);
  }

  get initObservable(): Observable<boolean> {
    return this.initSubject.asObservable();
  }

  finish(value: boolean): void {
    this.finishedSubject.next(value);
  }

  get finishedObservable(): Observable<boolean> {
    return this.finishedSubject.asObservable();
  }
}
