import { isNgTemplate } from '@angular/compiler';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
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

  public deletePost(): void {
    // this.crudService.deleteObject('posts', this.post.id);
    this.dialog.open(PostModalComponent, { data: { postID: this.post.id }, width: '80%' });
  }

  public toggleLike(): void {
    if (this.post.likes.includes(this.currentUserID)) {
      this.post.likes.splice(this.post.likes.indexOf(this.currentUserID), 1);
      this.post.likeCount -= 1;
      this.crudService.updateObject('posts', this.post.id, this.post);
    } else {
      this.post.likeCount = this.post.likes.push(this.currentUserID);
      this.crudService.updateObject('posts', this.post.id, this.post);
    }
  }

  public getBackgroundImage(): string {
    return `url(${this.post.contentPicURL})`;
  }
}
