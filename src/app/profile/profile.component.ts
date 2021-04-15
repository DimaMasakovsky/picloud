import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CrudService } from '../services/crud.service';
import { Subscription } from 'rxjs';
import { User } from '../interfaces';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {
  
  private userID: string; 
  public user: User;
  private subscriptions: Array<Subscription> = [];

  constructor(
    private route: ActivatedRoute,
    private crudService: CrudService
    ) {
    this.userID = route.snapshot.params['id'];
   }

  ngOnInit(): void {
    this.subscriptions.push(
      this.crudService.getObjectByRef('users', this.userID).subscribe(value => this.user = value)
    );
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
