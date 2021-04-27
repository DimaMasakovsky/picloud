import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User } from '../interfaces';
import { CrudService } from '../services/crud.service';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss'],
})
export class FeedComponent implements OnInit, OnDestroy {
  public postsSubscription: Observable<any>;

  public user: User;

  private subscriptions: Array<Subscription> = [];

  constructor(private crudService: CrudService, private storage: StorageService) {}

  ngOnInit(): void {
    this.postsSubscription = this.crudService.handleData('posts').pipe(
      tap((value) => {
        // console.log(value);
        // value.sort(this.compareByDate)
        // console.log(value);
      }),
    );
    // this.storage.posts$.subscribe();
    this.subscriptions.push(
      this.crudService.getCurrentUserData().subscribe((value) => {
        this.user = value;
      }),
    );
  }

  public trackFunction(index: any, item: any): string {
    return item.id;
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  private compareByDate(a: any, b: any): number {
    return a.createTime.seconds - b.createTime.seconds;
  }
}
