import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { User } from '../interfaces';
import { CrudService } from '../services/crud.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss'],
})
export class FeedComponent implements OnInit, OnDestroy {
  public postsSubscription: Observable<any>;

  public currentUser: User;

  private subscriptions: Array<Subscription> = [];

  constructor(private crudService: CrudService) {}

  ngOnInit(): void {
    this.postsSubscription = this.crudService.handleData('posts', {
      fieldPath: 'createTime',
      direction: 'desc',
    });
    this.subscriptions.push(
      this.crudService.getCurrentUserData().subscribe((user: User) => {
        this.currentUser = user;
      }),
    );
  }

  public trackFunction(index: any, item: any): string {
    return item.id;
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
