import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Post, User } from '../interfaces';
import { CrudService } from '../services/crud.service';

@Component({
  selector: 'app-post-stats',
  templateUrl: './post-stats.component.html',
  styleUrls: ['./post-stats.component.scss'],
})
export class PostStatsComponent implements OnInit, OnDestroy {
  @Input() post: Post;

  public currentUserID: string;

  private subscriptions: Array<Subscription> = [];

  constructor(private crudService: CrudService) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.crudService.handleCurrentUserData().subscribe((value: User) => {
        this.currentUserID = value.uid;
      }),
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
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
}
