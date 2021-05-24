import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-auth-window',
  templateUrl: './auth-window.component.html',
  styleUrls: ['./auth-window.component.scss'],
})
export class AuthWindowComponent implements OnInit, OnDestroy {
  private subscriptions: Array<Subscription> = [];

  constructor(public authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  signInWithGoogle(): void {
    this.subscriptions.push(
      this.authService.googleSign().subscribe(() => this.router.navigate(['feed'])),
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
