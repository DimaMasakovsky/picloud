import { Component, OnDestroy, OnInit } from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Subscription, Observable } from 'rxjs';
import { User } from '../interfaces';
import { PostModalComponent } from '../post-modal/post-modal.component';
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

  private dialogWidth: '40vw' | '90vw';

  private dialogRef: MatDialogRef<PostModalComponent>;

  constructor(
    private crudService: CrudService,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    public media: MediaObserver,
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
      this.route.queryParams.subscribe((queryParams) => {
        if (queryParams.postId) {
          this.dialogRef = this.dialog.open(PostModalComponent, {
            data: { postID: queryParams.postId },
            width: this.dialogWidth,
            maxHeight: '90%',
            hasBackdrop: true,
            autoFocus: false,
          });
        }
      }),
      this.media.asObservable().subscribe(() => {
        if (this.dialogRef && this.dialogWidth === '40vw' && this.media.isActive('lt-md')) {
          this.dialogRef.close();
        }
        if (this.dialogRef && this.dialogWidth === '90vw' && this.media.isActive('gt-sm')) {
          this.dialogRef.close();
        }
        this.dialogWidth = this.media.isActive('lt-md') ? '90vw' : '40vw';
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
