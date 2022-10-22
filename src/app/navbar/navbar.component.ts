import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faArrowCircleRight as logout } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
    icons = {logout}
  constructor(
    public route : Router
  ) { }

  ngOnInit(): void {
  }

  logout(){
    if(confirm('Are you sure to logout?')){
      localStorage.removeItem('authUser')
      this.route.navigate(['/signin'])
    }
}
}
