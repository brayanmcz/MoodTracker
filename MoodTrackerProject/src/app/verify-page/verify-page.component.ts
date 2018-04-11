import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { FirebaseUISignInSuccess } from 'firebaseui-angular';
import { AngularFireDatabase } from 'angularfire2/database';


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
    birthday: any,
    verified: boolean,
    id: string
  }

  firebaseRef: any;

  constructor(private afAuth: AngularFireAuth, db: AngularFireDatabase) {

    this.firebaseRef = db;

    this.user = {
      firstName: "",
      lastName: "",
      email: "",
      birthday: "",
      verified: false,
      id: ""
    }

    this.afAuth.authState.subscribe(user => {
       db.object('/users/' + user.uid + '/verified')
        .valueChanges()
        .subscribe(info => {
          this.user = {
            firstName: user.displayName.split(' ')[0],
            lastName: user.displayName.split(' ')[1],
            email: user.email,
            birthday: "",
            verified: false,
            id: user.uid
          }

          if (info === null){
            console.log("info" + info);
            this.createUserAccountOnFirebase(db, user.uid);

          } else if (info === false){
            console.log("info: " + info);
          } else if (info === true){
            console.log("info: " + info);
            location.replace("./main");
          };
        });
    });
  }

  ngOnInit() {
    // TODO: Create firebase user with info

  }

  clearForm(){
    this.user = {
      firstName: "",
      lastName: "",
      email: "",
      birthday: "",
      verified: false,
      id: ""
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

  createUserAccountOnFirebase(db: AngularFireDatabase, userID: string) {
    db.object('/users/' + userID).set(this.user);
  }

  updateUserAccountOnFirebase(db: AngularFireDatabase) {
    this.firebaseRef.object('/users/' + this.user.id + '/birthday').set(this.user.birthday);
    this.firebaseRef.object('/users/' + this.user.id + '/verified').set(true);
    location.replace("./main");
    // TODO: CHANGE TO NOT LOOK LIKE SHIT
  }

}
