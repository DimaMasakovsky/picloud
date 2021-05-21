import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { Post, User } from '../interfaces';
import { CrudService } from '../services/crud.service';

@Component({
  selector: 'app-feed-post',
  templateUrl: './feed-post.component.html',
  styleUrls: ['./feed-post.component.scss'],
})
export class FeedPostComponent implements OnInit, OnDestroy {
  @Input() post: Post;

  public currentUserID: string;

  private subscriptions: Array<Subscription> = [];

  constructor(private crudService: CrudService, private router: Router) {}

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

  public openModal(): void {
    this.router.navigate(['/feed'], { queryParams: { postId: this.post.id } });
  }
}
