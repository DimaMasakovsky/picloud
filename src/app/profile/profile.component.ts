import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { switchMap, tap } from 'rxjs/operators';
import { CrudService } from '../services/crud.service';
import { User } from '../interfaces';
import { AuthService } from '../services/auth.service';
import { PostModalComponent } from '../post-modal/post-modal.component';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit, OnDestroy {
  public user: User;

  public currentUser: User;

  private subscriptions: Array<Subscription> = [];

  public postsSubscription: any;

  constructor(
    private route: ActivatedRoute,
    private crudService: CrudService,
    private authService: AuthService,
    private router: Router,
    private dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.postsSubscription = this.crudService.handleData('posts', {
      fieldPath: 'createTime',
      direction: 'desc',
    });
    this.subscriptions.push(
      this.crudService.handleCurrentUserData().subscribe((user: User) => {
        this.currentUser = user;
      }),
      this.route.params
        .pipe(
          switchMap((routeParams) => {
            return this.crudService.handleObjectByRef('users', routeParams.id);
          }),
        )
        .subscribe((user) => {
          this.user = user;
        }),
      this.route.queryParams.subscribe((queryParams) => {
        if (queryParams.postId) {
          const dialogRef = this.dialog.open(PostModalComponent, {
            data: { postID: queryParams.postId },
            width: '80vw',
            maxHeight: '90%',
            hasBackdrop: true,
          });
        }
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

  public canView(): boolean {
    // eslint-disable-next-line no-nested-ternary
    return this.user.uid === this.currentUser.uid
      ? true
      : this.user.isPrivate
      ? this.user.followers.includes(this.currentUser.uid)
      : true;
  }
}
