import { isNgTemplate } from '@angular/compiler';
import { Component, OnInit, Input } from '@angular/core';
import { CrudService } from '../services/crud.service'; 
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-feed-post',
  templateUrl: './feed-post.component.html',
  styleUrls: ['./feed-post.component.scss']
})
export class FeedPostComponent implements OnInit {
  @Input() post: any; 

  constructor(private crudService: CrudService) {
    
   }

  ngOnInit(): void {
  }
  public deletePost(): void {
    this.crudService.deleteObject("posts", this.post.id);
  }
  public getBackgroundImage(): string {
    return `url(${this.post.contentPicURL})`;
  }

}
