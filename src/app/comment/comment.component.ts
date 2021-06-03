import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { switchMap, tap } from 'rxjs/operators';
import { User, Commentary, Post } from '../interfaces';
import { CrudService } from '../services/crud.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
})
export class CommentComponent implements OnInit {
  @Input() comment: Commentary;

  @Input() post: Post;

  public authorUser: User;

  public currentUser: User;

  constructor(
    private crudService: CrudService,
    private toast: ToastrService,
    public router: Router,
    public matDialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.crudService.getObjectByRef('users', this.comment.author).subscribe((author: User) => {
      this.authorUser = author;
    });
    this.crudService.handleCurrentUserData().subscribe((value) => {
      this.currentUser = value;
    });
  }

  public deleteComment(): void {
    if (this.canDelete()) {
      this.post.comments.splice(this.post.comments.indexOf(this.comment.id), 1);
      this.crudService.updateObject('posts', this.post.id, {
        commentCount: (this.post.commentCount -= 1),
        comments: this.post.comments,
      });
      this.crudService.deleteObject('comments', this.comment.id);
      this.toast.success('Deleted');
    }
  }

  public canDelete(): boolean {
    return (
      this.comment.author === this.currentUser.uid || this.post.author === this.currentUser.uid
    );
  }
}
