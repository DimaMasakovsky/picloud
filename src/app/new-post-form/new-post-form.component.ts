import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { CrudService} from '../services/crud.service';

@Component({
  selector: 'app-new-post-form',
  templateUrl: './new-post-form.component.html',
  styleUrls: ['./new-post-form.component.scss']
})
export class NewPostFormComponent implements OnInit {
  public postForm: FormGroup; 

  constructor(private fb:  FormBuilder, private crudService: CrudService) { }

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

}
