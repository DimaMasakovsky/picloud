import { Component, Input, OnInit } from '@angular/core';
import { Post } from '../interfaces';

@Component({
  selector: 'app-profile-post',
  templateUrl: './profile-post.component.html',
  styleUrls: ['./profile-post.component.scss'],
})
export class ProfilePostComponent implements OnInit {
  @Input()
  post: Post;

  ngOnInit(): void {}

  public getBackgroundImage(): string {
    return `url(${this.post.contentPicURL})`;
  }
}
