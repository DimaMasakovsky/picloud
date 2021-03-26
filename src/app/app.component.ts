import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from './auth.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Picloud';
  constructor (private firestore: AngularFirestore, public authService: AuthService) {
  }
  ngOnInit() : void {
    this.firestore.collection("heroes").valueChanges().subscribe(value => {
      console.log(value);    
    });
  } 
}
