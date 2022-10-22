import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  public email:any = ""
  public password:any = ""
  public message:any = ""
  public errorDey:boolean = false
  public userArray:any = []
  constructor(
    public route : Router
  ) { }

  ngOnInit(): void {
      this.userArray = JSON.parse(localStorage["allUser"])
  }

  loginUser(){
    let findUser = this.userArray.find((user: any, i: any)=> user.email == this.email)
    if(findUser){
        if(findUser["password"]==this.password){
            localStorage.setItem('authUser', JSON.stringify(findUser))
            this.email = ""
            this.password = ""
            this.route.navigate(['/budget_list'])
        }
        else{
          this.errorDey = true
          this.message = "Password entered is incorrect, please check and try again!"
        }
    }
    else{
      this.errorDey = true
      this.message = "The Email entered is not registered, please proceed to sign up!"
    }
    
  }

}
