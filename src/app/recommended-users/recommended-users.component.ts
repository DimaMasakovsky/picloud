import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../interfaces';
import { CrudService } from '../services/crud.service';

@Component({
  selector: 'app-recommended-users',
  templateUrl: './recommended-users.component.html',
  styleUrls: ['./recommended-users.component.scss'],
})
export class RecommendedUsersComponent implements OnInit {
  public usersSubscription: Observable<any>;

  constructor(private crudService: CrudService) {}

  ngOnInit(): void {
    this.usersSubscription = this.crudService.handleData('users', {
      fieldPath: 'postsCount',
      direction: 'asc',
    });
  }

  public trackFunction(item: any): string {
    return item.id;
  }
}
