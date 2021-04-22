import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { combineLatest, Subscription } from 'rxjs';
import { finalize, switchMap, takeLast, takeWhile, tap } from 'rxjs/operators';
import { Post, User } from '../interfaces';
import { AuthService } from '../services/auth.service';
import { CrudService} from '../services/crud.service';
import { UploadService} from '../services/upload.service';
@Component({
  selector: 'app-new-post-form',
  templateUrl: './new-post-form.component.html',
  styleUrls: ['./new-post-form.component.scss']
})
export class NewPostFormComponent implements OnInit, OnDestroy {
  public postForm: FormGroup; 
  public imageLink: string = ""; 
  public progress: string = ""; 
  public currentUserData: User; 
  private subscriptions: Array<Subscription> = []; 

  constructor(
    private fb:  FormBuilder, 
    private authService: AuthService, 
    private crudService: CrudService, 
    private uploadService: UploadService,
    private toast: ToastrService
    ) { }

  ngOnInit(): void {
    this.initForm();
    this.subscriptions.push(
      this.crudService.getCurrentUserData().subscribe((value : User)=> this.currentUserData = value)
    );    
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
  private initForm(): void {
    this.postForm = this.fb.group({
      textContent: ['', [
        Validators.required,
        Validators.pattern(/[ -~]/)
      ]],
      tag:['', [
        Validators.required,
        Validators.pattern(/[a-z0-9_-]/)
      ]],
      file:['',[
        Validators.required
      ]],
      fileUpload: ['', [
        Validators.required
      ]]
    });
    console.log(this.postForm);
  }
  public onSubmit(): void {
    const controls = this.postForm.controls;
    if (this.postForm.valid) {
      const data: Post = { 
        author: this.currentUserData.uid,
        commentCount: 0,
        comments: [],
        createTime: {seconds: Date.now()},
        likeCount: 0,
        contentPicURL: this.imageLink,
        tag: controls["tag"].value,
        textContent: controls["textContent"].value     
      } as Post
      this.subscriptions.push(
        this.crudService.createEntity('posts', data).pipe(
          tap((postID) =>this.currentUserData.postsCount = this.currentUserData.posts.push(postID)),
          switchMap(() => this.crudService.updateObject('users', this.currentUserData.uid, {
            posts: this.currentUserData.posts,
            postsCount: this.currentUserData.postsCount
          })),
          tap(() => this.toast.success('Post created!')),
          finalize(() => this.resetForm())
        ).subscribe()
      );
    }
  }

  public onFileSelected(event): void {
    const file = event.target.files[0];

    this.subscriptions.push(
      combineLatest(this.uploadService.uploadFile("test", file)).pipe(
        tap(([percent,link])=>{
          this.progress = percent.toString();
          this.imageLink = link;
        }),
        takeWhile(([percent, link]) =>!link),
      ).subscribe(([percent, link]) => {
        if (percent == 100) this.postForm.controls.fileUpload.setValue(true);
      })
    );
    
  } 
  public resetForm(): void {
    this.postForm.reset();
    this.imageLink = ""; 
    this.progress = "";
  }  
  public getBackgroundImage(): string {
    return `url(${this?.imageLink})`;
  }
}
