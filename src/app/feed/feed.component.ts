import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
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

  constructor(
    private crudService: CrudService,
    private route: ActivatedRoute,
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

  public trackFunction(index: any, item: any): string {
    return item.id;
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
