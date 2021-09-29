import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateTimeService {

  constructor() { }

  getToday(): string {
    let date = new Date();
    return this.formatDate(date);
  }

  getCurrentTime(): string {
    let date = new Date();
    return `${date.getHours()}:${date.getMinutes()}`;
  }

  getTodayWithTime(): string {
    return `${this.getToday()}T${this.getCurrentTime()}`;
  }

  formatDate(date: Date): string {
    return date.toLocaleDateString().split('.').reverse().join('-');
  }

  convertStringToDate(dateString: string): Date {
    return new Date(dateString);
  }

  getCurrentYear(){
    let date = new Date();
    return `${date.getFullYear()}`
  }
}
