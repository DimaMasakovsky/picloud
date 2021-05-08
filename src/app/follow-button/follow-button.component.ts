import { Component, Input, OnInit } from '@angular/core';
import { User } from '../interfaces';
import { CrudService } from '../services/crud.service';

@Component({
  selector: 'app-follow-button',
  templateUrl: './follow-button.component.html',
  styleUrls: ['./follow-button.component.scss'],
})
export class FollowButtonComponent implements OnInit {
  @Input() user: User;

  public currentUser: User;

  constructor(private crudService: CrudService) {}

  ngOnInit(): void {
    this.crudService.getCurrentUserData().subscribe((user: User) => {
      this.currentUser = user;
    });
  }

  public follow(): void {
    this.currentUser.following.push(this.user.uid);
    this.currentUser.followingCount += 1;
    this.user.followers.push(this.currentUser.uid);
    this.user.followersCount += 1;

    this.crudService.updateObject('users', this.currentUser.uid, this.currentUser);
    this.crudService.updateObject('users', this.user.uid, this.user);
  }

  public unfollow(): void {
    this.currentUser.following.splice(this.currentUser.following.indexOf(this.user.uid));
    this.currentUser.followingCount -= 1;
    this.user.followers.splice(this.user.followers.indexOf(this.currentUser.uid));
    this.user.followersCount -= 1;

    this.crudService.updateObject('users', this.currentUser.uid, this.currentUser);
    this.crudService.updateObject('users', this.user.uid, this.user);
  }
}
