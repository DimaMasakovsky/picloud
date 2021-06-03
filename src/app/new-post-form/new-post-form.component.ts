import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { combineLatest, Subscription } from 'rxjs';
import { finalize, switchMap, takeLast, takeWhile, tap } from 'rxjs/operators';
import { Post, User } from '../interfaces';
import { AuthService } from '../services/auth.service';
import { CrudService } from '../services/crud.service';
import { UploadService } from '../services/upload.service';
@Component({
  selector: 'app-new-post-form',
  templateUrl: './new-post-form.component.html',
  styleUrls: ['./new-post-form.component.scss'],
})
export class NewPostFormComponent implements OnInit, OnDestroy {
  public postForm: FormGroup;

  public imageLink = '';

  public progress = '';

  public isLoading = false;

  public currentUserData: User;

  private subscriptions: Array<Subscription> = [];

  constructor(
    private fb: FormBuilder,
    private crudService: CrudService,
    private uploadService: UploadService,
    private toast: ToastrService,
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.subscriptions.push(
      this.crudService.handleCurrentUserData().subscribe((value: User) => {
        this.currentUserData = value;
      }),
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  private initForm(): void {
    this.postForm = this.fb.group({
      textContent: ['', [Validators.required, Validators.maxLength(256)]],
      tag: [
        '',
        [
          Validators.required,
          Validators.pattern('[0-9a-zA-Zа-яёА-ЯЁ ]*'),
          Validators.maxLength(128),
        ],
      ],
      file: ['', [Validators.required]],
      fileUpload: ['', [Validators.required]],
    });
  }

  public get textContent() {
    return this.postForm.get('textContent');
  }

  public get tag() {
    return this.postForm.get('tag');
  }

  public onSubmit(): void {
    const { controls } = this.postForm;
    if (this.postForm.valid && !this.isLoading) {
      const data: Post = {
        author: this.currentUserData.uid,
        commentCount: 0,
        comments: [],
        likes: [],
        createTime: Date.now(),
        likeCount: 0,
        contentPicURL: this.imageLink,
        tags: controls.tag.value.trim().split(' '),
        textContent: controls.textContent.value,
      } as Post;
      this.subscriptions.push(
        this.crudService
          .createEntity('posts', data)
          .pipe(
            tap((postID) => {
              this.currentUserData.postsCount = this.currentUserData.posts.push(postID);
            }),
            switchMap(() =>
              this.crudService.updateObject('users', this.currentUserData.uid, {
                posts: this.currentUserData.posts,
                postsCount: this.currentUserData.postsCount,
              }),
            ),
            tap(() => this.toast.success('Post created!')),
            finalize(() => this.resetForm()),
          )
          .subscribe(),
      );
    } else if (this.isLoading) {
      this.toast.error("Image hasn't loaded yet!");
    } else {
      this.postForm.markAllAsTouched();
    }
  }

  public onFileSelected(event): void {
    const file = event.target.files[0];
    const types = ['image/jpg', 'image/png', 'image/jpeg', 'image/webp'];
    if (types.includes(file.type) && file.size < 11000000) {
      this.isLoading = true;
      this.subscriptions.push(
        combineLatest(this.uploadService.uploadFile('postPictures', file))
          .pipe(
            tap(([percent, link]) => {
              this.progress = percent.toString();
              this.imageLink = link;
              if (link) this.postForm.controls.fileUpload.setValue(true);
            }),
            takeWhile(([percent, link]) => !link),
          )
          .subscribe(([percent, link]) => {
            if (percent === 100) {
              this.isLoading = false;
            }
          }),
      );
    } else if (file.size > 11000000) {
      this.toast.error('Pics should weight less than 10MB');
    } else {
      this.toast.error('Only .png, .jpg or .webp images are accepted!');
    }
  }

  public resetForm(): void {
    this.postForm.reset();
    this.imageLink = '';
    this.progress = '';
    this.isLoading = false;
  }
}
