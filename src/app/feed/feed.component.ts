import { ScrollDispatcher } from '@angular/cdk/scrolling';
import { Component, ElementRef, HostListener, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, Observable } from 'rxjs';
import { Post, User } from '../interfaces';
import { PostModalComponent } from '../post-modal/post-modal.component';
import { CrudService } from '../services/crud.service';
import { PaginationService } from '../services/pagination.service';

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

  private listener;

  constructor(
    private crudService: CrudService,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    public media: MediaObserver,
    public scroll: ScrollDispatcher,
    public el: ElementRef,
    private renderer2: Renderer2,
    public pagination: PaginationService,
    private router: Router,
  ) {
    this.listener = this.renderer2.listen('window', 'scroll', (e) => {
      this.onScroll(e);
    });
  }

  ngOnInit(): void {
    this.pagination.init('posts', 'createTime');
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

  onScroll(e) {
    const top = e.path[1].scrollY;
    const height = e.target.activeElement.scrollHeight;
    const offset = e.path[1].innerHeight;

    if (top > height - offset - 1) {
      // console.log('bottom');
      this.pagination.more();
    }
    if (top === 0) {
      // console.log('top');
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
