import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subscription } from 'rxjs';
import { finalize, map, switchMap, tap } from 'rxjs/operators';
import { Post, User, Commentary } from '../interfaces';
import { CrudService } from '../services/crud.service';

@Component({
  selector: 'app-post-modal',
  templateUrl: './post-modal.component.html',
  styleUrls: ['./post-modal.component.scss'],
})
export class PostModalComponent implements OnInit, OnDestroy {
  public post: Post;

  public currentUser: User;

  public commentForm: FormGroup;

  public userSubscription: Observable<Array<User>>;

  private subscriptions: Array<Subscription> = [];

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { postID: string },
    public dialogRef: MatDialogRef<PostModalComponent>,
    private crudService: CrudService,
    private toast: ToastrService,
    private fb: FormBuilder,
    public router: Router,
    public matDialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.crudService.handleObjectByRef('posts', this.data.postID).subscribe((value) => {
        this.post = value;
      }),
      this.crudService.getCurrentUserData().subscribe((value) => {
        this.currentUser = value;
      }),
    );
    this.initForm();
    this.userSubscription = this.crudService.handleData('users');
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  private initForm(): void {
    this.commentForm = this.fb.group({
      textContent: ['', [Validators.required, Validators.pattern(/[ -~]/)]],
    });
  }

  public onSubmit(): void {
    const { controls } = this.commentForm;
    if (this.commentForm.valid) {
      const data: Commentary = {
        author: this.currentUser.uid,
        createTime: Date.now(),
        textContent: controls.textContent.value,
      } as Commentary;
      this.crudService
        .createEntity('comments', data)
        .pipe(
          tap((commentID) => {
            this.post.commentCount = this.post.comments.push(commentID);
          }),
          switchMap((commentID) =>
            this.crudService.updateObject('comments', commentID, {
              id: commentID,
            }),
          ),
          switchMap(() =>
            this.crudService.updateObject('posts', this.post.id, {
              comments: this.post.comments,
              commentCount: this.post.commentCount,
            }),
          ),
          tap(() => this.toast.success('Comment created')),
          finalize(() => this.commentForm.reset()),
        )
        .subscribe();
    }
  }

  public trackFunction(index: any, item: any): string {
    return item.id;
  }

  public deletePost(): void {
    this.crudService.getCurrentUserData().subscribe((user: User) => {
      if (this.post.author === user.uid) {
        this.crudService.deleteObject('posts', this.post.id);
        this.dialogRef.close();
      }
    });
  }
}