import { Component } from '@angular/core';
import { AppService } from './app.service';
import { User } from './model/user';

interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'aninezm';

  logged = false;

  user = new User();

  isSideNavCollapsed = false;
  screenWidth = 0;

  constructor(
    private appService: AppService
  ){
    this.onRefreshSideNav();
  }

  onToggleSideNav(data: SideNavToggle): void {
    this.screenWidth = data.screenWidth;
    this.isSideNavCollapsed = data.collapsed;
  }

  onRefreshSideNav(){
    this.user = this.appService.getLoggedInUser();

    if(this.user.name == null){
      this.logged = false;
    }
    else{
        this.logged = true;
    }
  }

  /*
  onTestFalse(){
    this.logged = false;
    alert("false");
  }*/
}
