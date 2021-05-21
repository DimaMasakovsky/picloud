import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { User } from '../interfaces';
import { CrudService } from '../services/crud.service';

@Component({
  selector: 'app-recommended-users',
  templateUrl: './recommended-users.component.html',
  styleUrls: ['./recommended-users.component.scss'],
})
export class RecommendedUsersComponent implements OnInit, OnDestroy {
  public usersSubscription: Observable<any>;

  public currentUser: User;

  private subscriptions: Array<Subscription> = [];

  constructor(
    private crudService: CrudService,
    public router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.usersSubscription = this.crudService.handleData('users', {
      fieldPath: 'postsCount',
      direction: 'asc',
    });
    this.subscriptions.push(
      this.crudService.handleCurrentUserData().subscribe((user: User) => {
        this.currentUser = user;
      }),
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  public trackFunction(item: any): string {
    return item.id;
  }
}
