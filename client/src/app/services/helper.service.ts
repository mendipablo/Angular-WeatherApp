import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  private message = new BehaviorSubject<string>('');
  private message1 = new BehaviorSubject<string>('');
  private message2 = new BehaviorSubject<string>('');
  private message3 = new BehaviorSubject<string>('');
  private message4 = new BehaviorSubject<string>('');
  private message5 = new BehaviorSubject<string>('');

  public customMessage = this.message.asObservable();
  public customMessage1 = this.message1.asObservable();
  public customMessage2 = this.message2.asObservable();
  public customMessage3 = this.message3.asObservable();
  public customMessage4 = this.message4.asObservable();
  public customMessage5 = this.message5.asObservable();

  constructor() { }

  public changeMessage(msg: string): void {
    this.message.next(msg);
  }
  public changeMessage1(msg: string): void {
    this.message1.next(msg);
  }

  public passLocation(msg: string): void {
    this.message2.next(msg)
  }

  public passExtended(msg: string): void {
    this.message3.next(msg)
  }

  public passError(msg: string): void {
    this.message4.next(msg)
  }

  public passLoading(msg: string): void {
    this.message5.next(msg)
  }
}
