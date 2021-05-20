/* eslint-disable no-underscore-dangle */
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Post } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  public searchValue$: Subject<string> = new Subject<string>();

  private _searchValue: string;

  public get search(): string {
    return this._searchValue;
  }

  public set search(value: string) {
    this._searchValue = value;
    this.searchValue$.next(value);
  }

  public posts$: BehaviorSubject<Post> = new BehaviorSubject<Post>(null);

  private _posts: any;

  public get posts(): any {
    return this._posts;
  }

  public set posts(_posts: any) {
    this._posts = _posts;
    this.posts$.next(_posts);
  }
}
