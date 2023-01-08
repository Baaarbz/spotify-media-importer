import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ImportInitializerService {

  private initSubject: BehaviorSubject<boolean>;

  constructor() {
    this.initSubject = new BehaviorSubject<boolean>(false);
  }

  init(init: boolean): void {
    this.initSubject.next(init);
  }

  get initObservable(): Observable<boolean> {
    return this.initSubject.asObservable();
  }
}
