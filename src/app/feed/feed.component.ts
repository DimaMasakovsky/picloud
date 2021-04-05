import { Component, OnInit } from '@angular/core';
import { CrudService} from '../services/crud.service';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit {
  public postForm: FormGroup;
  public posts: any; 
  public postsSubscription: any = this.crudService.handleData("posts");

  constructor(private crudService: CrudService, 
    private fb:  FormBuilder) { }

  ngOnInit(): void {
    //this.initForm();
    this.postsSubscription.subscribe((value) => console.log(value));  
  }
  public create(): void {
    this.crudService.createEntity("posts", {
      author: "userID",
      commentCount: 2,
      comments: ["commentIDsdad"],
      createTime: {seconds: 1617355380, nanoseconds: 0},
      likeCount: 10,
      contentPicURL: "https://images.unsplash.com/photo-1617302865645-81e74c75fa22?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80",
      tag: "home",
      textContent: "Hi"
    }).subscribe((value) => {
      console.log(value)
    });
  }
  public delete(): void {
    this.crudService.deleteObject("posts", "2hoWqXTB2nQLNPFxpb2K");
  }
  public trackFunction(index, item): string {
    return item.id;
  }
  // FORM EXAMPLE 
  // private initForm(): void {
  //   this.postForm = this.fb.group({
  //     name: ['', [
  //       Validators.required,
  //       Validators.pattern(/[A-z]/)
  //     ]],
  //     age: ['', [
  //       Validators.required,
  //       Validators.pattern(/[0-9]/)
  //     ]],
  //     yearsOfExperience: ['', [
  //       Validators.required,
  //       Validators.pattern(/[0-9]/)
  //     ]]
  //   })
  // }
  // private isControlInvalid(controlName: string): boolean {
  //   const control = this.postForm.controls[controlName];

  //   const result = control.invalid && control.touched;

  //   return result;
  // }
  // public onSubmit(): void {
  //   const controls = this.postForm.controls;

  //   if (this.postForm.valid) {
  //     const data = {
  //       name: controls["name"].value,
  //       age: controls["age"].value,
  //       yearsOfExperience: controls["yearsOfExperience"].value        
  //     }
  //     this.crudService.createEntity("data", data).subscribe(() => this.postForm.reset());

  //   }
  // }

}
