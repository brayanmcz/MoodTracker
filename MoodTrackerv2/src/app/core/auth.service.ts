import { Injectable } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { Router } from '@angular/router'

@Injectable()
export class AuthService {

  authState: any = null;

  constructor(private af: AngularFireAuth, private db: AngularFireDatabaseModule, private router: Router){
      af.authState.subscribe((auth) => {
        this.authState = auth;
      });
    }

  //Returns true if user is logged in
  get authenticated(): boolean {
    return this.authState !== null;
  }

  //Returns current user
  get currentUser(): any {
    return this.authenticated ? this.authState.auth : null;
  }

  //Returns current user UID
  get currentUserId(): string {
    return this.authenticated ? this.authState.uid : '';
  }
}
