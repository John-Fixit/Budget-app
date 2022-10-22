import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BudgetListComponent } from './budget-list/budget-list.component';
import { CreateBudgetComponent } from './create-budget/create-budget.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { ViewBudgetComponent } from './view-budget/view-budget.component';

const routes: Routes = [

    {path: '', component: SignupComponent, title: 'Sign up'},
    {path: 'signin', component: SigninComponent, title: 'Sign in'},
    {path: 'budget_list', children: [
      {path: '', component: BudgetListComponent, title: 'Budget List'},
      {path: 'add_budget', component: CreateBudgetComponent, title: 'Add Budget'},
      {path: ':id', component: ViewBudgetComponent}
    ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
