import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BudgetService } from '../services/budget.service';
@Component({
  selector: 'app-create-budget',
  templateUrl: './create-budget.component.html',
  styleUrls: ['./create-budget.component.css']
})
export class CreateBudgetComponent implements OnInit {

  public budgetName: any = "";
  public budgetAmt: any = "";
  public budgetDeadline: any = "";
  public budgetTotalAmount: number = 0
  public budgetIndex: any = ""
  public userIndex:any = ""
  public message: any = ""
  public budgetObject = {}
  public budgetArray: any = []
  public allUser: any = []
  public errorSuccess: any = undefined
  constructor(
    public router : Router,
    public budgetService: BudgetService
  ) { 
  }

  ngOnInit(): void {
      this.allUser = this.budgetService.getUser()
    let authUser = this.budgetService.loginUser()
    
    this.userIndex = this.allUser.findIndex((user:any, i:any)=> user.email==authUser.email)

  }

  addNewBudget(){
    let budgetObject = {budgetName: this.budgetName, budgetAmt:this.budgetAmt, budgetDeadline:this.budgetDeadline, purchased: false}
    if(this.budgetName !="" && this.budgetAmt!=""&& this.budgetDeadline!=""){
      this.allUser[this.userIndex]['budgetArray'].push(budgetObject)
      localStorage.setItem('allUser', JSON.stringify(this.allUser))
      this.errorSuccess = true
      this.message = "Budget added successfully! navigate to check budget list to view"
      this.budgetName = ""
      this.budgetAmt = ""
      this.budgetDeadline = ""
    }
    else{
      this.errorSuccess = false
      this.message = `Please kindly fill up the required inputs`
    }
   
  }
  
  
}
