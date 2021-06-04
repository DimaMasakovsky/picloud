import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, Observable, Subscription } from 'rxjs';
import { Post, User } from '../interfaces';
import { PostModalComponent } from '../post-modal/post-modal.component';
import { CrudService } from '../services/crud.service';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchPageComponent implements OnInit, OnDestroy {
  private subscriptions: Array<Subscription> = [];

  private dialogWidth: '40vw' | '90vw';

  private dialogRef: MatDialogRef<PostModalComponent>;

  public filter: string;

  private usersArray: any;

  public filteredUsersArray: Array<User>;

  private postsArray: any;

  public filteredPostsArray: Array<Post>;

  constructor(
    private crudService: CrudService,
    private cdr: ChangeDetectorRef,
    public router: Router,
    public storage: StorageService,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private media: MediaObserver,
  ) {}

  ngOnInit(): void {
    this.subscriptions.push(
      combineLatest(
        this.crudService.handleData('posts', { fieldPath: 'createTime', direction: 'desc' }),
        this.crudService.handleData('users', { fieldPath: 'displayName', direction: 'desc' }),
        this.route.queryParams,
      ).subscribe(([postArr, userArr, queryParams]) => {
        this.postsArray = postArr;
        this.usersArray = userArr;
        this.cdr.detectChanges();
        if (queryParams.filter) {
          this.filter = queryParams.filter;
          this.filterData(queryParams.filter);
          this.cdr.detectChanges();
        }
        if (queryParams.filter === '') {
          this.filteredPostsArray = [];
          this.filteredUsersArray = [];
        }
        if (queryParams.postId) {
          this.crudService.getObjectByRef('posts', queryParams.postId).subscribe((post: Post) => {
            if (post) {
              this.dialogRef = this.dialog.open(PostModalComponent, {
                data: { postID: queryParams.postId },
                width: this.dialogWidth,
                maxHeight: '90%',
                hasBackdrop: true,
                autoFocus: false,
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

  private filterData(filter: string) {
    this.filteredUsersArray = this.usersArray?.filter((el) =>
      el.displayName.toLowerCase().includes(filter.toLowerCase()),
    );
    this.filteredPostsArray = this.postsArray?.filter((el) => {
      return (
        el.textContent.toLowerCase().includes(filter.toLowerCase()) || el.tags.includes(filter)
      );
    });
  }

  public trackFunction(index: any, item: any): string {
    return item.id;
  }

  public openModal(postId: string): void {
    this.router.navigate([], { queryParams: { postId }, queryParamsHandling: 'merge' });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
    this.storage.search = '';
  }
}
