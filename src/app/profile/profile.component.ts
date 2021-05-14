import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CrudService } from '../services/crud.service';
import { User } from '../interfaces';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit, OnDestroy {
  private userID: string;

  public user: User;

  public currentUser: User;

  private subscriptions: Array<Subscription> = [];

  public postsSubscription: any;

  constructor(
    private route: ActivatedRoute,
    private crudService: CrudService,
    private authService: AuthService,
    private router: Router,
  ) {
    this.userID = route.snapshot.params.id;
  }

  ngOnInit(): void {
    this.postsSubscription = this.crudService.handleData('posts', {
      fieldPath: 'createTime',
      direction: 'desc',
    });
    this.subscriptions.push(
      this.crudService.getObjectByRef('users', this.userID).subscribe((user: User) => {
        this.user = user;
      }),
      this.crudService.getCurrentUserData().subscribe((user: User) => {
        this.currentUser = user;
      }),
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  public trackFunction(index: any, item: any): string {
    return item.id;
  }

  signOut(): void {
    this.authService.signOut().subscribe(() => this.router.navigate(['']));
  }
}
