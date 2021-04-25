/* eslint-disable no-underscore-dangle */
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Post } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  public posts$: BehaviorSubject<Post> = new BehaviorSubject<Post>(null);

  // types ???
  private _posts: any;

  public get posts(): any {
    return this._posts;
  }

  public set posts(_posts: any) {
    this._posts = _posts;
    this.posts$.next(_posts);
  }
}
