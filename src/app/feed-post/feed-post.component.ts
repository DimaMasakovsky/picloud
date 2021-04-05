import { isNgTemplate } from '@angular/compiler';
import { Component, OnInit, Input } from '@angular/core';
import { CrudService } from '../services/crud.service'; 

@Component({
  selector: 'app-feed-post',
  templateUrl: './feed-post.component.html',
  styleUrls: ['./feed-post.component.scss']
})
export class FeedPostComponent implements OnInit {
  @Input() post: any; 

  public postID: string; 

  constructor(private crudService: CrudService) {
    
   }

  ngOnInit(): void {
    this.postID = this.post.id;
    console.log(this.postID);
  }
  public deletePost(): void {
    this.crudService.deleteObject("posts", this.postID);
  }
  public getBackgroundImage(): string {
    return `url(${this.post.contentPicURL})`
  }

}
