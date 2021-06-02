import { Injectable, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { from, Observable, of } from 'rxjs';
import { take, tap, switchMap, map } from 'rxjs/operators';
import firebase from 'firebase';
import { AngularFirestore } from '@angular/fire/firestore';
import { Post, User } from '../interfaces';
import auth = firebase.auth;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public user$: Observable<firebase.User | null> = this.afAuth.authState;

  constructor(private afAuth: AngularFireAuth, private db: AngularFirestore) {}

  public googleSign(): Observable<auth.UserCredential> {
    const provider = new auth.GoogleAuthProvider();
    return from(this.afAuth.signInWithPopup(provider)).pipe(
      tap((authUser: auth.UserCredential) => {
        firebase.auth().onAuthStateChanged((user) => {
          if (user) {
            this.db
              .collection('users')
              .doc(user.uid)
              .get()
              .subscribe((value) => {
                if (value.exists) {
                  this.db.collection('users').doc(user.uid).update({
                    uid: user.uid,
                    displayName: user.displayName,
                    email: user.email,
                  });
                } else {
                  this.db
                    .collection('users')
                    .doc(user.uid)
                    .set({
                      uid: user.uid,
                      displayName: user.displayName,
                      photoURL: user.photoURL,
                      email: user.email,
                      posts: [],
                      followers: [],
                      following: [],
                      postsCount: 0,
                      followersCount: 0,
                      followingCount: 0,
                      isPrivate: false,
                      bio: '',
                    } as User);
                }
              });
          }
        });
      }),
      take(1),
    );
  }

  public signOut(): Observable<void> {
    return from(this.afAuth.signOut()).pipe(take(1));
  }
}
