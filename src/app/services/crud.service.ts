import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentSnapshot } from '@angular/fire/firestore';
import { from, Observable, of } from 'rxjs';
import { map, take, switchMap } from 'rxjs/operators';
import firebase from 'firebase';
import { User, Post } from '../interfaces';
import { AuthService } from './auth.service';
import DocumentReference = firebase.firestore.DocumentReference;

@Injectable({
  providedIn: 'root',
})
export class CrudService {
  constructor(private firestoreService: AngularFirestore, private authService: AuthService) {}

  public getObjectByRef(collectionName: string, id: string): Observable<Post | User | any> {
    return this.firestoreService
      .collection(collectionName)
      .doc(id)
      .get()
      .pipe(
        map((doc) => doc.data()),
        take(1),
      );
  }

  public createEntity(collectionName: string, data: {}): Observable<string> {
    return from(this.firestoreService.collection(collectionName).add(data)).pipe(
      map((value: DocumentReference) => value.id),
      take(1),
    );
  }

  public updateObject(collectionName: string, id: string, data: {}): Observable<void> {
    return from(
      this.firestoreService.collection(collectionName).doc(id).set(data, { merge: true }),
    ).pipe(take(1));
  }

  public getData<T>(collectionName: string): Observable<T[]> {
    return this.firestoreService
      .collection(collectionName)
      .snapshotChanges()
      .pipe(
        map((actions) => {
          return actions.map((reference) => {
            const data: any = reference.payload.doc.data();
            const { id } = reference.payload.doc;
            return { id, ...data } as T;
          });
        }),
        take(1),
      );
  }

  public handleData<T>(collectionName: string): Observable<T[]> {
    return this.firestoreService
      .collection(collectionName)
      .snapshotChanges()
      .pipe(
        map((actions) => {
          return actions.map((reference) => {
            const data: any = reference.payload.doc.data();
            const { id } = reference.payload.doc;
            return { id, ...data } as T;
          });
        }),
      );
  }

  public handleObjectByRef<T>(collectionName: string, id: string): Observable<any> {
    return this.firestoreService
      .collection(collectionName)
      .doc(id)
      .snapshotChanges()
      .pipe(
        map((ref) => {
          const data: any = ref.payload.data();
          return { id, ...data };
        }),
      );
  }

  public deleteObject(collectionName: string, id: string): Observable<unknown> {
    return from(this.firestoreService.collection(collectionName).doc(id).delete()).pipe(take(1));
  }

  public getCurrentUserData(): any {
    return this.authService.user$.pipe(
      map((value) => value.uid),
      switchMap((uid) => {
        return this.firestoreService.collection('users').doc(uid).valueChanges();
      }),
    );
  }
}
