import { isNgTemplate } from '@angular/compiler';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Overlay } from '@angular/cdk/overlay';
import { Observable, of, Subscription } from 'rxjs';
import { Post, User } from '../interfaces';
import { CrudService } from '../services/crud.service';
import { PostModalComponent } from '../post-modal/post-modal.component';

@Component({
  selector: 'app-feed-post',
  templateUrl: './feed-post.component.html',
  styleUrls: ['./feed-post.component.scss'],
})
export class FeedPostComponent implements OnInit, OnDestroy {
  @Input() post: Post;

  public currentUserID: string;

  private subscriptions: Array<Subscription> = [];

  constructor(private crudService: CrudService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.crudService.getCurrentUserData().subscribe((value: User) => {
        this.currentUserID = value.uid;
      }),
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  public openModal(): void {
    const dialogRef = this.dialog.open(PostModalComponent, {
      data: { postID: this.post.id },
      width: '80vw',
      maxHeight: '90%',
      hasBackdrop: true,
    });
  }
}
