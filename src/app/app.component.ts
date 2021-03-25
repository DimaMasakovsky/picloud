import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { OnInit, OnDestroy } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Picloud';
  constructor (private firestore: AngularFirestore) {
    
  }
  ngOnInit() : void {
    this.firestore.collection("heroes").valueChanges().subscribe(value => {
      console.log(value);    
    });
  } 
}
