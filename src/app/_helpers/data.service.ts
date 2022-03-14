import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private InfoSource = new BehaviorSubject('');
  currentInfo = this.InfoSource.asObservable();

  constructor() { }

  changeMessage(message: string) {
    this.InfoSource.next(message)
  }
}
