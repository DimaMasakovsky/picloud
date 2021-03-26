import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private firestore: AngularFirestore, public authService: AuthService) { }

  ngOnInit(): void {
  }
  signOut(): void {
    this.authService.signOut();
  }
}
