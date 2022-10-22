import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  public firstName:any = ""
  public lastName:any = ""
  public email:any = ""
  public contact:any = ""
  public password:any = ""
  public message: string = ""
  public userArray: any = []
  constructor(
   public route : Router
  ) { }

  ngOnInit(): void {
   this.userArray = JSON.parse(localStorage['allUser'])
  }

  signupFunc(){
      let userDetail= {firstName:this.firstName, lastName: this.lastName, email: this.email, contact: this.contact, password: this.password, budgetArray: []}
     if(this.firstName == "" || this.lastName=="" || this.email == "" || this.contact == "" || this.password==""){
      this.message = 'Please kindly filled up the required field!'
     }else{
         let findUser = this.userArray.find((user:any, i:any)=> user.email == this.email)
         if(findUser){
            this.message = 'Please try again the EMAIL entered is already used!'  
         }
         else{
            this.userArray.push(userDetail)
            localStorage.setItem("allUser", JSON.stringify(this.userArray))
            alert('Registration successfull!')
            this.firstName = ""
            this.lastName = ""
            this.email = ""
            this.password = ""
            this.route.navigate(['/signin'])
         }

     }
     
  }
}
