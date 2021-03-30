import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { from, Observable, of } from 'rxjs';
import { take,  tap} from 'rxjs/operators'
import firebase from 'firebase';
import auth = firebase.auth; 

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public user$: Observable<firebase.User | null>; 
  constructor(private angAuthService: AngularFireAuth) {
    this.user$ = this.angAuthService.authState;
  }
  public googleSign(): Observable<auth.UserCredential> {
    const provider = new auth.GoogleAuthProvider();
    return from(this.angAuthService.signInWithPopup(provider)).pipe(
      tap((authUser: auth.UserCredential) => {
        //console.log(authUser);
      }),
      take(1)
    )
  }
  public signOut(): void {
    this.angAuthService.signOut(); 
  }
}
