import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Helper {

  constructor() { }

  public static getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
  }

  public static isLoggedIn() {
    let token = localStorage.getItem('usr');
    return (token !== null && token !== undefined && token !== '');
  }
}
