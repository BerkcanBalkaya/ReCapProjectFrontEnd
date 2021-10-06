import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DateTimeService {
  constructor() {}

  addDayToDate(dateToBeAffected: string, dayCount: number): string {
    let date = this.convertStringToDate(dateToBeAffected);
    date.setDate(date.getDate() + dayCount);
    let dateToString: string = `${this.formatDate(date)}T${this.convertHtmlTime(
      date
    )}`;
    return dateToString;
  }

  getToday(): string {
    let date = new Date();
    return this.formatDate(date);
  }

  getCurrentTime(): string {
    let date = new Date();
    return this.convertHtmlTime(date);
  }

  getTodayWithTime(): string {
    return `${this.getToday()}T${this.getCurrentTime()}`;
  }

  getCurrentYear(): string {
    let date = new Date();
    return `${date.getFullYear()}`;
  }

  formatDate(date: Date): string {
    return date.toLocaleDateString().split('.').reverse().join('-');
  }

  convertStringToDate(dateString: string): Date {
    return new Date(`${dateString}:00`);
  }

  convertHtmlTime(date: Date): string {
    let hours: string;
    let minutes: string;
    if (date.getHours().toLocaleString().length == 1) {
      hours = `0${date.getHours().toLocaleString()}`;
    } else {
      hours = date.getHours().toLocaleString();
    }
    if (date.getMinutes().toLocaleString().length == 1) {
      minutes = `0${date.getMinutes().toLocaleString()}`;
    } else {
      minutes = date.getMinutes().toLocaleString();
    }
    return `${hours}:${minutes}`;
  }
}
