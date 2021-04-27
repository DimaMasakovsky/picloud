import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, of, Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { CrudService } from '../services/crud.service';
import { User } from '../interfaces';
@Component({
  selector: 'app-post-header',
  templateUrl: './post-header.component.html',
  styleUrls: ['./post-header.component.scss'],
})
export class PostHeaderComponent implements OnInit, OnDestroy {
  @Input()
  public userID: string;

  @Input()
  public createTime: number;

  public user: User;

  private subscriptions: Array<Subscription> = [];

  constructor(
    private crudService: CrudService,
    public router: Router,
    private route: ActivatedRoute,
    public matDialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.crudService.getObjectByRef('users', this.userID).subscribe((value) => {
        this.user = value;
      }),
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
