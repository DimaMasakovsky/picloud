import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Post } from '../interfaces';
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
  public postsSubscription: Observable<any>;

  public usersSubscription: Observable<any>;

  private subscriptions: Array<Subscription> = [];

  public filter: string;

  constructor(
    private crudService: CrudService,
    private cdr: ChangeDetectorRef,
    public router: Router,
    public storage: StorageService,
    private dialog: MatDialog,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.postsSubscription = this.crudService.handleData('posts', {
      fieldPath: 'createTime',
      direction: 'desc',
    });
    this.usersSubscription = this.crudService.handleData('users', {
      fieldPath: 'displayName',
      direction: 'desc',
    });
    this.subscriptions.push(
      this.storage.searchValue$.subscribe((val) => {
        this.updateSearchResults(val);
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

  public updateSearchResults(inputValue: string): void {
    this.filter = inputValue;
    this.cdr.detectChanges();
  }

  public trackFunction(index: any, item: any): string {
    return item.id;
  }

  public openModal(postId: string): void {
    this.router.navigate([], { queryParams: { postId }, queryParamsHandling: 'merge' });
  }

  public postFilter(post: Post): boolean {
    if (post.textContent.toLowerCase().includes(this.filter.toLowerCase())) return true;
    // post.tags.forEach((tag: string) => {
    //   if (tag.toLowerCase() === this.filter.toLowerCase()) return true;
    // });

    // eslint-disable-next-line no-restricted-syntax
    for (const tag of post.tags) {
      if (tag.toLowerCase() === this.filter.toLowerCase()) return true;
    }

    return false;
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
    this.storage.search = '';
  }
}
