import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { take,  tap, map} from 'rxjs/operators';
@Component({
  selector: 'app-auth-window',
  templateUrl: './auth-window.component.html',
  styleUrls: ['./auth-window.component.scss']
})
export class AuthWindowComponent implements OnInit, OnDestroy {
  
  private subscriptions: Array<Subscription> = [];

  constructor(private firestore: AngularFirestore, 
    public authService: AuthService,
    private route: ActivatedRoute,
    private router: Router) { 

  }

  ngOnInit(): void {
  }
  signInWithGoogle(): void {
    this.subscriptions.push(
      this.authService.googleSign().subscribe(() => this.router.navigate(["feed"]))
    );    
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
