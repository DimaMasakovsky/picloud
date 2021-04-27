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
  @Input() commentID: string;

  @Input() post: Post;

  public comment: Commentary;

  public authorUser: User;

  public currentUser: User;

  constructor(
    private crudService: CrudService,
    private toast: ToastrService,
    public router: Router,
    public matDialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.crudService
      .getObjectByRef('comments', this.commentID)
      .pipe(
        tap((comment) => {
          this.comment = comment;
        }),
        switchMap((comment) => this.crudService.getObjectByRef('users', comment.author)),
      )
      .subscribe((author: User) => {
        this.authorUser = author;
      });
    this.crudService.getCurrentUserData().subscribe((value) => {
      this.currentUser = value;
    });
  }

  public deleteComment(): void {
    if (this.canDelete()) {
      this.post.comments.splice(this.post.comments.indexOf(this.commentID), 1);
      this.crudService.updateObject('posts', this.post.id, {
        commentCount: (this.post.commentCount -= 1),
        comments: this.post.comments,
      });
      this.crudService.deleteObject('comments', this.commentID);
      this.toast.error('Comment deleted');
    }
  }

  public canDelete(): boolean {
    return (
      this.comment.author === this.currentUser.uid || this.post.author === this.currentUser.uid
    );
  }
}
