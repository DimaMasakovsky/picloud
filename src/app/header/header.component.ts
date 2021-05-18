import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MediaObserver } from '@angular/flex-layout';
import { CrudService } from '../services/crud.service';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  public userID: string;

  private subscriptions: Array<Subscription> = [];

  constructor(
    public authService: AuthService,
    public router: Router,
    public media: MediaObserver,
  ) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.authService.user$.subscribe((value) => {
        if (value) {
          this.userID = value.uid;
        } else {
          // eslint-disable-next-line no-console
          console.warn('User is now logged out');
        }
      }),
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  signOut(): void {
    this.authService.signOut().subscribe(() => this.router.navigate(['']));
  }
}
