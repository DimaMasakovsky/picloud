import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MediaObserver } from '@angular/flex-layout';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { switchMap, tap } from 'rxjs/operators';
import { CrudService } from '../services/crud.service';
import { Post, User } from '../interfaces';
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

  private dialogRef: MatDialogRef<PostModalComponent>;

  private dialogWidth: '40vw' | '90vw';

  constructor(
    private route: ActivatedRoute,
    private crudService: CrudService,
    private authService: AuthService,
    private router: Router,
    private dialog: MatDialog,
    public media: MediaObserver,
  ) {}

  ngOnInit(): void {
    this.postsSubscription = this.crudService.handleData('posts', {
      fieldPath: 'createTime',
      direction: 'desc',
    });
    this.subscriptions.push(
      this.media.asObservable().subscribe(() => {
        if (this.dialogRef && this.dialogWidth === '40vw' && this.media.isActive('lt-md')) {
          this.dialogRef.close();
        }
        if (this.dialogRef && this.dialogWidth === '90vw' && this.media.isActive('gt-sm')) {
          this.dialogRef.close();
        }
        this.dialogWidth = this.media.isActive('lt-md') ? '90vw' : '40vw';
      }),
      this.crudService.handleCurrentUserData().subscribe((user: User) => {
        this.currentUser = user;
      }),
      this.route.params
        .pipe(
          tap((routeParams) => {
            this.crudService.getObjectByRef('users', routeParams.id).subscribe((user) => {
              if (!user) {
                this.router.navigate(['/404']);
              }
            });
          }),
          switchMap((routeParams) => {
            return this.crudService.handleObjectByRef('users', routeParams.id);
          }),
        )
        .subscribe((user) => {
          this.user = user;
        }),
      this.route.queryParams.subscribe((queryParams) => {
        if (queryParams.postId) {
          this.crudService.getObjectByRef('posts', queryParams.postId).subscribe((post: Post) => {
            if (post) {
              this.dialogRef = this.dialog.open(PostModalComponent, {
                data: { postID: queryParams.postId },
                width: this.dialogWidth,
                maxHeight: '90%',
                hasBackdrop: true,
              });
            } else {
              this.router.navigate(['/404']);
            }
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
