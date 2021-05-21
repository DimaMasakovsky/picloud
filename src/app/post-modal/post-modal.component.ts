import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { merge, Observable, Subscription } from 'rxjs';
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

  public commentsSubscription: Observable<Array<Commentary>>;

  private subscriptions: Array<Subscription> = [];

  public commentIsUploading = false;

  public postAuthor: User;

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
      this.crudService
        .handleObjectByRef('posts', this.data.postID)
        .pipe(
          tap((post: Post) => {
            this.post = post;
            if (!post.author) {
              this.matDialog.closeAll();
            }
          }),
          switchMap((post: Post) => {
            return this.crudService.handleObjectByRef('users', post.author);
          }),
        )
        .subscribe((user: User) => {
          this.postAuthor = user;
        }),
      this.crudService.handleCurrentUserData().subscribe((value) => {
        this.currentUser = value;
      }),
    );
    this.userSubscription = this.crudService.handleData('users', {
      fieldPath: 'followersCount',
      direction: 'desc',
    });
    this.commentsSubscription = this.crudService.handleData('comments', {
      fieldPath: 'createTime',
      direction: 'desc',
    });
    this.initForm();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
    this.router.navigate([], { queryParams: { postId: null }, queryParamsHandling: 'merge' });
  }

  private initForm(): void {
    this.commentForm = this.fb.group({
      textContent: ['', [Validators.required]],
    });
  }

  public onSubmit(): void {
    const { controls } = this.commentForm;
    if (this.commentForm.valid) {
      this.commentIsUploading = true;
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
          finalize(() => {
            this.commentIsUploading = false;
            this.commentForm.reset();
          }),
        )
        .subscribe();
    }
  }

  public trackFunction(index: any, item: any): string {
    return item.id;
  }

  public deletePost(): void {
    if (this.post.author === this.currentUser.uid) {
      this.currentUser.posts.splice(this.currentUser.posts.indexOf(this.post.id), 1);
      this.currentUser.postsCount -= 1;
      const data = {
        posts: this.currentUser.posts,
        postsCount: this.currentUser.postsCount,
      };
      this.crudService.deleteObject('posts', this.post.id);
      this.dialogRef.close();
      this.crudService.updateObject('users', this.currentUser.uid, data);
      this.toast.error('Post deleted!');
    }
  }

  public canView(): boolean {
    // eslint-disable-next-line no-nested-ternary
    return this.postAuthor.uid === this.currentUser.uid
      ? true
      : this.postAuthor.isPrivate
      ? this.postAuthor.followers.includes(this.currentUser.uid)
      : true;
  }
}
