import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';
import { AppService } from '../app.service';
import { navbarBaseData } from '../navbarlogin/nav-data-login';

import { navbarData, navbarProfileData } from './nav-data';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  navData = navbarData;
  profileData = navbarProfileData;
  baseData = navbarBaseData;

  constructor(
    private appService: AppService,
    private appComponent: AppComponent,
    private router: Router
  ) {

  }

  ngOnInit(): void {
  }

  logoutButton(){
    this.appService.setLoggedOutUser();
    this.appComponent.onRefreshSideNav();
    this.router.navigate(['/login']);
    //alert("ok");
  }

}
