import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { ChangeDetectionStrategy } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Picloud';
  constructor (private firestore: AngularFirestore, public authService: AuthService, public router: Router) {
  }
  ngOnInit() : void {
    this.firestore.collection("heroes").valueChanges().subscribe(value => {
      //console.log(value);    
    }); 
  } 
  isLoginPage() : boolean {
    return this.router.url === "/login";
  }
}
