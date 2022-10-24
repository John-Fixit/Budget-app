import { Component, OnInit } from '@angular/core';
import { faArrowRight, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute, Router } from '@angular/router';
import { BudgetService } from '../services/budget.service';
@Component({
  selector: 'app-view-budget',
  templateUrl: './view-budget.component.html',
  styleUrls: ['./view-budget.component.css']
})
export class ViewBudgetComponent implements OnInit {
    arrowIcon = faArrowRight
    markIcon = faCheck
    unMarked = faTimes
    public budgetName: string = ""
    public budgetAmt: string = ""
    public budgetDeadline: string = ""
    public userIndex: any = ''
    public budgetDetail:any = {}
    public budgetArray: any = []
    public purchased: any = true
    public budgetIndex = ""
    public allUser: any = []
  constructor(
    public budgetRoute: ActivatedRoute,
    public route : Router,
    public budgetService: BudgetService
  ) { }

  ngOnInit(): void {
    this.budgetIndex = this.budgetRoute.snapshot.params['id'];
    if(localStorage['allUser']){
      this.allUser = this.budgetService.getUser()
    }
    let loginUser = JSON.parse(localStorage['authUser'])
    this.userIndex = this.allUser.findIndex((user:any, i:any)=> user.email == loginUser.email)
    this.budgetArray = this.allUser[this.userIndex]['budgetArray']
    this.budgetDetail = this.budgetArray.find((budget:any, i: any)=> i==this.budgetIndex)
    
    this.budgetAmt = this.budgetDetail.budgetAmt
    this.budgetDeadline = this.budgetDetail.budgetDeadline
    this.budgetName = this.budgetDetail.budgetName

    this.purchased = this.budgetArray[this.budgetIndex].purchased
  }

  saveChanges(){
      let editedBudget = {budgetName: this.budgetName, budgetAmt: this.budgetAmt, budgetDeadline:this.budgetDeadline}
      this.allUser[this.userIndex].budgetArray[this.budgetIndex] = editedBudget
      localStorage.setItem("allUser", JSON.stringify(this.allUser))
      window.location.reload()
  }

  deleteBudget(){
    let filteredBudget = this.budgetArray.filter((budget: any, i: any)=> i!=this.budgetIndex)
    this.allUser[this.userIndex].budgetArray = filteredBudget
    console.log(this.allUser);
    localStorage.setItem('allUser', JSON.stringify(this.allUser))
    this.route.navigate(['/budget_list'])
  }
  checkBox(){
    this.allUser[this.userIndex].budgetArray[this.budgetIndex].purchased = !this.purchased
    localStorage.setItem('allUser', JSON.stringify(this.allUser))
  }
}
