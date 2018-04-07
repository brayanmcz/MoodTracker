import { Component, OnInit } from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import {FirebaseUISignInSuccess} from 'firebaseui-angular';

@Component({
  selector: 'app-verify-page',
  templateUrl: './verify-page.component.html',
  styleUrls: ['./verify-page.component.css']
})
export class VerifyPageComponent implements OnInit {
  user: {
    firstName: string,
    lastName: string,
    email: string,
    birthday: string,
  }


  constructor(private afAuth: AngularFireAuth) {
    this.user = {
      firstName: "",
      lastName: "",
      email: "",
      birthday: "",
    }

    this.afAuth.authState.subscribe(user => {
      console.log(user);

      this.user = {
        firstName: user.displayName.split(' ')[0],
        lastName: user.displayName.split(' ')[1],
        email: user.email,
        birthday: "",
      }
    });
  }

  ngOnInit() {

  }

  clearForm(){
    this.user = {
      firstName: "",
      lastName: "",
      email: "",
      birthday: "",
    }
    console.log("clicked");
  }

  logout() {
    //LOG USER OUT
    this.afAuth.auth.signOut();
  }

  successCallback(data: FirebaseUISignInSuccess) {
    console.log(data);
  }



}
