import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { AngularFirestore } from '@angular/fire/firestore';
@Component({
  selector: 'app-auth-window',
  templateUrl: './auth-window.component.html',
  styleUrls: ['./auth-window.component.scss']
})
export class AuthWindowComponent implements OnInit {

  constructor(private firestore: AngularFirestore, public authService: AuthService) { }

  ngOnInit(): void {
  }
  signInWithGoogle(): void {
    this.authService.googleSign().subscribe();
  }
  signOut(): void {
    this.authService.signOut();
  }
}
