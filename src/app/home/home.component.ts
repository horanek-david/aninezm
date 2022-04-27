import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { User } from '../model/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  user = new User();

  constructor(
    private appService: AppService
  ) {
    this.user = appService.getLoggedInUser();
  }

  ngOnInit(): void {
  }

}
