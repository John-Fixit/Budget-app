import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {

  constructor() { }

  getUser(){
      return JSON.parse(localStorage['allUser'])
  }
  loginUser(){
    return JSON.parse(localStorage['authUser'])
  }
}
