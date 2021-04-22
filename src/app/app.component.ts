import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { ChangeDetectionStrategy } from '@angular/core';
import { StorageService } from './services/storage.service';
import { CrudService } from './services/crud.service';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public title: string ='Picloud';
  private subscriptions: Array<Subscription> = [];
  
  constructor (
    private firestore: AngularFirestore, 
    public authService: AuthService, 
    public router: Router,
    private storage: StorageService,
    private  crudService: CrudService
    ) {}
  ngOnInit() : void {
    this.subscriptions.push(
      this.crudService.handleData("posts").subscribe((data) => this.storage.posts = data)
    ); 
    console.table({
      "23.04": this.ProjectUpdateData("Add console table", "link")
    });
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
  ProjectUpdateData( description: string, commitLink: string) {
    return {description: description, commitLink: commitLink}
  }
}
