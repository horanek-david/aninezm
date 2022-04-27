import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { AppService } from '../app.service';
import { Router } from '@angular/router';
import { navbarData } from '../navbar/nav-data';
import { navbarBaseData, navbarLoginData } from './nav-data-login';

@Component({
  selector: 'app-navbarlogin',
  templateUrl: './navbarlogin.component.html',
  styleUrls: ['./navbarlogin.component.css']
})
export class NavbarloginComponent implements OnInit {

  navData = navbarData;
  loginData = navbarLoginData;
  baseData = navbarBaseData;

  constructor(
    private appService: AppService,
    private appComponent: AppComponent,
    private router: Router
  ) { 
    
  }

  ngOnInit(): void {
  }

}
