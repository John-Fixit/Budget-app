import { Component, OnInit } from '@angular/core';
import { faCheck, faUser, faContactCard as contactIcon, faTimes as unMarked} from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
@Component({
  selector: 'app-budget-list',
  templateUrl: './budget-list.component.html',
  styleUrls: ['./budget-list.component.css']
})
export class BudgetListComponent implements OnInit {
  icons = { faUser, faCheck, contactIcon, unMarked}
  public budgetName: any = "";
  public budgetAmt: any = "";
  public budgetDeadline: any = "";
  public budgetTotalAmount: number = 0
  public budgetPurchasedAmount: number = 0
  public budgetUnPurchasedAmount: number = 0
  public budgetIndex: any = ""
  public budgetObject: any = {}
  public authUser: any = {}
  public allUser: any = []
  public userIndex: any = ""
  public budgetArray: any = []

  constructor(
  public route: Router
  ) { }

  ngOnInit(): void {
    if(localStorage['allUser']){
        this.allUser = JSON.parse(localStorage['allUser'])
    }
    if(localStorage['authUser']){
      let loginUser = JSON.parse(localStorage['authUser'])
      this.authUser = this.allUser.find((user:any, i:any)=> user.email == loginUser.email)
      this.userIndex = this.allUser.findIndex((user:any, i:any)=> user.email == loginUser.email)
      
      this.budgetArray = this.allUser[this.userIndex]['budgetArray'];
      
    }
    else{
      this.route.navigate(['/signin'])
    }

    let totalBudgetAmount = 0
    let totalUnpurchasedBudget = 0
    let totalPurchasedBudget = 0
    this.budgetArray.map((budget: any, i: any)=> {
        totalBudgetAmount+= parseInt(budget.budgetAmt)
        if(!budget.purchased){
          totalUnpurchasedBudget+= parseInt(budget.budgetAmt)
        }
        else if(budget.purchased){
          totalPurchasedBudget+= parseInt(budget.budgetAmt)
        }

    })
    this.budgetUnPurchasedAmount = totalUnpurchasedBudget
    this.budgetPurchasedAmount = totalPurchasedBudget
    this.budgetTotalAmount = totalBudgetAmount
  }
  modalOutIndex(i: any){
    this.budgetIndex = i
    this.budgetObject = this.budgetArray[i]
  }
    saveEdit(){
      this.budgetArray[this.budgetIndex] = {budgetName: this.budgetName, budgetAmt:this.budgetAmt, budgetDeadline:this.budgetDeadline}

      let totalProduct = 0
      this.budgetArray.map((item: any)=>
          totalProduct += parseInt(item.budgetAmt)
      )
        this.budgetTotalAmount = totalProduct
    }
    deleteBudget(){
      this.budgetArray = this.budgetArray.filter((budget:any, index: any)=>index!=this.budgetIndex)
      let totalProduct = 0
      this.budgetArray.map((item: any)=>
          totalProduct += parseInt(item.budgetAmt)
      )
        this.budgetTotalAmount = totalProduct
    }


}
