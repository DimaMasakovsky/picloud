import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
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

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {}

  public openModal(): void {
    const dialogRef = this.dialog.open(PostModalComponent, {
      data: { postID: this.post.id },
      width: '80vw',
      maxHeight: '90%',
      hasBackdrop: true,
    });
  }
}
