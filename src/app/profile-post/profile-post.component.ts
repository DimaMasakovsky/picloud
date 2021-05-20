import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Post } from '../interfaces';
import { PostModalComponent } from '../post-modal/post-modal.component';

@Component({
  selector: 'app-profile-post',
  templateUrl: './profile-post.component.html',
  styleUrls: ['./profile-post.component.scss'],
})
export class ProfilePostComponent implements OnInit {
  @Input()
  post: Post;

  @Input()
  userID: string;

  constructor(private dialog: MatDialog, public router: Router) {}

  ngOnInit(): void {}

  public openModal(): void {
    this.router.navigate(['/profile', this.userID], { queryParams: { postId: this.post.id } });
  }
}
