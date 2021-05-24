/* eslint-disable no-underscore-dangle */
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, scan, take, tap } from 'rxjs/operators';

interface QueryConfig {
  path: string;
  field: string;
  limit?: number;
  reverse?: boolean;
  pointer?: number;
}

@Injectable({
  providedIn: 'root',
})
export class PaginationService {
  private query: QueryConfig;

  public data: Observable<any>;

  private _data = new BehaviorSubject([]);

  constructor(private afs: AngularFirestore) {}

  public init(path, field, opts?) {
    this.query = {
      path,
      field,
      limit: 3,
      reverse: false,
      pointer: 0,
    };
    this.data = this.handleDataWithQuery(this.query);
  }

  public more() {
    this.query.pointer += 3;
    this.data = this.handleDataWithQuery(this.query);
  }

  public handleDataWithQuery<T>(query: QueryConfig): Observable<T[]> {
    return this.afs
      .collection(this.query.path, (ref) =>
        ref
          .orderBy(this.query.field, this.query.reverse ? 'desc' : 'asc')
          .startAt(this.getCursor())
          .limit(this.query.limit),
      )
      .snapshotChanges()
      .pipe(
        map((actions) => {
          return actions.map((reference) => {
            const data: any = reference.payload.doc.data();
            const { id } = reference.payload.doc;
            return { id, ...data } as T;
          });
        }),
        tap((values) => {
          this._data.next(values);
        }),
      );
  }

  private getCursor() {
    const current = this._data.value;
    if (current.length) {
      return current[current.length - 1];
    }
    return null;
  }
}
