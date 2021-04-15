import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { CrudService } from '../services/crud.service'
import { Subscription} from 'rxjs'
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  public userID: string; 
  private subscriptions: Array<Subscription> = [];

  constructor(
    private firestore: AngularFirestore, 
    public authService: AuthService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.subscriptions.push(
      this.authService.user$.subscribe(
        value => value 
          ? this.userID = value.uid 
          : console.warn("User is now logged out")
      )
    );
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
  signOut(): void {
    this.subscriptions.push(
      this.authService.signOut().subscribe(() => this.router.navigate(['']))
    );
  }
}
