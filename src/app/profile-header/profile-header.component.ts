import { Component, Input, OnInit } from '@angular/core';
import { User } from '../interfaces';

@Component({
  selector: 'app-profile-header',
  templateUrl: './profile-header.component.html',
  styleUrls: ['./profile-header.component.scss']
})
export class ProfileHeaderComponent implements OnInit {

  @Input() 
  public user : User; 

  constructor() { }

  ngOnInit(): void {
  }
  public getBackgroundImage(): string {
    return `url(${this.user?.photoURL})`;
  }
}
