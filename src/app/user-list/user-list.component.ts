import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { User } from '../interfaces';
import { CrudService } from '../services/crud.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit, OnDestroy {
  private subscriptions: Array<Subscription> = [];

  public userSubscription: Observable<Array<User>>;

  public user: User;

  public currentUser: User;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { category: 'followers' | 'following'; userID: string },
    private crudService: CrudService,
    public router: Router,
    private dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.crudService.handleObjectByRef('users', this.data.userID).subscribe((user: User) => {
        this.user = user;
      }),
      this.crudService.handleCurrentUserData().subscribe((user: User) => {
        this.currentUser = user;
      }),
    );
    this.userSubscription = this.crudService.handleData('users', {
      fieldPath: 'followersCount',
      direction: 'desc',
    });
  }

  public trackFunction(index: any, item: any): string {
    return item.id;
  }

  public navigateTo(id: string): void {
    this.router.navigate(['/profile', id]);
    this.dialog.closeAll();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
