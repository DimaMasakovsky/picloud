import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { CrudService } from '../services/crud.service';
import { Observable, of, Subscription } from 'rxjs'; 
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../interfaces';
@Component({
  selector: 'app-post-header',
  templateUrl: './post-header.component.html',
  styleUrls: ['./post-header.component.scss']
})
export class PostHeaderComponent implements OnInit, OnDestroy {  
  @Input()
  public userID: string;

  @Input()
  public createTime: {seconds: string};

  public user: User; 
  private subscriptions: Array<Subscription> = [];

  constructor(
    private crudService: CrudService, 
    public router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.subscriptions.push(
      this.crudService.getObjectByRef('users', this.userID).subscribe((value) => this.user = value)
    )
  }
  public getBackgroundImage(): string {
    // sign ? 
    return `url(${this.user.photoURL})`;
  }
  public getDate(): string { 
    const months: string[] = ['January','February','March','April','May','June','July','August','September','October','November','December'] 
    const d = new Date (this.createTime.seconds)
    return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()} at ${d.getHours()}:${d.getMinutes()} `;
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
