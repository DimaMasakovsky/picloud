import {Injectable} from '@angular/core';
import {AngularFirestore, DocumentSnapshot} from '@angular/fire/firestore';
import {from, Observable, of} from 'rxjs';
import {map, take} from 'rxjs/operators';
import firebase from 'firebase';
import DocumentReference = firebase.firestore.DocumentReference;

@Injectable({
  providedIn: 'root'
})
export class CrudService {
  constructor(private firestoreService: AngularFirestore) { }

  public getObjectByRef(collectionName: string, id:string): Observable<any> {
    return this.firestoreService.collection(collectionName).doc(id).get().pipe(
      map(doc => doc.data()), 
      take(1)
    );
  }

  public createEntity(collectionName: string, data: {}): Observable<string> {
    return from(this.firestoreService.collection(collectionName).add(data)).pipe(
      map((value: DocumentReference) => value.id),
      take(1)
    );
  }

  public updateObject(collectionName: string, id: string, data: {}): Observable<void> {
    return from(this.firestoreService.collection(collectionName).doc(id).set(data, {merge: true})).pipe(take(1))
  }
  public getData<T>(collectionName: string): Observable<T[]> {
    return this.firestoreService.collection(collectionName).snapshotChanges().pipe(
      map((actions) => {
        return actions.map((reference)=>{
          const data: any = reference.payload.doc.data();
          const id = reference.payload.doc.id;
          return {id, ...data} as T;
        })
      }),
      take(1)
    );
  }
  public handleData<T>(collectionName: string): Observable<T[]> {
    return this.firestoreService.collection(collectionName).snapshotChanges().pipe(
      map((actions) => {
        return actions.map((reference)=>{
          const data: any = reference.payload.doc.data();
          const id = reference.payload.doc.id;
          return {id, ...data} as T;
        })
      })
    );
  }
  public deleteObject(collectionName: string, id: string): Observable<unknown> {
    return from(this.firestoreService.collection(collectionName).doc(id).delete()).pipe(take(1));
  }
}
