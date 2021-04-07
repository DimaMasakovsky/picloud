import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { combineLatest } from 'rxjs';
import { takeWhile, tap } from 'rxjs/operators';
import { CrudService} from '../services/crud.service';
import { UploadService} from '../services/upload.service';
@Component({
  selector: 'app-new-post-form',
  templateUrl: './new-post-form.component.html',
  styleUrls: ['./new-post-form.component.scss']
})
export class NewPostFormComponent implements OnInit {
  public postForm: FormGroup; 
  public imageLink: string; 
  public progress: string; 

  constructor(private fb:  FormBuilder, private crudService: CrudService, private uploadService: UploadService) { }

  ngOnInit(): void {
    this.initForm();
  }
  private initForm(): void {
    this.postForm = this.fb.group({
      textContent: ['', [
        Validators.required,
        Validators.pattern(/[A-z]/)
        // Change the validators
      ]],
      tag:['', [
        Validators.required,
        Validators.pattern(/[A-z]/)
      ]],
      contentPicURL: ['', [
        Validators.required
      ]]
    })
  }
  private isControlInvalid(controlName: string): boolean {
    const control = this.postForm.controls[controlName];

    const result = control.invalid && control.touched;

    return result;
  }
  public onSubmit(): void {
    const controls = this.postForm.controls;

    if (this.postForm.valid) {
      const data = { 
        author: "G2avpGZZyj2KzGZRFkM7",
        commentCount: 0,
        comments: [],
        createTime: {seconds: Date.now()},
        likeCount: 0,
        contentPicURL: controls["contentPicURL"].value,
        tag: controls["tag"].value,
        textContent: controls["textContent"].value     
      }
      this.crudService.createEntity("posts", data).subscribe(() => this.postForm.reset());
    }
  }

  // public onFileSelected(event): void {
  //   const file = event.target.files[0];
  //   combineLatest(this.uploadService.uploadFile("test", file)).pipe(
  //     tap(([percent,link])=>{
  //       this.progress = percent.toString();
  //       this.imageLink = link;
  //     }),
  //     takeWhile(([percent, link]) =>!link)
  //   ).subscribe(([percent, link])=> (console.log([percent, link])))
  //   console.log(file);
  // } 
}
