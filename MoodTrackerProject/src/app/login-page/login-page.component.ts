import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  appID: string;

  constructor() {
    this.appID = '544278815957626' //Provided in facebook developers app settings
  }

  ngOnInit() {
  }

}
