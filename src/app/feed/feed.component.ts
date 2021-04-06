import { Component, OnInit } from '@angular/core';
import { CrudService} from '../services/crud.service';
@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit {
  public postsSubscription: any = this.crudService.handleData("posts");

  constructor(private crudService: CrudService) { }

  ngOnInit(): void {
    
  }
  public trackFunction(index: any, item: any): string {
    return item.id;
  }
}
