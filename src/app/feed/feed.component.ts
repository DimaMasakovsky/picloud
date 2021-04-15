import { Component, OnInit } from '@angular/core';
import { CrudService} from '../services/crud.service';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit {

  public postsSubscription: any; 

  constructor(private crudService: CrudService, private storage: StorageService) { }

  ngOnInit(): void {
    this.postsSubscription = this.crudService.handleData('posts');    
    // this.storage.posts$.subscribe(); 
  }
  public trackFunction(index: any, item: any): string {
    return item.id;
  }
}
