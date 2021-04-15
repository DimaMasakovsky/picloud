import { Injectable, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { from, Observable, of } from 'rxjs';
import { take,  tap, switchMap, map} from 'rxjs/operators'
import firebase from 'firebase';
import auth = firebase.auth; 
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public user$: Observable<firebase.User | null>;   

  constructor(
    private afAuth: AngularFireAuth,
    private db: AngularFirestore
    ) {
    this.user$ = this.afAuth.authState;
  }
  public googleSign(): Observable<auth.UserCredential> {
    const provider = new auth.GoogleAuthProvider();
    return from(this.afAuth.signInWithPopup(provider)).pipe(
      tap((authUser: auth.UserCredential) => {
        firebase.auth().onAuthStateChanged(user => {
          if (user) {
            this.db.collection('users').doc(user.uid).update({
              uid: user.uid,
              displayName: user.displayName,
              photoURL: user.photoURL
            });
          }
        })
      }),
      take(1)
    )
  }
  public signOut(): Observable<void> {
    return from(this.afAuth.signOut()).pipe(take(1)); 
  }
}
